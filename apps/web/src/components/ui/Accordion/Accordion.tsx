'use client';

import clsx from 'clsx';
import * as React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import {
  themeDivideColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextSecondaryColor,
} from '../theme';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    className={clsx('w-full', ['divide-y', themeDivideColor], className)}
    {...props}
  />
));

Accordion.displayName = 'AccordionItem';

const AccordionItem = AccordionPrimitive.Item;

AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={clsx(
        'flex flex-1 items-center justify-between',
        'pb-4 pt-4 md:pt-6',
        'group',
        'font-medium transition-all',
        themeOutlineElement_FocusVisible,
        themeOutlineElementBrandColor_FocusVisible,
        className,
      )}
      {...props}>
      {children}
      <RiArrowDownSLine
        className={clsx(
          'size-5 shrink-0 transition-transform group-data-[state=open]:-rotate-180',
          themeTextSecondaryColor,
        )}
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}>
    <div className={clsx('pb-4 md:pb-6', themeTextSecondaryColor, className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
