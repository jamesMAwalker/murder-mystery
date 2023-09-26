'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'

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
  const { push } = useRouter()

  const [current, setCurrent] = useState(0)
  const [open, setOpen] = useState(false)

  const rotated = open ? 'rotate-180' : 'rotate-0'

  const handleClick = (idx: number, path: string) => {
    setCurrent(idx)
    push(path)
  }

  return (
    <div className='hover:opacity-25 fixed z-50 bottom-0 left-0 rounded-none collapse bg-primary w-full'>
      <input onClick={() => setOpen(!open)} type='checkbox' className='peer' />
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
  )
}
