'use client';

import axios from 'axios'
import { useEffect, useState } from 'react'

const getTeamFromDB = async (team_id: string) => {
  return await axios.post('/api/team/get', { team_id: team_id })
}

export const useGetTeamFromDB = (team_id: string | null) => {
  const [team, setTeam] = useState<IConvexTeam>(Object)

  useEffect(() => {
    if (team_id) {
      ;(async () => {
        try {
          const res = await getTeamFromDB(team_id)
          console.log('res from useGetTeam: ', res)
          const foundConvexTeam = res.data.team

          if (!foundConvexTeam) throw Error('Could not find team!')

          setTeam(foundConvexTeam)
        } catch (error) {
          console.error('error: ', error)
        }
      })()
    }
  }, [team_id])

  return team
}
