'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

const getRequestsByUserID = async (user_id: string) => {
  return await axios.post('/api/request/get', { user_id })
}

export const useGetRequestsByID = (user_id: string | undefined) => {
  const [requests, setRequests] = useState<IConvexRequest | null>(Object)

  useEffect(() => {
    if (user_id) {
      ;(async () => {
        try {
          const res = await getRequestsByUserID(user_id)
          console.log('res from useGetRequests: ', res)
          const foundConvexRequests = res.data.team

          if (!foundConvexRequests) {
            setRequests(null)
          } else {
            setRequests(foundConvexRequests)
          }
        } catch (error) {
          console.error('error: ', error)
        }
      })()
    }
  }, [user_id])

  return requests
}
