'use client';

import { ConvexProvider as ConvexProviderOriginal, ConvexReactClient } from 'convex/react'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export const ConvexProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConvexProviderOriginal client={convex}>{children}</ConvexProviderOriginal>
  )
}