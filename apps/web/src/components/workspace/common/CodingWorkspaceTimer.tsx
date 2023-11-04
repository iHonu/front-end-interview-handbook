import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { RxPause, RxPlay, RxStopwatch } from 'react-icons/rx';
import Button from '~/components/ui/Button';

import {
  themeBackgroundColor,
  themeBackgroundEmphasizedHover,
  themeElementBorderColor,
  themeTextColor,
} from '~/components/ui/theme';

export default function CodingWorkspaceTimer() {
  const [timePassedInSeconds, setTimePassedInSeconds] = useState(0);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const [isTimerHovered, setIsTimerHovered] = useState(false);

  function startTimer() {
    const timerId = setInterval(() => {
      setTimePassedInSeconds((seconds) => seconds + 1);
    }, 1000);

    setTimer(timerId);
  }

  function clearTimer() {
    clearInterval(timer);
    setTimer(undefined);
  }

  if (timer == null && timePassedInSeconds == 0) {
    return (
      <Button
        isLabelHidden={true}
        variant="secondary"
        icon={RxStopwatch}
        label="Start timer"
        size="xs"
        tooltip="Start timer"
        onClick={startTimer}
      />
    );
  }

  return (
    <div
      className={clsx(
        'group flex h-7 items-center gap-x-1 rounded-full px-2',
        ['border', themeElementBorderColor],
        themeBackgroundColor,
        themeTextColor,
        isTimerHovered && 'hover:bg-neutral-100 dark:hover:bg-neutral-900',
      )}>
      <button
        className="flex items-center gap-x-1 font-mono text-xs"
        title={timer === null ? 'Start' : 'Pause'}
        type="button"
        onClick={() => {
          timer == null ? startTimer() : clearTimer();
        }}
        onMouseEnter={() => {
          setIsTimerHovered(true);
        }}
        onMouseLeave={() => {
          setIsTimerHovered(false);
        }}>
        {timer == null ? (
          <RxPlay aria-hidden={true} className="h-3 w-4" />
        ) : (
          <RxPause aria-hidden={true} className="h-4 w-4" />
        )}
        {new Date(timePassedInSeconds * 1000).toISOString().slice(14, 19)}
      </button>
      <button
        className={clsx(
          'rounded-full p-1',
          themeBackgroundEmphasizedHover,
          timePassedInSeconds === 0 && 'opacity-25',
        )}
        disabled={timePassedInSeconds === 0}
        title="Reset"
        type="button"
        onClick={() => {
          setTimePassedInSeconds(0);
          clearTimer();
        }}>
        <RiArrowGoBackLine className="h-3 w-3" />
      </button>
    </div>
  );
}
