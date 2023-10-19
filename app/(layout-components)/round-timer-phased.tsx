'use client'

import { useEffect, useState } from 'react'
import { useQuery } from 'convex/react-internal'

import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'
import { DigitalTimer } from '../(components)/ui-components/digital-timer'

/*
  TODO: Refactor Rounds/Phases Into Game Object
  # Currently, rounds are their own database table. They to reduce the number of moving parts, we should instead hard code the rounds into the game, and then have the game object store the current round information.
*/

export const PhasedRoundTimer = () => {
  const currentRound = useQuery(api.phased_rounds.getActiveRound)
  const currentPhase = useQuery(api.phased_rounds.getActivePhase)
  // console.log('currentPhase: ', currentPhase);

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
      {currentPhase?.phase_current_time ? (
        <>
          <span>{currentPhase?.phase_title}</span>
          <DigitalTimer style='minimal' />
        </>
      ) : (
        <span>--:--</span>
      )}
    </div>
  )
}
