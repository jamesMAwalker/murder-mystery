'use client';

import { useConvexAuth, useMutation, useQuery } from 'convex/react-internal'

import { api } from '@/convex/_generated/api'
import { useTimer } from 'react-timer-hook'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export const RoundTimer = () => {
  const currentRound = useQuery(api.rounds.getActive)
  console.log('currentRound: ', currentRound)

  const { minutes, seconds } = secondsToMinutesAndSeconds(
    currentRound?.remaining_time!
  )

  const roundEndingIn5 = minutes > 5
  const roundEndingIn2 = minutes > 2
  const roundEndingIn1 = minutes > 2


  const [bgColor, setBgColor] = useState('bg-success')
  useEffect(() => {
    const remainingTime = currentRound?.remaining_time ?? 600

    if (remainingTime >= 301)  setBgColor('bg-success');
    if (remainingTime <= 300)  setBgColor('bg-warning');
    if (remainingTime <= 120)  setBgColor('bg-error');
    if (remainingTime <= 10)  setBgColor('bg-error animate-pulse');
  }, [currentRound?.remaining_time])

  return (
    <div
      className={cn(
        'flex items-center justify-between w-full px-4 py-2 bg-error text-neutral-800',
        bgColor
      )}
    >
      <span>Round {currentRound?.round_number || ''}</span>
      <span>
        {minutes || '00'}:{seconds || '00'}{' '}
      </span>
    </div>
  )
}

function secondsToMinutesAndSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)

  const seconds = totalSeconds - minutes * 60

  return { minutes, seconds }
}
