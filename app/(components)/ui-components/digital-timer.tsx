'use client'

import { api } from '@/convex/_generated/api'
import { secondsToMinutesAndSeconds } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { useQuery } from 'convex/react'

export const DigitalTimer = ({
  startingTime,
  style = 'standard'
}: {
  startingTime?: number
  style?: string
}) => {
  const currentPhase = useQuery(api.phased_rounds.getActivePhase)

  const { minutes, seconds } = currentPhase?.phase_current_time
    ? secondsToMinutesAndSeconds(currentPhase.phase_current_time)
    : startingTime
    ? secondsToMinutesAndSeconds(startingTime)
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
    </span>
  )
}
