'use client'

import { useState } from 'react'
import axios from 'axios'

const updateTeamWithRemovedMember = async (team_id: string, user_id: string) => {
  return await axios.patch('/api/team/remove', { team_id, user_id })
}

export const useRemoveMemberFromTeam = () => {
  const [team, setTeam] = useState<IConvexTeam>(Object)
  const [error, setError] = useState<string | null>(null)

  function removeMemberFromTeam(team_id: string, user_id: string) {
    ;(async () => {
      try {
        const res = await updateTeamWithRemovedMember(team_id, user_id)

        console.log('_____res from remove from team hook:_____ ', res)

        const updatedTeam = res.data.team

        if (!updatedTeam) throw Error('Could not find user!')

        setTeam(updatedTeam)
      } catch (error: any) {
        console.error('error: ', error)
        setError(error?.message)
      }
    })()
  }

  return { removeMemberFromTeam, error }
}
