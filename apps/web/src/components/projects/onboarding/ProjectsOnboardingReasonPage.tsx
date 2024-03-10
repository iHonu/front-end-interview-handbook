'use client';

import { useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import useProjectsMotivationReasonSchema from '~/components/projects/hooks/useProjectsMotivationReasonSchema';
import type { ProjectsMotivationReasonFormValues } from '~/components/projects/types';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import { useI18nRouter } from '~/next-i18nostic/src';

import ProjectsProfileMotivationsField from '../profile/edit/ProjectsProfileMotivationsField';

import { zodResolver } from '@hookform/resolvers/zod';

type OnboardingProfileFormTransformedValues = {
  motivations: z.infer<ReturnType<typeof useProjectsMotivationReasonSchema>>;
};

export default function ProjectsOnboardingReasonPage() {
  const searchParams = useSearchParams();
  const router = useI18nRouter();
  const intl = useIntl();
  const onboardingReasonSchema = useProjectsMotivationReasonSchema({
    isRequired: true,
  });

  const motivationsUpdateMutation =
    trpc.projects.profile.motivationsUpdate.useMutation();

  const methods = useForm<
    ProjectsMotivationReasonFormValues,
    unknown,
    OnboardingProfileFormTransformedValues
  >({
    defaultValues: {
      motivations: [],
    },
    mode: 'onTouched',
    resolver: zodResolver(
      z.object({
        motivations: onboardingReasonSchema,
      }),
    ),
  });
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, submitCount },
  } = methods;

  return (
    <FormProvider {...methods}>
      <main>
        <Container
          className="flex flex-col items-center gap-12 pb-24 pt-8"
          variant="narrow">
          <div className="flex flex-col items-center gap-4">
            <Heading level="heading5">
              <FormattedMessage
                defaultMessage="Welcome to GreatFrontEnd Projects!"
                description="Title for Projects onboarding page"
                id="GPp0wf"
              />
            </Heading>
            <Text className="text-center" color="secondary" size="body1">
              <FormattedMessage
                defaultMessage="Choose up to 2 reasons why you are here so that we can improve your experience"
                description="Subtitle for Projects onboarding page"
                id="PAq50+"
              />
            </Text>
          </div>
          <Section>
            <form
              className="flex flex-col gap-8"
              onSubmit={handleSubmit(async ({ motivations }) => {
                await motivationsUpdateMutation.mutateAsync({
                  motivations: motivations.flatMap((motivation) =>
                    motivation != null ? [motivation] : [],
                  ),
                });

                router.push({
                  pathname: '/projects/onboarding/profile',
                  query: searchParams?.get('next')
                    ? {
                        next: searchParams?.get('next'),
                      }
                    : undefined,
                });
              })}>
              <ProjectsProfileMotivationsField />
              <div className="flex flex-row-reverse flex-wrap items-center justify-between">
                <Button
                  icon={RiArrowRightLine}
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                  label={intl.formatMessage({
                    defaultMessage: 'Next',
                    description: 'Next button label',
                    id: 'pz1v44',
                  })}
                  size="lg"
                  type="submit"
                  variant="secondary"
                />
                {submitCount > 0 && !isValid && (
                  <Text color="error" size="body2">
                    {intl.formatMessage({
                      defaultMessage:
                        'Please complete the selection to proceed.',
                      description: 'Form validation message',
                      id: '1xO/T7',
                    })}
                  </Text>
                )}
              </div>
            </form>
          </Section>
        </Container>
      </main>
    </FormProvider>
  );
}
