'use client'

import { useRef, useState, SyntheticEvent } from 'react'
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

  const handleChangeRoute = (e: SyntheticEvent) => {
    e.preventDefault()

    const round = rounds[selectedRound].path
    const page = pages[selectedPage].path

    const route = `/${round}/${page}`
    console.log('route: ', route)

    // push(route)
  }

  return (
    <div className='fixed bottom-0 p-4 flex w-full items-center'>
      <nav className='navbar grid grid-cols-[.5fr_.5fr_.1fr] gap-2'>
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
        <button
          onClick={handleChangeRoute}
          className='btn full text-black btn-accent p-4 rounded-md'
        >
          →
        </button>
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
  const handleOptionClick = (idx: number) => {
    // TODO: Set dropdown to close on option click.
    
    setSelected(idx)
  }

  return (
    <details className='dropdown dropdown-top'>
      <summary
        tabIndex={0}
        className={cn('full border border-accent text-accent p-4 rounded-md ')}
      >
        {content[selected][type]}
      </summary>
      <ul
        tabIndex={0}
        className={cn(
          'dropdown-content bg-black border border-accent flex flex-col gap-4 z-[1] menu w-full p-4 shadow mb-2 rounded-box rounded-md'
        )}
      >
        {content.map((contentItem: IDropdownContent, idx: number) => (
          <li
            key={contentItem[type]}
            onClick={() => handleOptionClick(idx)}
            // onTouchEnd={() => handleOptionClick(idx)}
            className='p-4 bg-black text-accent badge'
          >
            {contentItem[type]}
          </li>
        ))}
      </ul>
    </details>
  )
}
