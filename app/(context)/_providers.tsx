import { AccountProvider } from './account.context'
import { UserProvider } from './user.context'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AccountProvider>
      <UserProvider>{children}</UserProvider>
    </AccountProvider>
  )
}
