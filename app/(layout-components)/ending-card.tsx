'use client'

import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from 'convex/react'

import { api } from '@/convex/_generated/api'

export const EndingCard = () => {
  const [visible, setVisible] = useState(false)
  const game = useQuery(api.game.getGameObject)

  useEffect(() => {
    if (game) {
      setVisible(game?.concluded)
    }
  }, [game])

  if (!game?.concluded || !visible) return null

  return (
    <div className='BLUR_SHADE fixed top-0 w-screen h-screen bg-red-800/50 backdrop-blur z-[1000] flex flex-col items-center justify-center'>
      <div className='card w-5/6 bg-base-100 shadow-xl'>
        <figure>
          <img src='/den.webp' alt='Shoes' />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>
            <span>And the murderer is... </span>
            <span className='text-red-500'>{game.guilty_suspect_name}!</span>
          </h2>
          <p>
            Despite his charismatic and charming persona, had a hidden motive.
            Đen Vâu had discovered Myles&#39;s involvement in a past scandal
            that could have ruined his reputation as a language teacher. Fearing
            the exposure of this secret, Myles used chloroform to subdue Đen Vâu
            during the party, strangled him, then put poison in his whiskey
            after the murder in an attempt to frame his wife (whom he had been
            quarreling with lately).
          </p>
          <div className='card-actions justify-end'>
            <p className='italic'>Thanks for playing!</p>
            <button
              onClick={() => setVisible(false)}
              className='btn btn-primary'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
