'use client';

import { useState } from 'react'

import { SUSPECTS_DATA } from './data'
import { ISuspectCard } from './types'


const SuspectsPage = () => {
  const { heading, list } = SUSPECTS_DATA

  const [modalContent, setModalContent] = useState<ISuspectCard | null>(null)

  const handleSuspectClick = (idx: number) => {
    setModalContent(list[idx])
    window.test_modal.showModal()
  }


  return (
    <div className='full flex-col-tl gap-8'>
      <h1 className='text-2xl uppercase mt-4'>{heading}</h1>
      <ul className='full grid grid-cols-2 auto-rows-[300px] gap-[15px]'>
        {list.map((item: ISuspectCard, idx: number) => {
          return (
            <li key={item.id} className='full flex-col-bl gap-4'>
              <div className='full relative'>
                <img
                  className='absolute full object-cover'
                  src={item.image.src}
                  alt={item.image.alt}
                />
              </div>
              <button
                onClick={() => handleSuspectClick(idx)}
                className='btn w-full'
              >
                {item.name}
              </button>
            </li>
          )
        })}
      </ul>
      <dialog className='modal' id='test_modal'>
        <form className='modal-box'>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            ✕
          </button>
          <div className='card pt-8 w-auto flex-col-tl gap-4'>
            <figure>
              <img
                className='rounded-xl'
                src={modalContent?.image.src}
                alt={modalContent?.image.alt}
              />
            </figure>
            <div className='card-body !p-0 w-full flex-col-tl gap-4'>
              <h2 className='card-title'>{modalContent?.name} {modalContent?.id}</h2>
              <p>{modalContent?.desc}</p>
              <div className='card-actions w-full justify-end'>
                <button className='btn btn-primary w-full'>Buy Now</button>
              </div>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  )
}

export default SuspectsPage
