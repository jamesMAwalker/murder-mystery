'use client';

import { useEffect, useState } from 'react'
import { useQuery } from 'convex/react-internal'

import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'

export const RoundTimer = () => {
  const currentRound = useQuery(api.rounds.getActive)

  const { minutes, seconds } = secondsToMinutesAndSeconds(
    currentRound?.remaining_time!
  )

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
