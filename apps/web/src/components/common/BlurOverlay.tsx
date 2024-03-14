import clsx from 'clsx';

type Props = Readonly<{
  align?: 'bottom' | 'center' | 'top';
  children: React.ReactNode;
  maxHeight?: number;
  overlay: React.ReactNode;
  showOverlay?: boolean;
}>;

export default function BlurOverlay({
  children,
  align = 'top',
  showOverlay = false,
  overlay,
  maxHeight = 500,
}: Props) {
  if (!showOverlay) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return (
    <div className="relative w-full">
      <div
        aria-hidden={true}
        className="h-full overflow-hidden blur"
        style={{ maxHeight }}>
        <div className="blur-overlay h-full" style={{ maxHeight }}>
          {children}
        </div>
      </div>
      <div
        className={clsx(
          'size-full absolute top-0 flex flex-col',
          align === 'top' && 'justify-start',
          align === 'bottom' && 'justify-end',
          align === 'center' && 'justify-center',
        )}>
        {overlay}
      </div>
    </div>
  );
}
