import clsx from 'clsx';
import * as React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import DialogBaseOverlay from './DialogBaseOverlay';
import Button from '../Button';
import Section from '../Heading/HeadingContext';
import { headingCVA } from '../Heading/HeadingStyles';
import Text from '../Text';
import { themeBackgroundLayerEmphasized } from '../theme';

import * as DialogPrimitive from '@radix-ui/react-dialog';

export type DialogWidth =
  | 'screen-lg'
  | 'screen-md'
  | 'screen-sm'
  | 'screen-xl'
  | 'sm';

const widthClasses: Record<DialogWidth, string> = {
  'screen-lg':
    'sm:max-w-sm md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg',
  'screen-md': 'sm:max-w-sm md:max-w-screen-sm lg:max-w-screen-md',
  'screen-sm': 'sm:max-w-sm md:max-w-screen-sm',
  'screen-xl':
    'sm:max-w-sm md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-xl',
  sm: 'sm:max-w-sm',
};

export const DialogRoot = DialogPrimitive.Root;

DialogRoot.displayName = 'DialogRoot';

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogClose = DialogPrimitive.Close;

export const DialogPortal = DialogPrimitive.Portal;

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ ...props }, ref) => (
  <DialogBaseOverlay {...props} ref={ref} purpose="dialog" />
));

DialogOverlay.displayName = 'DialogOverlay';

type DialogContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> &
  Readonly<{
    children: React.ReactNode;
    className?: string;
    isShown?: boolean;
    scrollable?: boolean;
    wrapChildren?: (children: React.ReactNode) => React.ReactNode;
  }>;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, scrollable, wrapChildren, ...props }, ref) => {
  const contents = (
    <div
      className={clsx(
        'flex max-h-full w-full flex-col p-6',
        scrollable && 'overflow-hidden',
      )}>
      {children}
    </div>
  );

  return (
    <DialogPrimitive.Content
      ref={ref}
      className={clsx(
        'flex flex-col',
        'rounded-lg',
        'w-full',
        scrollable && 'max-h-[calc(100vh_-_32px)]',
        themeBackgroundLayerEmphasized,
        'shadow-xl',
        'outline-none',
        'transform transition-all duration-200',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
        'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
        className,
      )}
      {...props}>
      {wrapChildren ? wrapChildren(contents) : contents}
    </DialogPrimitive.Content>
  );
});

DialogContent.displayName = DialogPrimitive.Content.displayName;

export function DialogHeader({
  className,
  children,
  onClose,
  ...props
}: Pick<Props, 'onClose'> & React.HTMLAttributes<HTMLDivElement>) {
  const intl = useIntl();

  return (
    <div className={clsx('flex justify-between gap-x-4', className)} {...props}>
      {children}
      <DialogPrimitive.Close asChild={true}>
        <Button
          className="-me-2 -mt-2"
          icon={RiCloseLine}
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'Close menu',
            description: 'Button to close menu',
            id: 'NVGZEe',
          })}
          size="lg"
          type="button"
          variant="tertiary"
          onClick={() => onClose?.()}
        />
      </DialogPrimitive.Close>
    </div>
  );
}
DialogHeader.displayName = 'DialogHeader';

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={clsx(
      'flex items-center justify-between gap-x-4',
      headingCVA({ level: 'heading6' }),
      className,
    )}
    {...props}>
    {children}
  </DialogPrimitive.Title>
));

DialogTitle.displayName = 'DialogTitle';

export function DialogBody({
  children,
  className,
  scrollable,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
}>) {
  return (
    <Section>
      <div
        className={clsx(
          'mt-2.5',
          scrollable && 'grow overflow-y-auto',
          className,
        )}>
        <Text display="block" size="body2">
          {children}
        </Text>
      </div>
    </Section>
  );
}

export function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'mt-6 flex flex-row-reverse justify-between gap-4',
        className,
      )}
      {...props}
    />
  );
}
DialogFooter.displayName = 'DialogFooter';

type Props = Readonly<{
  asChild?: boolean;
  centered?: boolean;
  children: React.ReactNode;
  className?: string;
  isShown?: boolean;
  isTitleHidden?: boolean;
  onClose?: () => void;
  previousButton?: React.ReactNode;
  primaryButton?: React.ReactNode;
  scrollable?: boolean;
  secondaryButton?: React.ReactNode;
  title?: string;
  trigger?: React.ReactNode;
  width?: DialogWidth;
  wrapChildren?: (children: React.ReactNode) => React.ReactNode;
}>;

export default function Dialog({
  asChild = true,
  centered = true,
  className,
  children,
  isShown,
  primaryButton,
  previousButton,
  scrollable = false,
  secondaryButton,
  title,
  trigger,
  width = 'sm',
  wrapChildren,
  onClose,
}: Props) {
  return (
    <DialogRoot
      open={isShown}
      onOpenChange={(open) => {
        if (!open) {
          onClose?.();
        }
      }}>
      {trigger && <DialogTrigger asChild={asChild}>{trigger}</DialogTrigger>}
      <DialogPortal>
        <DialogOverlay>
          <div
            className={clsx(
              'relative',
              'm-4 sm:mx-auto',
              ['w-auto', widthClasses[width]],
              'pointer-events-none',
              centered && 'flex min-h-[calc(100%_-_32px)] items-center',
            )}>
            <DialogContent
              className={className}
              scrollable={scrollable}
              wrapChildren={wrapChildren}>
              <DialogHeader onClose={onClose}>
                {title && <DialogTitle>{title}</DialogTitle>}
              </DialogHeader>
              <DialogBody scrollable={scrollable}>{children}</DialogBody>
              {primaryButton && (
                <DialogFooter>
                  <div className="flex gap-2">
                    {secondaryButton}
                    {primaryButton}
                  </div>
                  {previousButton}
                </DialogFooter>
              )}
            </DialogContent>
          </div>
        </DialogOverlay>
      </DialogPortal>
    </DialogRoot>
  );
}
