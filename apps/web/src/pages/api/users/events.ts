import cookie from 'cookie';
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

import { createServerSupabaseClientGFE } from '~/supabase/SupabaseServerGFE';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const supabase = createServerSupabaseClientGFE({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.id == null) {
    return res.status(200).json({ message: 'No-op' });
  }

  const { action, payload, clientSHA } = req.body;

  const cookies = cookie.parse(req.headers.cookie ?? '');
  const event = await prisma.event.create({
    data: {
      action,
      clientSHA: (clientSHA || '').slice(0, 7),
      country: cookies.country,
      fingerprint: cookies.gfp,
      payload,
      referer: req.headers.referer,
      serverSHA: (process.env.VERCEL_GIT_COMMIT_SHA || '').slice(0, 7),
      userId: user?.id,
    },
  });

  if (event == null) {
    return res.status(500).json({ message: 'An error occurred' });
  }

  return res.status(204).send(null);
}
