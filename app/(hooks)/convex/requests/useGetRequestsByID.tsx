'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

const getRequestsByUserID = async (user_id: string) => {
  return await axios.post('/api/request/get', { user_id })
}

export const useGetRequestsByID = (user_id: string | undefined) => {
  const [requests, setRequests] = useState<IConvexRequest>(Object)

  useEffect(() => {
    if (user_id) {
      ;(async () => {
        try {
          const res = await getRequestsByUserID(user_id)
          console.log('res from useGetTeam: ', res)
          const foundConvexTeam = res.data.team

          if (!foundConvexTeam) throw Error('Could not find team!')

          setRequests(foundConvexTeam)
        } catch (error) {
          console.error('error: ', error)
        }
      })()
    }
  }, [user_id])

  return requests
}
