'use client';

import React, { useEffect } from 'react'
import { api } from '@/convex/_generated/api'
import { useConvexAuth, useMutation, useQuery } from 'convex/react-internal'
import { useAuth } from '@clerk/nextjs';
import { WithoutSystemFields } from 'convex/server'


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

  const teams = useQuery(api.teams.getAll)

  const requests = useQuery(api.requests.getByUserId)

  return (
    <div className='flex-col-tl gap-6'>
      <h1>Current Teams</h1>
      <ul className="flex-col-tl gap-4">
        {teams?.map(team => {
          return <li key={team._id}>{team.team_name}</li>
        })}
      </ul>
      <hr />
      <h1>Current Requests</h1>
      <ul className="flex-col-tl gap-4">
        {requests?.map(request => {
          return <li key={request._id}>{request._id}</li>
        })}
      </ul>
    </div>
  )
}

export default ProfileConvex