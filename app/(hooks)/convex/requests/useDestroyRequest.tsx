'use client'

import { useState } from 'react'
import axios from 'axios'

const deleteRequestFromDB = async (request_id: string) => {
  return await axios.delete('/api/request/destroy', {
    data: { request_id }
  })
}

export const useDeleteRequestFromDB = () => {
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function destroyRequest(request_id: string) {
    ;(async () => {
      try {
        const res = await deleteRequestFromDB(request_id)

        console.log('_____res from delete request hook:_____ ', res)

        const destroyedConfirm = res.data.message

        if (!destroyedConfirm) throw Error('Error deleting request!')

        setMessage(destroyedConfirm)
      } catch (error: any) {
        console.error('error: ', error)
        setError(error?.message)
      }
    })()
  }

  return { destroyRequest, message, error }
}
