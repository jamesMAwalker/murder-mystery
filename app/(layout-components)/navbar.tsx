'use client'

import { use, useEffect } from 'react'
import { UserButton } from '@clerk/nextjs/app-beta'
import { useUser } from '@clerk/clerk-react'
import Link from 'next/link'
import axios from 'axios'

import { api } from '../../convex/_generated/api'
import { useMutation } from 'convex/react-internal'

async function createUser(user: any) {
  console.log('user: ', user);
  // const res = await fetch('/api/createUser', {
  //   method: 'POST',
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(user),
  // })
  const newUser = await axios.post('/api/createUser', user)

  console.log('newUser: ', newUser)

  return newUser
}

export const Navbar = () => {
  const { isSignedIn, user } = useUser()

  useEffect(() => {
    // TODO: Extract to hook & use in signup/signin pages.
    console.log('user: ', user);  

    if (isSignedIn && user.id) {
      const newConvexUser = {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
        team: 'No team yet...',
        user_id: user.id,
      }
      createUser(newConvexUser)
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
              href='/profile'
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
