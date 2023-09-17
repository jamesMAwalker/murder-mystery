'use client'

import { useState } from 'react'
import axios from 'axios'

const updateTeamWithNewMember = async (team_id: string, user_id: string) => {
  return await axios.patch('/api/team/add', { team_id, user_id })
}

export const useAddMemberToTeam = () => {
  const [team, setTeam] = useState<IConvexTeam>(Object)
  const [error, setError] = useState<string | null>(null)

  function addMemberToTeam(team_id: string, user_id: string) {
    ;(async () => {
      try {
        const res = await updateTeamWithNewMember(team_id, user_id)

        console.log('_____res from add to team hook:_____ ', res);

        const updatedTeam = res.data

        if (!updatedTeam) throw Error('Could not find user!')

        setTeam(updatedTeam)
      } catch (error: any) {
        console.error('error: ', error)
        setError(error?.message)
      }
    })()
  }

  return { addMemberToTeam, error }
}
