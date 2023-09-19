'use client'

import { useState } from 'react'
import axios from 'axios'

async function createUserInDB(user: IConvexUser) {
  return await axios.post('/api/user/create', user)
}

// TODO: Add a message  to the hook export for use in client communication.

export const useCreateUserInDB = () => {
  const [user, setUser] = useState<IConvexUser>(Object)
    const [error, setError] = useState<string | null>(null)

    
    function createUser(userData: IConvexUser) {
    ;(async () => {
      try {
        const res = await createUserInDB(userData)
        
        // console.log('_____res from create user hook:_____ ', res)
       
        const newConvexUser = res.data

        if (!newConvexUser) throw Error('Error creating user!')

        setUser(newConvexUser)
      } catch (error: any) {
        console.error('error: ', error)
        setError(error?.message)
      }
    })()
  }

  return { createUser, user }
}
