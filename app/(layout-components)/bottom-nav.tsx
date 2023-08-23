'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'

interface IDropdownContent {
  [key: string]: string
  path: string
}

const rounds: IDropdownContent[] = [
  { round: 'Round 0', path: '' },
  { round: 'Round 1', path: 'round-1' },
  { round: 'Round 2', path: 'round-2' },
  { round: 'Round 3', path: 'round-3' },
  { round: 'Round 4', path: 'round-4' },
]

const pages: IDropdownContent[] = [
  { page: 'Home', path: '' },
  { page: 'Background', path: 'background' },
  { page: 'Instructions', path: 'instructions' },
  { page: 'Notes', path: 'notes' },
  { page: 'Suspects', path: 'suspects' },
]

export const BottomNav = () => {
  const [selectedRound, setSelectedRound] = useState<number>(0)
  const [selectedPage, setSelectedPage] = useState<number>(0)

  const { push } = useRouter()

  useEffect(() => {
    const route = `/${rounds[selectedRound].path}/${pages[selectedPage].path}`
    console.log('route: ', route);
    
    // push(route)
  }, [selectedRound, selectedPage])
  
  return (
    <div className='fixed bottom-0 p-4 flex w-full items-center'>
      <nav className='navbar grid grid-cols-2 gap-4'>
        <Dropdown
          type='round'
          content={rounds}
          selected={selectedRound}
          setSelected={setSelectedRound}
        />
        <Dropdown
          type='page'
          content={pages}
          selected={selectedPage}
          setSelected={setSelectedPage}
        />
      </nav>
    </div>
  )
}

interface IDropdown {
  type: string
  content: IDropdownContent[]
  selected: number
  setSelected: (set: any) => void
}

function Dropdown({ type, content, selected, setSelected }: IDropdown) {
  const color = type === 'round' ? 'bg-accent' : 'bg-primary'

  return (
    <details className='dropdown dropdown-top'>
      <summary className={cn('button p-4 rounded-md', color)}>
        {content[selected][type]}
      </summary>
      <ul
        className={cn(
          'dropdown-content flex flex-col gap-2 z-[1] menu w-full p-2 shadow mb-2 rounded-box rounded-md',
          color
        )}
      >
        {content.map((contentItem: IDropdownContent, idx: number) => (
          <li
            key={contentItem[type]}
            onTouchEnd={() => setSelected(idx)}
            className='p-4 bg-slate-800 badge'
          >
            {contentItem[type]}
          </li>
        ))}
      </ul>
    </details>
  )
}
