'use client'

/*
  ! Current Issues:
  # As nice as it seemed to have the bottom nav determine the round as well as the page, I'm thinking this might end up being more confusing to people.
  # Instead of including a button for selecting the round, this component should only allow users to choose the current page.
  # In light of this, should we instead make this a slider rather than a dropdown?
*/

import { useRef, useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { useGameContext } from '../(context)/game.context'
import { useCreateTeamInDB } from '../(hooks)/convex/teams/useCreateTeamInDB'
import { useUserContext } from '../(context)/user.context'
import { useCreateTeamRequestInDB } from '../(hooks)/convex/requests/useCreateRequest'

interface IDropdownContent {
  [key: string]: string
  path: string
}

const pages: IDropdownContent[] = [
  { page: 'Home', path: '' },
  { page: 'Background', path: 'background' },
  { page: 'Instructions', path: 'instructions' },
  { page: 'Notes', path: 'notes' },
  { page: 'Suspects', path: 'suspects' }
]

export const BottomNav = () => {
  const { user } = useUserContext()
  const { createTeam } = useCreateTeamInDB()

  const { createRequest } = useCreateTeamRequestInDB()

  const handleTestClick = () => {
    const team_id = '4gmbygg691879fkmnze3pxy89j5pt50'
    const user_id = '498ncp61be3rq103xh9h80p49j5wcx8'
    createRequest(team_id, user_id)
  }
  // const handleTestClick = (team_name: string) => {
  //   if (user?._id) {
  //     console.log('user: ', user);
  //     createTeam(team_name, user._id)

  //   }
  // }

  const { push } = useRouter()

  const [current, setCurrent] = useState(0)
  const [open, setOpen] = useState(false)

  const rotated = open ? 'rotate-180' : 'rotate-0'

  const handleClick = (idx: number, path: string) => {
    setCurrent(idx)
    push(path)
  }

  return (
    <>
      <button
        // onClick={() => handleTestClick('FDJ')}
        onClick={() => handleTestClick()}
        className='fixed bottom-24 btn btn-accent'
      >
        Create Request
      </button>
      <div className='fixed bottom-0 left-0 rounded-none collapse bg-primary w-full'>
        <input
          onClick={() => setOpen(!open)}
          type='checkbox'
          className='peer'
        />
        <p className='collapse-title font-bold flex items-center justify-between bg-primary peer-checked:text-secondary-content'>
          <span>{pages[current].page}</span>
          <span className={cn(rotated)}>▲</span>
        </p>
        <ul className='w-full collapse-content flex-col-center p-0'>
          {pages.map(({ page, path }, idx) => {
            const active = idx === current

            if (!active)
              return (
                <li
                  className={cn(
                    'w-full px-4 py-2 text-primary-content peer-checked:text-secondary-content'
                  )}
                  onClick={() => handleClick(idx, path)}
                  key={page}
                >
                  {page}
                </li>
              )
          })}
        </ul>
      </div>
    </>
  )
}
