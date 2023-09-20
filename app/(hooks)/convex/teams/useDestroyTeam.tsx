'use client'

import { useState } from 'react'
import axios from 'axios'

const deleteTeamFromDB = async (team_id: string) => {
  return await axios.delete('/api/team/destroy', {
    data: { team_id }
  })
}

export const useDeleteTeamFromDB = () => {
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function destroyTeam(team_id: string) {
    ;(async () => {
      try {
        const res = await deleteTeamFromDB(team_id)

        console.log('_____res from delete team hook:_____ ', res)

        const destroyConfirm = res.data.message

        if (!destroyConfirm) throw Error('Error deleting team!')

        setMessage(destroyConfirm)
      } catch (error: any) {
        console.error('error: ', error)
        setError(error?.message)
      }
    })()
  }

  return { destroyTeam, message, error }
}
