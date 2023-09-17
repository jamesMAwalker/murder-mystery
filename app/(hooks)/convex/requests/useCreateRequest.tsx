'use client'

import { useState } from 'react'
import axios from 'axios'

const createRequestInDB = async (team_id: string, user_id: string) => {
  return await axios.post('/api/request/create', { team_id, user_id })
}

export const useCreateRequestInDB = () => {
  const [request, setRequest] = useState<string | null>(null)

  function createRequest(team_id: string, user_id: string) {
    ;(async () => {
      try {
        const res = await createRequestInDB(team_id, user_id)
        console.log('+++++res from create request:+++++ ', res)
        const newConvexRequest = res.data

        if (!newConvexRequest) throw Error('Error initiating request!')

        setRequest(newConvexRequest)
      } catch (error) {
        console.error('error: ', error)
      }
    })()
  }

  return { createRequest, request }
}
