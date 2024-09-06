import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

import { currentExperiment } from '~/components/experiments';
import { shouldPersistQueryParam } from '~/components/global/analytics/useWriteSearchParamsToCookie';

import { gfeFingerprintName } from '~/logging/fingerprint';
import { gfeFirstVisitName } from '~/logging/firstVisit';
import { parseJWTAccessToken } from '~/supabase/SupabaseServerGFE';

import { Axiom } from '@axiomhq/js';

const axiom = new Axiom({
  token: process.env.AXIOM_TOKEN!,
});

const cors = Cors({
  methods: ['POST'],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  // eslint-disable-next-line @typescript-eslint/ban-types
  fn: Function,
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors);

  if (process.env.NODE_ENV !== 'production') {
    return res
      .status(403)
      .json({ message: `Only send in ${process.env.NODE_ENV}` });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  let userEmail = null;
  let userId = null;

  try {
    if (req.cookies['supabase-auth-token']) {
      const { id, email } = await parseJWTAccessToken(
        req.cookies['supabase-auth-token'],
      );

      userId = id || null;
      userEmail = email || null;
    }
  } catch (error) {
    // TODO: Log error.
  }

  const { clientSHA, name, pathname, payload, query, referer, value } =
    req.body;

  const eventPayload = {
    cookies: Object.keys(req.cookies).reduce(
      (acc: Record<string, unknown>, key: string) => {
        if (!shouldPersistQueryParam(key)) {
          return acc;
        }

        const cookieValue = req.cookies[key];

        if (cookieValue) {
          acc[key] = JSON.parse(cookieValue);
        }

        return acc;
      },
      {},
    ),
    event: {
      name,
      payload,
      value,
    },
    experiment: currentExperiment.isRunning
      ? {
          name: currentExperiment.name,
          value: req.cookies[currentExperiment.name],
        }
      : undefined,
    git: {
      client: (clientSHA || '').slice(0, 7) || undefined,
      server:
        (process.env.VERCEL_GIT_COMMIT_SHA || '').slice(0, 7) || undefined,
    },
    request: {
      country: req.cookies.country,
      pathname,
      query,
      referer: referer || req.headers.referer,
    },
    user: {
      email: userEmail,
      fingerprint: req.cookies[gfeFingerprintName],
      firstVisit: req.cookies[gfeFirstVisitName],
      id: userId,
    },
  };

  await axiom.ingest('events', [eventPayload]);

  return res.status(204).send(null);
}
