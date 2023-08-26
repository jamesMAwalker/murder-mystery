'use client'

import { useEffect } from 'react'
import { UserButton } from '@clerk/nextjs/app-beta'
import { useUser } from '@clerk/clerk-react'
import Link from 'next/link'
import axios from 'axios'

async function createUser(user: any) {
  return await axios.post('/api/createUser', user)
}

export const Navbar = () => {
  const { isSignedIn, user } = useUser()

  useEffect(() => {
    // TODO: Extract to hook & use in signup/signin pages.

    if (isSignedIn && user.id) {
      const newConvexUser: IConvexUser = {
        user_id: user.id,
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        has_team: false,
        team_name: null,
        team_id: null
      }
      createUser(newConvexUser)
      console.log('newConvexUser: ', newConvexUser);
    }
  }, [isSignedIn, user])

  return (
    <div className='nav-wrapper z-10 fixed top-0 p-4 flex w-full items-center'>
      <nav className='navbar p-2 w-full rounded-md bg-slate-800 text-white'>
        <span className='navbar-start'>
          <Link href='/' className='btn btn-ghost normal-case text-xl'>
            LOGO
          </Link>
        </span>
        {isSignedIn ? (
          <div className='flex gap-4 navbar-end'>
            <Link
              href='/user-profile'
              className='hover:bg-primary cursor-pointer badge p-4 uppercase text-white'
            >
              Profile
            </Link>
            <UserButton afterSignOutUrl='/' />
          </div>
        ) : (
          <div className='navbar-end flex gap-2'>
            <Link
              href='/sign-up'
              className='hover:bg-primary cursor-pointer badge p-4 uppercase text-white'
            >
              Signup
            </Link>
            <Link
              href='/sign-in'
              className='hover:bg-primary cursor-pointer badge p-4 uppercase text-white'
            >
              Login
            </Link>
          </div>
        )}
      </nav>
    </div>
  )
}
