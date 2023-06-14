import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';

import type { TextSize } from '../Text';
import Text from '../Text';

export type TabItem<T> = Readonly<{
  href?: string;
  icon?: React.ComponentType<React.ComponentProps<'svg'>>;
  label: string;
  value: T;
}>;

type TabSize = 'md' | 'sm' | 'xs';

type Props<T> = Readonly<{
  label: string;
  onSelect?: (value: T) => void;
  size?: TabSize;
  tabs: ReadonlyArray<TabItem<T>>;
  value: T;
}>;

const sizeClasses: Record<
  TabSize,
  Readonly<{
    borderRadius: string;
    iconSize: string;
    tabGapSize: string;
    tabItemSize: string;
    textSize: TextSize;
  }>
> = {
  md: {
    borderRadius: 'rounded-t-md',
    iconSize: 'h-5 w-5',
    tabGapSize: 'gap-x-2',
    tabItemSize: 'py-2.5 px-5',
    textSize: 'body',
  },
  sm: {
    borderRadius: 'rounded-t',
    iconSize: 'h-4 w-4',
    tabGapSize: 'gap-x-1.5',
    tabItemSize: 'py-1.5 px-3',
    textSize: 'body2',
  },
  xs: {
    borderRadius: 'rounded-t',
    iconSize: 'h-4 w-4',
    tabGapSize: 'gap-x-1',
    tabItemSize: 'py-1.5 px-2',
    textSize: 'body3',
  },
};

export default function Tabs<T>({
  label,
  tabs,
  size = 'md',
  value,
  onSelect,
}: Props<T>) {
  const { borderRadius, iconSize, tabItemSize, tabGapSize, textSize } =
    sizeClasses[size];

  return (
    <div className="isolate w-full" role="tablist">
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <nav aria-label={label} className={clsx('flex', tabGapSize)}>
          {tabs.map((tabItem) => {
            const {
              icon: Icon,
              label: tabItemLabel,
              value: tabItemValue,
              href,
            } = tabItem;
            const isSelected = tabItemValue === value;
            const commonProps = {
              'aria-label': tabItemLabel,
              'aria-selected': isSelected,
              children: (
                <Text
                  className={clsx('flex items-center', tabGapSize)}
                  color={isSelected ? 'active' : 'default'}
                  size={textSize}>
                  {Icon && (
                    <Icon
                      className={clsx(
                        'shrink-0',
                        !isSelected && 'text-neutral-400 dark:text-neutral-600',
                        iconSize,
                      )}
                    />
                  )}
                  {tabItemLabel}
                </Text>
              ),
              className: clsx(
                'flex items-center whitespace-nowrap -mb-px z-10 transition',
                borderRadius,
                isSelected
                  ? clsx(
                      'border',
                      'border-t-neutral-200 border-x-neutral-200 border-b-white',
                      'dark:border-t-neutral-800 dark:border-x-neutral-800 dark:border-b-neutral-900',
                    )
                  : clsx(
                      'bg-neutral-100 hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-800/40',
                      'border',
                      'border-t-neutral-100 border-x-neutral-100 hover:border-neutral-200',
                      'dark:border-t-neutral-800 dark:border-x-neutral-800 dark:border-b-neutral-800 dark:hover:border-t-neutral-700 dark:hover:border-x-neutral-700',
                    ),
                tabItemSize,
              ),
              onClick: () => onSelect?.(tabItemValue),
              role: 'tab',
            };

            if (href != null) {
              return (
                <Anchor
                  key={String(tabItemValue)}
                  href={href}
                  variant="unstyled"
                  {...commonProps}
                />
              );
            }

            return (
              <button
                key={String(tabItemValue)}
                type="button"
                {...commonProps}
              />
            );
          })}
        </nav>
      </div>
    </div>
  );
}
