'use client'

import React, { useState } from 'react'
import { useConvexAuth, useQuery } from 'convex/react-internal'

import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'


const SubmitGuess = () => {
  const [activeTab, setActiveTab] = useState('Submit Guess')

  return (
    <div className='flex-col-tl gap-8'>
      <div className='INTRO flex-col-tl gap-4'>
        <h1 className='text-2xl font-bold'>Submit Your Guess</h1>
        <div className='tabs tabs-boxed'>
          {['Submit Guess', 'Instructions'].map((tab) => {
            const isActive = tab === activeTab

            return (
              <a
                onClick={() => setActiveTab(tab)}
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
      {activeTab === 'Submit Guess' && <SubmitGuessSection />}
      {activeTab === 'Instructions' && <InstructionsSection />}
    </div>
  )
}

export default SubmitGuess

function SubmitGuessSection() {
  const { isAuthenticated } = useConvexAuth()
  const [selectedSuspect, setSelectedSuspect] = useState(-1)

  const suspects = useQuery(api.suspects.getAll)

  const teamGuess = useQuery(api.guesses.)

  if (!isAuthenticated) return null;

  return (
    <div className='full flex-col-tl gap-4'>
      <h2>Choose Your Prime Suspect</h2>
      <ul className='SUSPECT_LIST w-full grid grid-cols-3 gap-4'>
        {Array.isArray(suspects) &&
          suspects?.map((suspect, idx) => {
            const selectedStyle = suspect._id === suspects[selectedSuspect]?._id

            return (
              <li
                key={suspect._id}
                onClick={() => setSelectedSuspect(idx)}
                className={cn(
                  'SUSPECT_PORTRAIT relative rounded-md w-full flex-col-bl aspect-square border border-4 p-2',
                  selectedStyle ? 'border-secondary' : 'border-neutral'
                )}
              >
                <span
                  className={cn(
                    'relative z-10 badge badge-neutral',
                    selectedStyle ? 'badge-secondary' : 'badge-neutral'
                  )}
                >
                  {suspect.suspect_name}
                </span>
                <img
                  src={suspect.image_url!}
                  alt={suspect.suspect_name}
                  className='absolute object-cover full inset-0 rounded-sm'
                />
              </li>
            )
          })}
      </ul>
      {selectedSuspect >= 0 && suspects && (
        <div className='PRIME_SUSPECT_CARD card card-side bg-base-100 shadow-xl'>
          <figure className='w-[40%]'>
            <img
              className='w-full h-full object-cover'
              src={suspects[selectedSuspect]?.image_url!}
              alt={suspects[selectedSuspect]?.suspect_name!}
            />
          </figure>
          <div className='card-body'>
            <h2 className='card-title flex-col-tl gap-2'>
              <span>Your Prime Suspect</span>
              <span className='text-secondary font-bold'>
                {suspects[selectedSuspect]?.suspect_name!}
              </span>
            </h2>
            <p>Click the button to watch on Jetflix app.</p>
          </div>
        </div>
      )}
      <div className='PRIME_SUSPECT_CARD card card-side bg-base-100 shadow-xl'>
        <figure className='w-[40%]'>
          <img
            className='w-full h-full object-cover'
            src={suspects[selectedSuspect]?.image_url!}
            alt={suspects[selectedSuspect]?.suspect_name!}
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title flex-col-tl gap-2'>
            <span>Team Prime Suspect</span>
            <span className='text-accent font-bold'>
              {suspects[selectedSuspect]?.suspect_name!}
            </span>
          </h2>
          <p>Click the button to watch on Jetflix app.</p>
        </div>
      </div>
    </div>
  )
}

function InstructionsSection() {
  return (
    <>
      <div className='flex-col-tl'>
        <h4 className='italic text-accent'>Choosing a Prime Suspect</h4>
        <p>
          As you progress through the investigation, you&#39;ll gather clues,
          interrogate suspects, and piece together the puzzle. When you feel
          confident in your deduction, it&#39;s time to choose your prime
          suspect.
        </p>
      </div>
      <div className='flex-col-tl'>
        <h4 className='italic text-accent'>Change Your Guess Anytime</h4>
        <p>
          Detectives have the flexibility to change their prime suspect at any
          point before the game concludes. New clues might surface, or a
          different perspective may alter your suspicions. Keep your detective
          skills sharp, and be ready to adapt!
        </p>
      </div>
      <div className='flex-col-tl'>
        <h4 className='italic text-accent'>Final Showdown</h4>
        <p>
          When the game approaches its conclusion, all detectives will have the
          opportunity to make their final decision on the prime suspect. This is
          your chance to stick with your initial choice or switch based on the
          overall investigation progress.
        </p>
      </div>
      <div className='flex-col-tl'>
        <h4 className='italic text-accent'>Majority Rules</h4>
        <p>
          At the end of the game, the suspect with the most votes becomes the
          team&#39;s official choice. It&#39;s a democratic decision, so make
          sure your deductions are persuasive, and collaborate with your fellow
          detectives to build a solid case.
        </p>
      </div>
      <p className='italic'>
        Remember, the key to success is communication and collaboration. Work
        together, share your insights, and choose wisely. The fate of the case
        rests in the hands of the majority—may your investigative skills lead
        your team to victory!
      </p>
    </>
  )
}
