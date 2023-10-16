'use client'

import { useEffect, useState } from 'react'
import { useQuery } from 'convex/react-internal'

import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'
import { DigitalTimer } from '../(components)/ui-components/digital-timer'

export const PhasedRoundTimer = () => {
  const currentRound = useQuery(api.phased_rounds.getActiveRound)
  const currentPhase = useQuery(api.phased_rounds.getActivePhase)

  const [bgColor, setBgColor] = useState('bg-success')
  useEffect(() => {
    const remainingTime = currentPhase?.phase_current_time ?? 600

    if (remainingTime >= 61) setBgColor('bg-success')
    if (remainingTime <= 60) setBgColor('bg-warning')
    if (remainingTime <= 30) setBgColor('bg-error')
    if (remainingTime <= 10) setBgColor('bg-error animate-pulse')
  }, [currentPhase?.phase_current_time])

  const roundsStarted = !!currentRound

  if (!roundsStarted) return null

  return (
    <div
      className={cn(
        'ROUNDS_TIMER flex items-center justify-between w-full px-4 py-2 bg-error text-neutral-800',
        bgColor
      )}
    >
      <span>Round - {currentRound?.round_number}</span>
      <span>{currentPhase?.phase_title}</span>
      <DigitalTimer
        totalSeconds={
          currentPhase?.completed ? null : currentPhase?.phase_current_time!
        }
        style='minimal'
      />
    </div>
  )
}
