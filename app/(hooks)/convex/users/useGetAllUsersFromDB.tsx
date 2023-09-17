'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

const getUsersFromDB = async () => {
  return await axios.get('/api/user/get')
}

export const useGetAllUsersFromDB = () => {
  const [users, setUsers] = useState<IConvexUser[]>(Object)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getUsersFromDB()

        const foundConvexUsers = res.data.users

        if (!foundConvexUsers) throw Error('Error fetching users!')

        setUsers(foundConvexUsers)
      } catch (error) {}
    })()
  }, [])

  return users
}
