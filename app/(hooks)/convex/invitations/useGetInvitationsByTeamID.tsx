'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

const getInvitationsByTeamID = async (team_id: string) => {
  return await axios.post('/api/invitation/get', { team_id })
}

export const useGetInvitationsByTeamID = (team_id: string | undefined) => {
  const [invitations, setInvitations] = useState<IConvexInvitation | null>(null)

  // TODO: Pull in notiications context to set and send errors to user.
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (team_id) {
      ;(async () => {
        try {
          const res = await getInvitationsByTeamID(team_id)

          // console.log('_____res from get invitations by team_id hook_____: ', res)

          const foundConvexRequests = res.data.invitations

          if (!foundConvexRequests) {
            setInvitations(null)
          } else {
            setInvitations(foundConvexRequests)
          }
        } catch (error: any) {
          console.error('error: ', error)
          setError(error?.message)
        }
      })()
    }
  }, [team_id])

  return invitations
}
