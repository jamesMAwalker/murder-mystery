'use client';

import { useEffect, useReducer, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

const getUserDataFromDB = async (user_id: string) => {
  return await axios.post('/api/user/get', { user_id })
}

export const useGetUserFromDB = () => {
  const [user, setUser] = useState<IConvexUser>(Object)
  const { user: clerkUser } = useUser()

  useEffect(() => {
    {
      ;(async () => {
        if (clerkUser?.id) {
          try {
            const res = await getUserDataFromDB(clerkUser.id)

            // console.log('++++res++++: ', res);
            
            const foundConvexUser = res.data.user

            if (!foundConvexUser) throw Error('Could not find user!')

            setUser(foundConvexUser)
          } catch (error) {
            console.error('error: ', error);
          }
        }
      })()
    }
  }, [clerkUser])

  return user;
}