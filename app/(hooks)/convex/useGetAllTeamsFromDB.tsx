'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

const getTeamsFromDB = async () => {
  return await axios.get('/api/getTeam')
}

export const useGetAllTeamsFromDB = () => {
  const [team, setTeam] = useState<IConvexTeam[]>(Object)

  useEffect(() => {
      ;(async () => {
        try {
          const res = await getTeamsFromDB()
          const foundConvexTeams = res.data.teams

          if (!foundConvexTeams) throw Error('Could not find team!')

          setTeam(foundConvexTeams)
        } catch (error) {
          console.error('error: ', error)
        }
      })()
  }, [])

  return team
}
