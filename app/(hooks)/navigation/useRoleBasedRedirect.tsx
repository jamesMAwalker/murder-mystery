import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useQuery } from 'convex/react'

import { api } from '@/convex/_generated/api'

export function useRoleBasedRedirect({
  allowed_role,
  redirect_url = '/'
}: {
  allowed_role: string
  redirect_url?: string
}) {
  const user = useQuery(api.users.getFromSession)
  console.log('user: ', user)

  useEffect(() => {
    if (user && user?.role !== allowed_role) {
      redirect(redirect_url)
    }
  }, [user, allowed_role, redirect_url])
  
}
