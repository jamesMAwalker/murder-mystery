'use client'

import { useState } from 'react'
import axios from 'axios'

const deleteInvitationFromDB = async (invitation_id: string) => {
  return await axios.delete('/api/invitation/destroy', {
    data: { invitation_id }
  })
}

export const useDeleteInvitationFromDB = () => {
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function destroyInvitation(invitation_id: string) {
    ;(async () => {
      try {
        const res = await deleteInvitationFromDB(invitation_id)

        console.log('_____res from delete inivitation hook:_____ ', res)

        const destroyedConfirm = res.data.message

        if (!destroyedConfirm) throw Error('Error deleting invitation!')

        setMessage(destroyedConfirm)
      } catch (error: any) {
        console.error('error: ', error)
        setError(error?.message)
      }
    })()
  }

  return { destroyInvitation, message, error }
}
