'use client'

import { useState } from 'react'
import axios from 'axios'

const createInvitationInDB = async (team_id: string, user_id: string) => {
  return await axios.post('/api/invitation/create', { team_id, user_id })
}

export const useCreateInvitationInDB = () => {
  const [invitation, setInvitation] = useState<IConvexInvitation | null>(null)
  const [error, setError] = useState<string | null>(null)

  function createInvitation(team_id: string, user_id: string) {
    ;(async () => {
      try {
        const res = await createInvitationInDB(team_id, user_id)

        console.log('_____res from create inivitation hook:_____ ', res)

        const newConvexInvitation = res.data.invitation

        if (!newConvexInvitation) throw Error('Error initiating invitation!')

        setInvitation(newConvexInvitation)
      } catch (error: any) {
        console.error('error: ', error)
        setError(error?.message)
      }
    })()
  }

  return { createInvitation, invitation, error }
}
