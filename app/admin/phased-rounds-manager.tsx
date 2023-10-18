'use client'

import { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { useLongPress } from 'react-use'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useDbCountdown } from './(hooks)/useDbCountdown'
import { DigitalTimer } from '../(components)/ui-components/digital-timer'

export const PhasedRoundsManager = () => {
  const rounds = useQuery(api.phased_rounds.getAll)

  return (
    <div className='flex-col-tl gap-8 w-full'>
      
      <GameControlButtons />
      {rounds
        ?.sort((ra: any, rb: any) => ra.round_number - rb.round_number)
        ?.map((round, idx) => {
          const isFinalRound = idx === rounds.length - 1

          return <RoundBlock key={round._id} {...round} />
        })}
    </div>
  )
}

function GameControlButtons() {
  // game controls
  const startGame = useMutation(api.game.startGame)
  const endGame = useMutation(api.game.endGame)
  const resetGame = useMutation(api.game.resetGame)

  const controls = [
    {
      text: 'Start Game',
      action: startGame,
      btnStyle: 'btn-success'
    },
    {
      text: 'End Game',
      action: endGame,
      btnStyle: 'btn-error'
    },
    {
      text: 'Reset Game',
      action: resetGame,
      btnStyle: 'btn-warning'
    }
  ]

  return (
    <div className='flex-col-tl gap-2 w-full'>
      <div className='HEADER flex-col-tl gap-2'>
        <h2 className='text-xl font-bold'>Manage Rounds</h2>
        <p className='text-warning'>
          💡 These buttons must be long pressed to actuate.
        </p>
      </div>
      {controls.map((control) => {
        return <ControlButton key={control.text} {...control} />
      })}
    </div>
  )
}

function ControlButton({ text, action, btnStyle }: any) {
  const [showLongPressReaction, ShowLongPressReaction] = useState(false)

  const handleLongPress = (action: () => void) => {
    ShowLongPressReaction(true)
    setTimeout(() => {
      ShowLongPressReaction(false)
      action()
    }, 1000)
  }

  const longPress = useLongPress(() => handleLongPress(action), {
    delay: 1000
  })

  return (
    <button
      key={text}
      {...longPress}
      className={cn('relative btn full', btnStyle)}
    >
      {text}
      {showLongPressReaction && (
        <span className='absolute full opacity-10 bg-white animate-ping' />
      )}
    </button>
  )
}

function RoundBlock({ _id, round_number, phases, active, completed }: any) {
  const startNextRound = useMutation(api.phased_rounds.startNextRound)
  const endGame = useMutation(api.game.endGame)

  const isFinalRound = round_number === 4

  const controlBtnAction = isFinalRound
    ? () => endGame()
    : () => startNextRound({ round_id: _id })

  const controlBtnText = isFinalRound ? 'End Game' : 'Next Round'

  const controlBtnStyle = isFinalRound ? 'btn-error w-full' : 'btn-secondary w-full'

  return (
    <div
      className={cn(
        'ROUND_TIMERS flex-col-tl w-full p-4 gap-4 border border-warning rounded-md',
        !active && 'opacity-50 pointer-events-none touch-none'
      )}
    >
      <div key={_id} className='flex-col-tl gap-2 w-full'>
        <h4>Round {round_number}</h4>
        <ul className='flex-col-tl gap-2 w-full'>
          {phases.map((phase: any) => {
            return (
              <PhaseBlock key={phase.phase_title} roundId={_id} phase={phase} />
            )
          })}
        </ul>
        <ControlButton
          text={controlBtnText}
          action={controlBtnAction}
          btnStyle={controlBtnStyle}
        />
      </div>
    </div>
  )
}

function PhaseBlock({ phase, roundId }: any) {
  const currentRound = useQuery(api.phased_rounds.getOne, { round_id: roundId })

  // set up timer fns (linked to db).
  const { time, status, start, pause, reset, advanceTime } = useDbCountdown({
    dbInitTime: phase.phase_starting_time,
    phaseId: phase.phase_id,
    roundId
  })
  console.log('timer status: ', status);  
  // TODO: Pulse timer when paused.

  return (
    <li className='flex-col-tl full rounded-md bg-slate-900 p-4'>
      <h6 className='pb-4 flex gap-4'>
        Phase:{' '}
        <span className='text-accent'>&#34;{phase.phase_title}&#34;</span>
      </h6>
      {phase.phase_type === 'discuss' && (
        <span className='text-warning mb-2'>
          💡 Start this timer to inform users that discussion has 1min
          remaining.
        </span>
      )}
      <div className='BTN_GRID grid grid-cols-2 auto-rows-auto gap-2 flow-column full'>
        <DigitalTimer totalSeconds={phase.phase_current_time} />
        <button
          className='col-span-2 btn btn-warning text-black'
          onClick={start}
        >
          Start
        </button>
        <button className='btn btn-warning btn-outline' onClick={pause}>
          Pause
        </button>
        <button className='btn btn-warning btn-outline' onClick={reset}>
          Reset
        </button>
        <button
          className='btn btn-warning btn-outline'
          onClick={() => advanceTime(-60)}
        >
          + 1min
        </button>
        <button
          disabled={time < 15}
          className='btn btn-warning btn-outline'
          onClick={() => {
            if (time > 60) {
              advanceTime(60)
            } else {
              advanceTime(10)
            }
          }}
        >
          {time > 60 ? '- 1min' : '- 10s'}
        </button>

        {/* Next Phase Btn: Only show when round has more than 1 phase. */}
        {currentRound?.phases.length! > 1 && (
          <button className='btn btn-primary col-span-2'>Next Phase</button>
        )}
      </div>
    </li>
  )
}
