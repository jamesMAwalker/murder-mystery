'use client'

import { useUserContext } from '../(context)/user.context'
import { useCreateTeamInDB } from '../(hooks)/convex/teams/useCreateTeamInDB'
import { useCreateRequestInDB } from '../(hooks)/convex/requests/useCreateRequest'
import { useGetRequestsByTeamID } from '../(hooks)/convex/requests/useGetRequestsByTeamID'
import { useGetRequestsByUserID } from '../(hooks)/convex/requests/useGetRequestsByUserID'

export const BE_Test = () => {
  // test get requests by user id
  const requestsByUserId = useGetRequestsByUserID(
    '498ncp61be3rq103xh9h80p49j5wcx8'
  )
  // console.log('requestsByUserId: ', requestsByUserId)

  // test get requests by team id
  const requestsByTeamId = useGetRequestsByTeamID(
    '4gmbygg691879fkmnze3pxy89j5pt50'
  )
  // console.log('requestsByTeamId: ', requestsByTeamId)

  // test loading user requests into context
  const uctx = useUserContext()
  const { user } = uctx

  // test request creation
  const { createRequest } = useCreateRequestInDB()

  const handleCreateRequest = () => {
    const team_id = '4gmbygg691879fkmnze3pxy89j5pt50'
    const user_id = '498ncp61be3rq103xh9h80p49j5wcx8'
    createRequest(team_id, user_id)
  }

  // test team creation
  const { createTeam } = useCreateTeamInDB()

  const handleCreateTeam = () => {
    const team_name = 'FDJ'

    if (user?._id) {
      createTeam(team_name, user._id)
    }
  }

  return (
    <button
      // onClick={() => handleCreateTeam()}
      onClick={() => handleCreateRequest()}
      className='fixed bottom-24 btn btn-warning'
    >
      Test: Create Request
    </button>
  )
}
