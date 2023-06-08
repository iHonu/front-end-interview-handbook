import clsx from 'clsx';
import { Fragment, useRef } from 'react';

import { Dialog, Transition } from '@headlessui/react';

type Props = Readonly<{
  children: React.ReactNode;
  isShown?: boolean;
  onClose: () => void;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  title: string;
}>;

export default function DialogImpl({
  children,
  isShown,
  primaryButton,
  title,
  secondaryButton,
  onClose,
}: Props) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root as={Fragment} show={isShown}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => onClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div>
                    <Dialog.Title
                      as="h2"
                      className="text-2xl font-bold leading-6 text-slate-900">
                      {title}
                    </Dialog.Title>
                    <div className="my-4">
                      <div className="text-sm">{children}</div>
                    </div>
                  </div>
                </div>
                {primaryButton && (
                  <div
                    className={clsx(
                      'mt-5 grid gap-3 sm:mt-6 sm:grid-flow-row-dense',
                      secondaryButton != null && 'sm:grid-cols-2',
                    )}>
                    {secondaryButton}
                    {primaryButton}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
