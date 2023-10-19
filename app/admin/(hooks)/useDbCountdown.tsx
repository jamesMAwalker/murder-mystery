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
  const completePhase = useMutation(api.phased_rounds.setPhaseComplete)
  const setPhaseActive = useMutation(api.phased_rounds.setPhaseActive)
  const setCountInDb = useMutation(api.phased_rounds.setPhaseCurrentTime)

  // set up timer.
  const timer = useTimer({
    initialTime: dbInitTime,
    endTime: 0,
    timerType: 'DECREMENTAL',
    // increment timer in db.
    onTimeUpdate(time) {
      setCountInDb({
        round_id: roundId,
        phase_id: phaseId,
        new_time: time
      })
    },
    // handle timer expiry process.
    onTimeOver() {
      completePhase({ round_id: roundId, phase_id: phaseId })
    }
  })

  // handle active phase updates.
  useEffect(() => {
    console.log('timer.status: ', timer.status);
    // if timer running, set phase active.
    if (timer.status === 'RUNNING') {
      setPhaseActive({ round_id: roundId, phase_id: phaseId, is_active: true })
    }
    // if timer stopped, set phase inactive.
    if (timer.status === 'STOPPED') {
      setPhaseActive({ round_id: roundId, phase_id: phaseId, is_active: false })
    }
  }, [timer.status])

  return timer
}
