'use client'

import { createContext, ReactNode, useContext } from 'react'
import { useGetAllTeamsFromDB } from '../(hooks)/convex/useGetAllTeamsFromDB'
import { useGetAllUsersFromDB } from '../(hooks)/convex/useGetAllUsersFromDB'


const defaults = {
  users: null,
  teams: null,
}

const GameContext = createContext<{
  users: IConvexUser[] | null
  teams: IConvexTeam[] | null
} | null>(defaults)

export const useGameContext = () => useContext(GameContext)!

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const teams: IConvexTeam[] = useGetAllTeamsFromDB();
  const users: IConvexUser[] = useGetAllUsersFromDB();
  
  return (
    <GameContext.Provider value={{ teams, users }}>
      {children}
    </GameContext.Provider>
  )
}
