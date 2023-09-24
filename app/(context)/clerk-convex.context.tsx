'use client';

import { ClerkProvider, useAuth } from '@clerk/clerk-react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ConvexReactClient } from 'convex/react'
import { dark } from '@clerk/themes'

const clerk_key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!
const convex_url = process.env.NEXT_PUBLIC_CONVEX_URL!


const convex = new ConvexReactClient(convex_url)

export const ClerkConvexProvider = ({ children }: { children: React.ReactNode }) => {

  return (
    <ClerkProvider
      appearance={{ baseTheme: dark }}
      publishableKey={clerk_key}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}