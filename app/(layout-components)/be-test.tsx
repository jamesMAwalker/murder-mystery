'use client'

import { useUserContext } from '../(context)/user.context'
import { useCreateTeamInDB } from '../(hooks)/convex/teams/useCreateTeamInDB'
import { useCreateRequestInDB } from '../(hooks)/convex/requests/useCreateRequest'
import { useGetRequestsByTeamID } from '../(hooks)/convex/requests/useGetRequestsByTeamID'
import { useGetRequestsByUserID } from '../(hooks)/convex/requests/useGetRequestsByUserID'
import { useAddMemberToTeam } from '../(hooks)/convex/teams/useAddMemberToTeam'
import { useRemoveMemberFromTeam } from '../(hooks)/convex/teams/useRemoveMemberFromTeam'
import { useCreateInvitationInDB } from '../(hooks)/convex/invitations/useCreateInivitation'

export const BE_Test = () => {
  // test create invitation
  const { createInvitation } = useCreateInvitationInDB()
  const handleCreateInvitation = () => {
     const team_id = '4gmbygg691879fkmnze3pxy89j5pt50'
     const user_id = '4acgwrxxrg65mrghs0mrpf0j9j5jehr'
     createInvitation(team_id, user_id)
  }

  // test remove member from team
  const { removeMemberFromTeam } = useRemoveMemberFromTeam()
  const handleRemoveMember = () => {
    const team_id = '4gmbygg691879fkmnze3pxy89j5pt50'
    const user_id = '498ncp61be3rq103xh9h80p49j5wcx8'
    removeMemberFromTeam(team_id, user_id)
  }

  // test add member to team
  const { addMemberToTeam } = useAddMemberToTeam()
  const handleAddMember = () => {
    const team_id = '4gmbygg691879fkmnze3pxy89j5pt50'
    const user_id = '498ncp61be3rq103xh9h80p49j5wcx8'
    addMemberToTeam(team_id, user_id)
  }

  // test get requests by user id
  const requestsByUserId = useGetRequestsByUserID(
    '498ncp61be3rq103xh9h80p49j5wcx8'
  )

  // test get requests by team id
  const requestsByTeamId = useGetRequestsByTeamID(
    '4gmbygg691879fkmnze3pxy89j5pt50'
  )

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
    <>
      {/* <button
        // onClick={() => handleCreateTeam()}
        // onClick={() => handleCreateRequest()}
        // onClick={() => handleRemoveMember()}
        onClick={() => handleAddMember()}
        className='fixed bottom-40 btn btn-warning'
      >
        Test: Remove Member
        Test: Add Member
      </button> */}
      <button
        // onClick={() => handleCreateTeam()}
        // onClick={() => handleCreateRequest()}
        // onClick={() => handleAddMember()}
        // onClick={() => handleRemoveMember()}
        onClick={() => handleCreateInvitation()}
        className='fixed bottom-24 btn btn-warning btn-outline'
      >
        {/* Test: Add Member */}
        {/* Test: Remove Member */}
        Test: Invite to Team
      </button>
    </>
  )
}
