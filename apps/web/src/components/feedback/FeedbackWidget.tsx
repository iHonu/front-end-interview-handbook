'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import fbq from '~/lib/fbq';

import { useUserPreferences } from '~/components/global/UserPreferencesProvider';

import FeedbackDialog from './FeedbackDialog';

import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

type Props = Readonly<{
  position: 'bottom' | 'end';
}>;

export default function FeedbackWidget({ position }: Props) {
  const { showFeedbackWidget, setShowFeedbackWidget } = useUserPreferences();
  const [isOpen, setIsOpen] = useState(false);

  if (!showFeedbackWidget) {
    return null;
  }

  return (
    <>
      <button
        className={clsx(
          'fixed z-20 hidden items-center bg-slate-900 text-xs text-white drop-shadow-xl transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 md:block',
          position === 'end' &&
            'right-0 h-56 w-9 rounded-l-lg sm:bottom-[20px] md:top-1/2 md:-translate-y-1/2',
          position === 'bottom' &&
            'bottom-0 h-9 w-56 rounded-t-lg md:left-1/4 ',
        )}
        type="button"
        onClick={() => {
          const newOpenState = !isOpen;

          setIsOpen(newOpenState);

          fbq.track('Contact');
        }}>
        <div
          className={clsx(
            'flex items-center justify-center gap-3 whitespace-nowrap',
            position === 'end' && '-mt-4 w-10 origin-center -rotate-90',
          )}>
          <FormattedMessage
            defaultMessage="Chat with us directly!"
            description="Text on Feedback Widget when it is closed to notify users of its presence"
            id="8+Ezk6"
          />
          {isOpen ? (
            <XMarkIcon aria-hidden={true} className="h-5 w-5 shrink-0" />
          ) : (
            <ChevronDownIcon aria-hidden={true} className="h-5 w-5 shrink-0" />
          )}
        </div>
      </button>
      <FeedbackDialog
        isShown={isOpen}
        onClose={() => setIsOpen(false)}
        onHideWidgetForSession={() => {
          setShowFeedbackWidget(false);
        }}
      />
    </>
  );
}
