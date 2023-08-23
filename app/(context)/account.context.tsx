import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs/app-beta'
import { dark } from '@clerk/themes'

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>{children}</ClerkProvider>
  )
}
