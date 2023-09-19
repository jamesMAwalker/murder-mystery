'use client'

import { useState } from 'react'
import axios from 'axios'

const createRequestInDB = async (team_id: string, user_id: string) => {
  return await axios.post('/api/request/create', { team_id, user_id })
}

export const useCreateRequestInDB = () => {
  const [request, setRequest] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function createRequest(team_id: string, user_id: string) {
    ;(async () => {
      try {
        const res = await createRequestInDB(team_id, user_id)

        // console.log('_____res from create request hook:_____ ', res)
        
        const newConvexRequest = res.data

        if (!newConvexRequest) throw Error('Error initiating request!')

        setRequest(newConvexRequest)
      } catch (error: any) {
        console.error('error: ', error)
        setError(error?.message)
      }
    })()
  }

  return { createRequest, request, error }
}
