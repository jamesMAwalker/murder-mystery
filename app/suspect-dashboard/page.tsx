'use client'

import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'
import { useQuery } from 'convex/react'
import { useState } from 'react'
import { useRoleBasedRedirect } from '../(hooks)/navigation/useRoleBasedRedirect'

const SuspectDashboard = () => {
  const [activeTab, setActiveTab] = useState(1)

  useRoleBasedRedirect({
    allowed_role: 'suspect',
  })

  const suspectCard = useQuery(api.suspects.getFromUserSession)
  const user = useQuery(api.users.getFromSession)
  const activeRound = useQuery(api.rounds.getActive) ?? 0

  return (
    <div className='flex-col-tl gap-8'>
      <div className='INTRO flex-col-tl gap-8 w-full'>
        <h1 className='text-3xl font-bold'>Suspect Dashboard</h1>
        <div className='USER_INFO flex-col-tl gap-2'>
          <p className='text-2xl font-bold flex items-end gap-2'>
            <span>Welcome,</span>
            <span className='text-secondary'>{user?.name}!</span>
          </p>
        </div>
        <div className='tabs tabs-boxed w-full'>
          {['Suspect', 'Rd. 1', 'Rd. 2', 'Rd. 3'].map((tab, idx) => {
            const isActive = idx === activeTab

            return (
              <a
                onClick={() => setActiveTab(idx)}
                className={cn(
                  'tab tab-lg',
                  isActive && 'tab-active text-accent'
                )}
                key={tab}
              >
                {tab}
              </a>
            )
          })}
        </div>
      </div>
      {activeTab === 0 && <SuspectInfo suspectCard={suspectCard} />}
      {activeTab === 1 && <InstructionsDisplay instructionsSet={0} />}
      {activeTab === 2 && <InstructionsDisplay instructionsSet={1} />}
      {activeTab === 3 && <InstructionsDisplay instructionsSet={2} />}
    </div>
  )
}

export default SuspectDashboard

function InstructionsDisplay({ instructionsSet }: { instructionsSet: number }) {
  const instructionsData = useQuery(api.suspect_instructions.getFromUserSession)

  // TODO: Refactor these conditionals.

  const instructions = instructionsData?.instructions

  if (!instructions) return null

  const rdInstructions =
    instructions[instructionsSet as keyof typeof instructions]!

  return (
    <div className='INSTRUCTIONS_DISPLAY flex-col-tl gap-4 full'>
      <h4 className='text-xl font-bold'>
        {' '}
        Round - {rdInstructions?.round_number!}: Instructions
      </h4>
    </div>
  )
}

function SuspectInfo({ suspectCard }: any) {
  const [bioExpanded, setBioExpanded] = useState(false)

  return (
    <div className='USER_INFO flex-col-tl gap-4'>
      <h2 className='card-title flex gap-2'>
        <span>Your Character is:</span>
        <span className='text-error'>{suspectCard?.suspect_name}</span>
      </h2>
      <div
        className={cn(
          'badge badge-outline p-2',
          suspectCard?.is_guilty ? 'badge-error' : 'badge-success'
        )}
      >
        {suspectCard?.is_guilty ? 'Guilty' : 'Not Guilty'}
      </div>
      <p className='font-normal'>{suspectCard?.bio}</p>
    </div>
  )
}
