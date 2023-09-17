'use client'

import { useState } from 'react'
import axios from 'axios'

const createTeamInDB = async (team_name: string, user_id: string) => {
  return await axios.post('/api/team/create', { team_name, user_id })
}

export const useCreateTeamInDB = () => {
  const [team, setTeam] = useState<IConvexTeam>(Object)

  function createTeam(team_name: string, user_id: string) {
    ;(async () => {
      try {
        const res = await createTeamInDB(team_name, user_id)
        
        // console.log('_____res from create team hook:_____ ', res);
        
        const newConvexTeam = res.data

        if (!newConvexTeam) throw Error('Could not find user!')

        setTeam(newConvexTeam)
      } catch (error) {
        console.error('error: ', error)
      }
    })()
  }

  return { createTeam, team };
}
