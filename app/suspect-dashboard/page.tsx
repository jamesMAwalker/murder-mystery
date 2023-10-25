'use client'

import { useEffect, useState } from 'react'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { cn } from '@/lib/utils'

import { useRoleBasedRedirect } from '../(hooks)/navigation/useRoleBasedRedirect'
import { SectionLoader } from '../(components)/ui-components/loaders'

const SuspectDashboard = () => {
  const [activeTab, setActiveTab] = useState(1)

  useRoleBasedRedirect({
    allowed_role: 'suspect'
  })

  const user = useQuery(api.users.getFromSession)

  return (
    <div className='flex-col-tl gap-8 lg:h-full'>
      <DashboardHeader
        user={user}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      {activeTab === 0 && <SuspectCard />}
      {[1, 2, 3].includes(activeTab) && (
        <InstructionsDisplay instructionsSet={activeTab - 1} />
      )}
    </div>
  )
}

const DashboardHeader = ({ user, setActiveTab, activeTab }: any) => {
  return (
    <div className='INTRO flex-col-tl gap-8 w-full'>
      <h1 className='text-3xl font-bold'>Suspect Dashboard</h1>
      {!!user ? (
        <>
          <p className='text-2xl font-bold flex items-end gap-2'>
            <span>Welcome,</span>
            <span className='text-secondary'>{user?.name}!</span>
          </p>
          <div className='tabs tabs-boxed w-full lg:w-auto'>
            {['Suspect', 'Rd. 1', 'Rd. 2', 'Rd. 3'].map((tab, idx) => (
              <a
                key={tab}
                onClick={() => setActiveTab(idx)}
                className={cn(
                  'tab tab-lg',
                  idx === activeTab && 'tab-active text-accent'
                )}
              >
                {tab}
              </a>
            ))}
          </div>
        </>
      ) : (
        <SectionLoader classes='items-start' />
      )}
    </div>
  )
}

const SuspectCard = () => {
  const suspectInfo = useQuery(api.suspects.getFromUserSession)

  if (!suspectInfo) return <SectionLoader classes='items-start' />

  return (
    <div className='USER_INFO flex-col-tl gap-4'>
      <h2 className='card-title flex gap-2'>
        <span>Your Character is:</span>
        <span className='text-error'>{suspectInfo?.suspect_name}</span>
      </h2>
      <div
        className={cn(
          'badge badge-outline p-2',
          suspectInfo?.is_guilty ? 'badge-error' : 'badge-success'
        )}
      >
        {suspectInfo?.is_guilty ? 'Guilty' : 'Not Guilty'}
      </div>
      <p className='font-normal'>{suspectInfo?.bio}</p>
    </div>
  )
}

const InstructionsDisplay = ({ instructionsSet }: any) => {
  const instructionsData = useQuery(api.suspect_instructions.getFromUserSession)
  const instructions = instructionsData?.instructions
  const rdInstructions = instructions?.[instructionsSet]

  if (!rdInstructions || !instructionsData) return <SectionLoader classes='items-start' />

  return (
    <div className='INSTRUCTIONS_DISPLAY flex-col-tl gap-6 full'>
      <h4 className='ROUND_NUMBER text-xl font-bold'>
        Round - {rdInstructions.round_number}: Instructions
      </h4>
      <div className='INSTRUCTIONS_BLOCK flex-col-tl gap-2'>
        <h4 className='TITLE font-semibold'>Overview</h4>
        <p className='CONTENT'>{rdInstructions.general_instructions}</p>
      </div>
      <div className='INSTRUCTIONS_BLOCK flex-col-tl gap-2'>
        <h4 className='TITLE font-semibold'>
          Cast Suspicion on: <span className='text-warning'>Jack</span>
        </h4>
        <p className='CONTENT'>{rdInstructions.target_suspect}</p>
      </div>
      <div className='INSTRUCTIONS_LIST_BLOCK flex-col-tl gap-2'>
        <h4 className='TITLE font-semibold text-success'>Things You SHOULD Talk About</h4>
        <ul className='LIST'>{rdInstructions.dos}</ul>
      </div>
      <div className='INSTRUCTIONS_LIST_BLOCK flex-col-tl gap-2'>
        <h4 className='TITLE font-semibold text-error'>Things to AVOID Talking About</h4>
        <ul className='LIST'>{rdInstructions.donts}</ul>
      </div>
    </div>
  )
}

export default SuspectDashboard
