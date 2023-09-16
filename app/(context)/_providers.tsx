import { AccountProvider } from './account.context'
import { ConvexProvider } from './convex.context'
import { GameProvider } from './game.context'
import { UserProvider } from './user.context'


export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AccountProvider>
      <ConvexProvider>
        <UserProvider>
          <GameProvider>
            {children}
          </GameProvider>
        </UserProvider>
      </ConvexProvider>
    </AccountProvider>
  )
}
