'use client'

import React, { useEffect } from 'react'
import { api } from '@/convex/_generated/api'
import { useConvexAuth, useMutation, useQuery } from 'convex/react-internal'
import { useAuth } from '@clerk/nextjs'
import { WithoutSystemFields } from 'convex/server'
import { Doc } from '@/convex/_generated/dataModel'

/*
  * NOTES *

  + useQuery | useMutation +
  # These functions allow us to use any of the functions built into the convex backend without API routes or even HTTP requests. Use these to handle all database operations.

  + No HTTP Means No Suspense +
  # Because suspense works by detecting the state of any http requests, using useQuery and useMutation avoids suspense entirely. This means loading states need to be handled manually.
*/

const ProfileConvex = () => {
  // for detecting valid clerk user
  const convexAuthState = useConvexAuth()

  // for using user data from clerk
  const clerkAuthState = useAuth()

  return (
    <div className='my-8 flex-col-tl gap-6'>
      <UserInfoSection />
      <TeamSelectionSection />
      <RequestInfoSection />
    </div>
  )
}

export default ProfileConvex

function UserInfoSection() {
  // get current user object from db
  const user = useQuery(api.users.getFromSession)

  return (
    <div className='USER_INFO flex-=col-tl'>
      <h1 className='text-2xl font-bold'>
        Welcome, <span className='text-accent'>{user?.name}</span>
      </h1>
    </div>
  )
}

function TeamSelectionSection() {
  // get all teams from db
  const teams = useQuery(api.teams.getAll)

  return (
    <ul className='flex-col-tl gap-4'>
      <h4 className='font-bold'>Available Teams</h4>
      {teams?.map((team: any) => {
        return <li key={team._id}>- {team.team_name}</li>
      })}
    </ul>
  )
}

function RequestInfoSection() {
  // get any requests user has made.
  const requests = useQuery(api.requests.getFromSessionByUser)

  return (
    <ul className='flex-col-tl gap-4'>
      <h1>Current Requests</h1>
      {requests?.map((request: any) => {
        return <li key={request._id}>{request._id}</li>
      })}
    </ul>
  )
}
