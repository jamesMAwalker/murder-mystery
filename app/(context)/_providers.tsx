import { AccountProvider } from './account.context'
import { ClerkConvexProvider } from './clerk-convex.context'
import { GameProvider } from './game.context'
// import { UserProvider } from './user.context'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
      <ClerkConvexProvider>
        <GameProvider>{children}</GameProvider>
      </ClerkConvexProvider>
  )
}

{/* <UserProvider></UserProvider> */}
{/* <AccountProvider></AccountProvider> */}