'use client'

import {
  createContext,
  ReactNode,
  useContext,
} from 'react'

import { useGetUserFromDB } from '../(hooks)/convex/useGetUserFromDB'


const defaults = {
  user: null,
}

const UserContext = createContext<{
  user: IConvexUser | null
  team?: IConvexTeam
} | null>(defaults)

export const useUserContext = () => useContext(UserContext)!



export const UserProvider = ({ children }: { children: ReactNode }) => {
  const user = useGetUserFromDB()

  return (
    <UserContext.Provider value={{ user: user || null }}>{children}</UserContext.Provider>
  )
}