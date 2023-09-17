'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

const getRequestsByTeamID = async (team_id: string) => {
  return await axios.post('/api/request/get', { team_id })
}

export const useGetRequestsByTeamID = (team_id: string | undefined) => {
  const [requests, setRequests] = useState<IConvexRequest | null>(Object)

  // TODO: Pull in notiications context to set and send errors to user.
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (team_id) {
      ;(async () => {
        try {
          const res = await getRequestsByTeamID(team_id)

          console.log('_____res from get request by team_id hook_____: ', res)

          const foundConvexRequests = res.data.requests

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
  }, [team_id])

  return requests
}
