import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

const MIN_LENGTH = 3;
const MAX_LENGTH = 48;
const REGEX_VALIDATION = new RegExp(/^[a-zA-Z0-9]+([-]*[a-zA-Z0-9]+)*$/);

function profileUsernameSchema(options?: {
  maxMessage: string;
  minMessage: string;
  regexMessage: string;
}) {
  const { minMessage, maxMessage, regexMessage } = options ?? {};

  return z
    .string()
    .min(MIN_LENGTH, { message: minMessage })
    .max(MAX_LENGTH, { message: maxMessage })
    .regex(REGEX_VALIDATION, { message: regexMessage })
    .trim();
}

// TODO: Figure out how to reuse intl strings for the server.
export const profileUserNameSchemaServer = profileUsernameSchema({
  maxMessage: `Username must contain at most ${MAX_LENGTH} characters.`,
  minMessage: `Username must contain at least ${MIN_LENGTH} characters.`,
  regexMessage:
    'Username should begin and end with an alphanumeric character, and only contain alphanumeric characters or dashes.',
});

export function getProfileUsernameAttrs(intl: IntlShape) {
  const label = intl.formatMessage({
    defaultMessage: 'Username',
    description: 'Username',
    id: 'Ooddpj',
  });
  const description = intl.formatMessage(
    {
      defaultMessage:
        'This is the unique username used to identify you. Use a maximum of {maxLength} characters.',
      description: 'Username field description',
      id: 'JIywgW',
    },
    {
      maxLength: MAX_LENGTH,
    },
  );
  const maxMessage = intl.formatMessage(
    {
      defaultMessage: 'Username must contain at most {maxLength} characters.',
      description: 'Error message when username is too long',
      id: 'Wi3vIz',
    },
    {
      maxLength: MAX_LENGTH,
    },
  );
  const minMessage = intl.formatMessage(
    {
      defaultMessage: 'Username must contain at least {minLength} characters.',
      description: 'Error message when username is too short',
      id: 'pomXxL',
    },
    {
      minLength: MIN_LENGTH,
    },
  );
  const regexMessage = intl.formatMessage({
    defaultMessage:
      'Username should begin and end with an alphanumeric character, and only contain alphanumeric characters or dashes.',
    description: 'Error message when username contains invalid characters',
    id: '/95uM9',
  });
  const successMessage = intl.formatMessage({
    defaultMessage: 'Your username has been updated.',
    description: 'Success message when for username changes',
    id: '+5baZ1',
  });

  return {
    description,
    label,
    successMessage,
    validation: {
      maxLength: MAX_LENGTH,
      maxMessage,
      minLength: MIN_LENGTH,
      minMessage,
      regexMessage,
    },
  };
}

export function useProfileUsernameSchema() {
  const intl = useIntl();
  const intlStrings = getProfileUsernameAttrs(intl);

  return profileUsernameSchema({
    maxMessage: intlStrings.validation.maxMessage,
    minMessage: intlStrings.validation.minMessage,
    regexMessage: intlStrings.validation.regexMessage,
  });
}
