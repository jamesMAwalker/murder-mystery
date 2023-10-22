'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useQuery } from 'convex/react'

import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'

import { PhasedRoundTimer } from '../round-timer-phased'
import { pages } from './data'

export const BottomNav = () => {
  const user = useQuery(api.users.getFromSession)
  const activeRound = useQuery(api.phased_rounds.getActiveRound)

  const userRole = user?.role

  // navigation set up.
  const { push } = useRouter()
  const pathname = usePathname()

  // set up page navigation logic.
  const [currentPathIdx, setCurrentPathIdx] = useState(0)

  useEffect(() => {
    const updatedCurrent = pages.findIndex((p) => p.path === pathname)
    if (updatedCurrent !== -1 && currentPathIdx !== updatedCurrent) {
      setCurrentPathIdx(updatedCurrent)
    }
  }, [pathname])

  // Set up drawer open/close logic
  const checkBoxRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)

  const handleClick = (idx: number, path: string) => {
    setCurrentPathIdx(idx)
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
        <span>{pages[currentPathIdx].pageTitle}</span>
      </p>

      <ul className='w-full px-8 collapse-content grid grid-cols-4 gap-1 p-0'>
        {/* {pages.map(({ key, pageTitle, path, icon }, idx) => { */}
        {pages.map((page, idx) => {
          const buttonProps = {
            ...page,
            activeRound,
            userRole,
            handleClick: () => handleClick(idx, page.path)
          }

          return <BottomNavButton key={page.pageTitle} {...buttonProps} />
        })}
      </ul>
      <PhasedRoundTimer />
    </div>
  )
}

function BottomNavButton({
  pageKey,
  icon,
  pageTitle,
  activeRound,
  userRole,
  handleClick
}: any) {
  const shouldBeHidden = {
    // hidden before round 1.
    guess: activeRound?.round_number! <= 0,
    suspects: activeRound?.round_number! <= 0,

    // hidden if not admin.
    admin: userRole?.toLowerCase() !== 'admin',

    // hidden if not suspect.
    script: userRole?.toLowerCase() !== 'suspect'
  }

  const hide = shouldBeHidden[pageKey as keyof typeof shouldBeHidden]

  return (
    <li
      className={cn(
        'BN_BUTTON bg-white/5 hover:bg-secondary/30 text-white hover:text-secondary gap-2 aspect-square flex-col-center w-full text-primary-content peer-checked:text-secondary-content focus:text-secondary',
        hide && '!hidden'
      )}
      onClick={handleClick}
    >
      {icon}
      <span>{pageTitle}</span>
    </li>
  )
}
