'use client';

import { useEffect, useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { useTimer } from 'react-timer-hook'
import { useLongPress } from 'react-use'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'


export const RoundsSection = () => {
  const [resetButtonText, setResetButtonText] = useState('Reset All Rounds')

  const rounds = useQuery(api.rounds.getAll)

  const resetGame = useMutation(api.rounds.resetRounds)

  const handleResetGame = () => {
    setResetButtonText('Game Resetting...')
    resetGame()
  }

  const gameAtStart = rounds?.at(0)?.active

  useEffect(() => {
    setResetButtonText('Game Reset!')

    setTimeout(() => {
      setResetButtonText('Reset All Rounds')
    }, 2000)
  }, [gameAtStart])

  const longPress = useLongPress(handleResetGame, { delay: 1000 })

  return (
    <div className='flex-col-tl gap-8 w-full'>
      <h2 className='text-xl font-bold'>Manage Rounds</h2>
      {rounds?.map((round, idx) => {
        const isFinalRound = idx === rounds.length - 1

        return (
          <TimerBlock
            key={round._id}
            round={round}
            startingSeconds={600}
            isFinalRound={isFinalRound}
            nextRound={rounds[idx + 1]}
          />
        )
      })}
      <button {...longPress} className='btn btn-error full'>
        {resetButtonText}
      </button>
    </div>
  )
}

function TimerBlock({ round, startingSeconds, nextRound, isFinalRound }: any) {
  const {
    isRunning,
    start,
    pause,
    resume,
    customRestart,
    minutes,
    seconds,
    notStarted
  } = useUpdateDbRoundTimer({
    startingSeconds,
    roundId: round._id
  })
  console.log('minutes: ', minutes)
  console.log('seconds: ', seconds)

  const handleTimerButton = () => {
    if (!isRunning && notStarted) {
      start()
      return
    }
    if (!isRunning && !notStarted) {
      resume()
      return
    }
    if (isRunning && !notStarted) {
      pause()
      return
    }
  }

  const endRound = useMutation(api.rounds.updateActive)
  const endGame = useMutation(api.rounds.endRounds)

  const [nextRoundButton, setNextRoundButton] = useState({
    text: 'Next Round (long press)',
    roundEnded: false
  })

  const handleNextRound = () => {
    setNextRoundButton({
      text: 'Round Ended',
      roundEnded: true
    })

    if (!isFinalRound) {
      endRound({ round_id: nextRound._id })
    } else {
      endGame()
    }
  }

  const longPress = useLongPress(handleNextRound, { delay: 1000 })

  return (
    <div
      className={cn(
        'ROUND_TIMERS flex-col-tl w-full p-4 gap-4 border border-warning rounded-md',
        !round.active && 'opacity-50 pointer-events-none touch-none'
      )}
    >
      <h3 className='text-lg font-semibold text-warning'>Round {round.round_number}</h3>
      <div className='ROUND_1 grid grid-cols-2 grid-rows-2 gap-4 w-full'>
        <button
          onClick={handleTimerButton}
          className='START btn w-full btn-warning'
        >
          {!isRunning && notStarted && 'Start'}
          {!isRunning && !notStarted && 'Resume'}
          {isRunning && !notStarted && 'Pause'}
        </button>

        <span className='TIMER row-span-2 border rounded-lg border-accent flex-center text-accent font-mono text-2xl'>
          <span>
            {minutes.toString().length === 1 && 0}
            {minutes}
          </span>
          <span>:</span>
          <span>
            {seconds.toString().length === 1 && 0}
            {seconds}
          </span>
        </span>
        <button
          className='RESET btn w-full btn-warning btn-outline'
          onClick={customRestart}
        >
          Reset Timer
        </button>
      </div>
      <button
        {...longPress}
        className={cn(
          'btn btn-primary w-full',
          nextRoundButton.roundEnded && '!btn-error'
        )}
      >
        {nextRoundButton.text}
      </button>
    </div>
  )
}

function useUpdateDbRoundTimer({ startingSeconds, roundId }: any) {
  // set up db functions.
  const updateRoundTimer = useMutation(api.rounds.updateTimer)

  const handleUpdateDbRoundTimer = (seconds: number) => {
    updateRoundTimer({
      round_id: roundId as Id<'rounds'>,
      new_time: seconds
    })
  }

  // set initial timer time.
  let time = new Date()
  time.setSeconds(time.getSeconds() + startingSeconds)

  // create timer.
  const timer = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.log('all done!'),
    autoStart: false
  })

  // handle fns that run each second.
  useEffect(() => {
    if (timer.seconds > 0) {
      if (timer.isRunning) handleUpdateDbRoundTimer(timer.totalSeconds)
    }
  }, [timer.totalSeconds])

  // custom reset to restart timer from same starting point.
  const customRestart = () => {
    time = new Date()
    time.setSeconds(time.getSeconds() + startingSeconds)
    timer.restart(time, false)
    handleUpdateDbRoundTimer(startingSeconds)
  }

  // add one minute to current time.
  const addOneMinute = () => {
    timer.pause()
    time.setSeconds(time.getSeconds() + 60)
    timer.restart(time, timer.isRunning ? true : false)
  }

  return {
    ...timer,
    notStarted: timer.totalSeconds === startingSeconds,
    customRestart,
    addOneMinute
  }
}
