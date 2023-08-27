import { AccountProvider } from './account.context'
import { ConvexProvider } from './convex.context'
import { UserProvider } from './user.context'


export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AccountProvider>
      <ConvexProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </ConvexProvider>
    </AccountProvider>
  )
}
