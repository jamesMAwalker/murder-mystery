// @ts-nocheck
'use client'

import { useRef, useState } from 'react'
import { useQuery } from 'convex/react-internal'

import { SUSPECTS_DATA } from './data'
import { ISuspectCard } from './types'
import { api } from '@/convex/_generated/api'

const SuspectsPage = () => {
  const modalRef = useRef(null)
  const { heading } = SUSPECTS_DATA

  const [modalContent, setModalContent] = useState<ISuspectCard | null>(null)

  const handleSuspectClick = (idx: number) => {
    setModalContent(suspects[idx])
    modalRef.current.showModal()
  }

  const handleCloseModal = () => {
    modalRef.current.close()
  }

  const suspects = useQuery(api.suspects.getAll)

  return (
    <div className='full flex-col-tl gap-8'>
      <h1 className='text-2xl uppercase mt-4'>{heading}</h1>
      <ul className='SUSPECT_LIST z-10 full grid grid-cols-2 auto-rows-auto gap-[15px]'>
        {suspects?.map((suspect: any, idx: number) => {
          return (
            <li
              key={suspect._id}
              className='SUSPECT_ITEM full flex-col-bl'
              onClick={() => handleSuspectClick(idx)}
            >
              <div className='w-full aspect-square relative'>
                <img
                  className='absolute rounded-t-md full object-cover'
                  src={suspect.image_url}
                  alt={suspect.suspect_name}
                />
              </div>
              <button className='btn w-full rounded-t-none btn-secondary'>
                {suspect.suspect_name}
              </button>
            </li>
          )
        })}
      </ul>
      <dialog
        className='SUSPECT_MODAL modal !top-[10%] !flex flex-col-center !h-[min-content] isolate'
        ref={modalRef}
      >
        <button
          onClick={handleCloseModal}
          className='z-[1000] bg-white text-black btn btn-sm btn-circle btn-ghost absolute right-4 top-4'
        >
          ✕
        </button>
        <div className='card w-full glass'>
          <figure>
            <img
              src={modalContent?.image_url}
              alt={modalContent?.suspect_name}
              className='object-cover aspect-square'
            />
          </figure>
          <div className='card-body gap-4'>
            <h2 className='card-title'>{modalContent?.suspect_name}</h2>
            <p>{modalContent?.bio}</p>
            <div className='card-actions justify-end'>
              <button className='btn btn-primary'>Take Notes </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default SuspectsPage
