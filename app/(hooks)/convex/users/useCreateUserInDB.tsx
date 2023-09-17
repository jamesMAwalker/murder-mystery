'use client'

import { useState } from 'react'
import axios from 'axios'

async function createUserInDB(user: IConvexUser) {
  return await axios.post('/api/user/create', user)
}

// TODO: Add a message  to the hook export for use in client communication.

export const useCreateUserInDB = () => {
  const [user, setUser] = useState<IConvexUser>(Object)

  function createUser(userData: IConvexUser) {
    ;(async () => {
      try {
        const res = await createUserInDB(userData)
        
        // console.log('_____res from create user hook:_____ ', res)
       
        const newConvexUser = res.data

        if (!newConvexUser) throw Error('Error creating user!')

        setUser(newConvexUser)
      } catch (error) {
        console.error('error: ', error)
      }
    })()
  }

  return { createUser, user }
}
