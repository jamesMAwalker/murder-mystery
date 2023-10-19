'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { RoundTimer } from './round-timer'
import {
  AlertIcon,
  GuessIcon,
  HomeIcon,
  HowToIcon,
  NotesIcon,
  ProfileIcon,
  StoryIcon,
  SuspectIcon
} from '../(components)/index'
import { PhasedRoundTimer } from './round-timer-phased'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

interface IDropdownContent {
  page: string
  path: string
  icon: JSX.Element
  hidden?: boolean
}

const pages: IDropdownContent[] = [
  { page: 'Home', path: '/', icon: <HomeIcon /> },
  { page: 'Story', path: '/background', icon: <StoryIcon /> },
  { page: 'How-to', path: '/instructions', icon: <HowToIcon /> },
  { page: 'Notes', path: '/notes', icon: <NotesIcon /> },
  { page: 'Suspects', path: '/suspects', icon: <SuspectIcon /> },
  { page: 'News', path: '/reports', icon: <AlertIcon /> },
  { page: 'Profile', path: '/user-profile', icon: <ProfileIcon /> },
  { page: 'Guess! ', path: '/submit-guess', icon: <GuessIcon /> }
]

export const BottomNav = () => {
  const activeRound = useQuery(api.phased_rounds.getActiveRound)
  console.log('activeRound: ', activeRound)

  // navigation set up.
  const { push } = useRouter()
  const pathname = usePathname()

  // set up page navigation logic.
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const updatedCurrent = pages.findIndex((p) => p.path === pathname)
    if (updatedCurrent !== -1 && current !== updatedCurrent) {
      setCurrent(updatedCurrent)
    }
  }, [pathname])

  // Set up drawer open/close logic
  const checkBoxRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)

  const handleClick = (idx: number, path: string) => {
    setCurrent(idx)
    push(path)
    setOpen(false)

    // hihglight selection and then close
    setTimeout(() => {
      if (checkBoxRef.current) {
        checkBoxRef.current.checked = false
      }
    }, 250)
  }

  return (
    <div className='fixed z-50 bottom-0 left-0 rounded-none collapse bg-primary pt-4 w-full'>
      <span className='absolute z-[50] translate-x-[-50%] top-[6px] left-1/2 h-[3px] w-[50px] bg-white/50 rounded-md'></span>
      <input
        ref={checkBoxRef}
        onClick={() => setOpen(!open)}
        type='checkbox'
        className='peer'
      />
      <p className='uppercase tracking-wide text-lg w-full collapse-title font-bold flex items-center justify-center bg-primary py-4 !px-0 peer-checked:text-secondary-content'>
        <span>{pages[current].page}</span>
      </p>

      <ul className='w-full px-8 collapse-content grid grid-cols-4 gap-1 p-0'>
        {pages.map(({ page, path, icon }, idx) => {
          const active = idx === current
          
          // hide suspects until round 1.
          const hidden =
            activeRound?.round_number! <= 0 && path === '/suspects'
              ? true
              : false 

          return (
            <li
              className={cn(
                'bg-white/5 hover:bg-secondary/30 text-white hover:text-secondary gap-2 aspect-square flex-col-center w-full text-primary-content peer-checked:text-secondary-content focus:text-secondary',
                hidden && '!hidden'
              )}
              onClick={() => handleClick(idx, path)}
              key={page}
            >
              {icon}
              <span>{page}</span>
            </li>
          )
        })}
      </ul>
      <PhasedRoundTimer />
    </div>
  )
}
