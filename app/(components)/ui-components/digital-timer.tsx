'use client'

import { secondsToMinutesAndSeconds } from '@/lib/helpers'
import { cn } from '@/lib/utils'

export const DigitalTimer = ({
  totalSeconds,
  style = 'standard'
}: {
  totalSeconds: number | null
  style?: string
}) => {

  // get minutes and seconds if totalSeconds is not null
  const { minutes, seconds } = totalSeconds
    ? secondsToMinutesAndSeconds(totalSeconds)
    : { minutes: 0, seconds: 0 }

  // timer styles
  const timerStyle = {
    standard:
      'p-2 col-span-2 border rounded-lg border-white text-white text-2xl',
    minimal: ''
  }

  return (
    <span
      className={cn(
        'TIMER  flex-center font-mono ',
        timerStyle[style as keyof typeof timerStyle]
      )}
    >
      {totalSeconds ? (
        <>
          <span>
            {minutes.toString().length === 1 && 0}
            {minutes}
          </span>
          <span>:</span>
          <span>
            {seconds.toString().length === 1 && 0}
            {seconds}
          </span>
        </>
      ) : (
        <span>--:--</span>
      )}
    </span>
  )
}
