'use client'

import { createContext, ReactNode, useContext } from 'react'
import { useGetAllTeamsFromDB } from '../(hooks)/convex/useGetAllTeamsFromDB'


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

  const users: any = [];
  
  return (
    <GameContext.Provider value={{ teams, users }}>
      {children}
    </GameContext.Provider>
  )
}
