'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

import { useGetUserFromDB } from '../(hooks)/convex/users/useGetUserFromDB'
import { useGetTeamFromDB } from '../(hooks)/convex/teams/useGetTeamFromDB'
import { useGetRequestsByUserID } from '../(hooks)/convex/requests/useGetRequestsByUserID'
import { useGetInvitationsByUserID } from '../(hooks)/convex/invitations/useGetInvitationsByUserID'

const defaults = {
  isLoaded: false,
  user: null
}

const UserContext = createContext<{
  isLoaded: boolean
  user: IConvexUser | null
  team?: IConvexTeam
  requests?: IConvexRequest[] | null
  invitations?: IConvexInvitation | null
} | null>(defaults)

export const useUserContext = () => useContext(UserContext)!

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const user = useGetUserFromDB() || null
  const team = useGetTeamFromDB(user?.team_id) || null

  const requests = useGetRequestsByUserID(user?._id) || null
  const invitations = useGetInvitationsByUserID(user?._id) || null

  // const isLoaded = user !== null && user !== undefined
  const isLoaded = user._id !== undefined

  return (
    <UserContext.Provider value={{ isLoaded, user, team, requests, invitations }}>
      {children}
    </UserContext.Provider>
  )
}
