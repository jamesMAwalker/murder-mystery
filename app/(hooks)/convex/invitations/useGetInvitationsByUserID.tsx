'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

const getInvitationsByUserID = async (user_id: string) => {
  return await axios.post('/api/invitation/get', { user_id })
}

export const useGetInvitationsByUserID = (user_id: string | undefined) => {
  const [invitations, setInvitations] = useState<IConvexInvitation | null>(null)

  // TODO: Pull in notiications context to set and send errors to user.
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user_id) {
      ;(async () => {
        try {
          const res = await getInvitationsByUserID(user_id)

          // console.log('_____res from get invitations by user_id hook_____: ', res)

          const foundConvexInvitations = res.data.invitations

          if (!foundConvexInvitations) {
            setInvitations(null)
          } else {
            setInvitations(foundConvexInvitations)
          }
        } catch (error: any) {
          console.error('error: ', error)
          setError(error?.message)
        }
      })()
    }
  }, [user_id])

  return invitations
}
