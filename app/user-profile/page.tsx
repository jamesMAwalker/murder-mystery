'use client'

import { useUser } from '@clerk/clerk-react'

const UserProfilePage = () => {
  const { user } = useUser()
  console.log('user: ', user)

  /*
    * User Profile UI Elements
    # User Info: Should show user's: name, email, team name (if on team).
    # Action Buttons:
    - If not on team: Should show buttons: Join Team, Create Team
      > Each of these opens a dropdown with a list of joinable teams (not full).
    - If on team: Should show buttons: Add Member, Leave Team
      > Add member shows a dropdown with a list of unattached participants.

    # If you think of anything else, feel free to add!
  */

  return <div className='relative'>User profile page!</div>
}

export default UserProfilePage
