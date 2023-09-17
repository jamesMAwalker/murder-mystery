'use client'

import {
  createContext,
  ReactNode,
  useContext,
} from 'react'

import { useGetUserFromDB } from '../(hooks)/convex/users/useGetUserFromDB'
import { useGetTeamFromDB } from '../(hooks)/convex/teams/useGetTeamFromDB'
import { useGetRequestsByID } from '../(hooks)/convex/requests/useGetRequestsByID'

const defaults = {
  user: null
}

const UserContext = createContext<{
  user: IConvexUser | null
  team?: IConvexTeam
  requests?: IConvexRequest
} | null>(defaults)

export const useUserContext = () => useContext(UserContext)!

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const user = useGetUserFromDB() || null
  const team = useGetTeamFromDB(user?.team_id) || null
  const requests = useGetRequestsByID(user?._id) || null

  return (
    <UserContext.Provider value={{ user, team, requests }}>{children}</UserContext.Provider>
  )
}