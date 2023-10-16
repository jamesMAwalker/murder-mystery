'use client';

import { useState } from 'react'

import { cn } from '@/lib/utils'

import { ReportSection } from './reporting-section'
import { PhasedRoundsManager } from './phased-rounds-manager';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Rounds')

  return (
    <div className='flex-col-tl gap-10   w-full'>
      <div className='INTRO flex-col-tl gap-2 w-full'>
        <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
        <p>
          Welcome, Admin! Control the flow of the game from this panel. Round
          timers and report submissions, as well as team management can be
          handled on this page.
        </p>
      </div>
      <div className='tabs tabs-boxed'>
        {['Rounds', 'Reports'].map((tab) => {
          const isActive = tab === activeTab

          return (
            <a
              onClick={() => setActiveTab(tab)}
              className={cn('tab tab-lg', isActive && 'tab-active text-accent')}
              key={tab}
            >
              {tab}
            </a>
          )
        })}
      </div>
      {activeTab === 'Rounds' && <PhasedRoundsManager />}
      {activeTab === 'Reports' && <ReportSection />}
    </div>
  )
}

export default AdminDashboard
