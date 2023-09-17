'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

const getRequestsByUserID = async (user_id: string) => {
  return await axios.post('/api/request/get', { user_id })
}

export const useGetRequestsByID = (user_id: string | undefined) => {
  const [requests, setRequests] = useState<IConvexRequest | null>(Object)
    const [error, setError] = useState<string | null>(null)

    
    
  useEffect(() => {
    if (user_id) {
      ;(async () => {
        try {
          const res = await getRequestsByUserID(user_id)

          // console.log('_____res from get request hook_____: ', res)
          
          const foundConvexRequests = res.data.team

          if (!foundConvexRequests) {
            setRequests(null)
          } else {
            setRequests(foundConvexRequests)
          }
        } catch (error: any) {
          console.error('error: ', error)
          setError(error?.message)
        }
      })()
    }
  }, [user_id])

  return requests
}
