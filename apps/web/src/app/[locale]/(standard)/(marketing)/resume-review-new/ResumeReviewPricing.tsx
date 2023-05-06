'use client';

import clsx from 'clsx';

import Container from '~/components/ui/Container';

import { CheckIcon } from '@heroicons/react/20/solid';

const tiers = [
  {
    description: 'Suitable to get your foot in the door.',
    features: ['Resume review', 'Up to 3 revisions'],
    href: '#',
    id: 'tier-starter',
    mostPopular: false,
    name: 'Starter',
    price: <>$350</>,
  },
  {
    description: 'Suitable for long-term career progression.',
    features: [
      'Career and profile assessment',
      'Resume review',
      'Github profile review',
      'Portfolio website review',
      'Up to 3 revisions for each review',
    ],
    href: '#',
    id: 'tier-pro',
    mostPopular: true,
    name: 'All-inclusive',
    price: <>$400</>,
  },
];

export default function ResumeReviewPricing() {
  return (
    <div className="bg-gray-900">
      <Container>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 lg:max-w-none xl:py-40 ">
            <div className="mx-auto text-left">
              <p className="text-brand-400 pb-6 text-base font-semibold leading-7">
                Pricing
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Simple pricing based on your needs
              </h2>
            </div>
            <p className="mx-auto mt-6 text-left text-lg leading-8 text-gray-300">
              Choose a plan based on what you need.
            </p>

            <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={clsx(
                    tier.mostPopular
                      ? 'bg-white/5 ring-2 ring-indigo-500'
                      : 'ring-1 ring-white/10',
                    'rounded-3xl p-8 xl:p-10',
                  )}>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3
                      className="text-lg font-semibold leading-8 text-white"
                      id={tier.id}>
                      {tier.name}
                    </h3>
                    {tier.mostPopular ? (
                      <p className="rounded-full bg-indigo-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
                        Most popular
                      </p>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-300">
                    {tier.description}
                  </p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-white">
                      {tier.price}
                    </span>
                  </p>
                  <a
                    aria-describedby={tier.id}
                    className={clsx(
                      tier.mostPopular
                        ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500'
                        : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white',
                      'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                    )}
                    href={tier.href}>
                    Buy now
                  </a>
                  <ul
                    className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10"
                    role="list">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon
                          aria-hidden="true"
                          className="h-6 w-5 flex-none text-white"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
