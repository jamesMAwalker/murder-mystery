'use client';

import { cn } from '@/lib/utils';
import React, { useState } from 'react'
import { SupportLanguagePage } from './components/support-language';
import { HowToPage } from './components/how-to';

const InstructionsPage = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className='flex-col-tl gap-6'>
      <h1 className='text-2xl font-bold flex items-center justify-start gap-2'>
        <span>How to Play</span>
        <span className='text-red-700 italic'>Murder Mystery</span>
      </h1>
      <img
        className='w-full aspect-square object-cover saturate-0'
        src='/background.jpg'
        alt='evidence board'
      />
      <div className='tabs tabs-boxed'>
        {['How To', 'Support Language'].map((tab, idx) => {
          const isActive = idx === activeTab

          return (
            <a
              onClick={() => setActiveTab(idx)}
              className={cn('tab tab-lg', isActive && 'tab-active text-accent')}
              key={tab}
            >
              {tab}
            </a>
          )
        })}
      </div>
      {activeTab === 0 && <HowToPage />}
      {activeTab === 1 && <SupportLanguagePage />}
    </div>
  )
}

export default InstructionsPage
