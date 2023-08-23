'use client';

import { useUser } from '@clerk/clerk-react'

const UserProfilePage = () => {
  const { user } = useUser()
  console.log('user: ', user);

  return <div className='relative'></div>
}

export default UserProfilePage
