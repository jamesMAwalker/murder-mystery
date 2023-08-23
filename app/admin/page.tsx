'use client';

import { useQuery } from 'convex/react'

import { api } from '@/convex/_generated/api'

const AdminDashboard = () => {
  const users = useQuery(api.users.get)
  console.log('users: ', users);
  
  return (
    <div>
      Welcome, Admin!
    </div>
  )
}

export default AdminDashboard