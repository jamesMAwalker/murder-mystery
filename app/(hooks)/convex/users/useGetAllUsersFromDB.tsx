'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

const getUsersFromDB = async () => {
  return await axios.get('/api/user/get')
}

export const useGetAllUsersFromDB = () => {
  const [users, setUsers] = useState<IConvexUser[]>(Object)
    const [error, setError] = useState<string | null>(null)

    
    useEffect(() => {
    ;(async () => {
      try {
        const res = await getUsersFromDB()
        
        // console.log('_____res from get all users hook_____: ', res);
        
        const foundConvexUsers = res.data.users
        
        if (!foundConvexUsers) throw Error('Error fetching users!')
        
        setUsers(foundConvexUsers)
      } catch (error:any) {
        console.error('error: ', error);
        setError(error?.message)

      }
    })()
  }, [])

  return users
}
