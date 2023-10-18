import { useEffect } from 'react'
import { useTimer } from 'use-timer'

import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { faVolumeMute } from '@fortawesome/free-solid-svg-icons'

interface ICountDownProps {
  dbInitTime: number
  roundId: Id<'phased_rounds'>
  phaseId: string
}

export function useDbCountdown({
  dbInitTime,
  roundId,
  phaseId
}: ICountDownProps) {
  const updateDbCountdown = useMutation(
    api.phased_rounds.updatePhaseCurrentTime
  )
  const completePhase = useMutation(api.phased_rounds.setPhaseComplete)

  // set up timer.
  const timer = useTimer({
    initialTime: dbInitTime,
    endTime: 0,
    timerType: 'DECREMENTAL',
    onTimeUpdate(time) {
      updateDbCountdown({
        round_id: roundId,
        phase_id: phaseId,
        new_time: time,
        is_active: true
      })
    },
    onTimeOver() {
      completePhase({ round_id: roundId, phase_id: phaseId })
    }
  })

  return timer
}
