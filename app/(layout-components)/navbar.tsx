"use client";

import { useEffect } from "react";
import { UserButton } from "@clerk/nextjs/app-beta";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// TODO: Handle user creation in Convex Webhook

export const Navbar = () => {
  const { isSignedIn, user } = useUser();
  // const loggedUser = useQuery(api.users.getFromSession);

  const createUser = useMutation(api.users.create);

  const userIsSuspectCheck = useQuery(api.suspects.getFromUserSession);
  // const invites = useQuery(api.invitations.getFromSessionByUser);
  // const requests = useQuery(api.requests.getFromSessionByTeam);

  // const totalNotifications =
  //   (Array.isArray(invites) ? invites.length : 0) +
  //   (Array.isArray(requests) ? requests.length : 0);

  // const totalInvites = Array.isArray(invites) ? invites.length : 0;
  // const totalRequests =
  //   Array.isArray(requests) && loggedUser?.is_captain ? requests.length : 0;

  // const totalNotifications = totalInvites + totalRequests;

  useEffect(() => {
    if (isSignedIn && user.id) {
      const newConvexUser = {
        user_id: user.id!,
        name: user.fullName!,
        email: user.primaryEmailAddress?.emailAddress!,
        has_team: false,
        is_captain: false,
        team_name: null,
        team_id: null,
        role: "suspect",
      };

      createUser(newConvexUser);
    }
  }, [isSignedIn, user]);

  return (
    <div className='nav-wrapper z-20 fixed top-0 p-4 lg:p-0 flex w-full items-center'>
      <nav className='navbar p-2 w-full rounded-md lg:rounded-none bg-slate-800 lg:bg-slate-800/30 lg:backdrop-blur text-white'>
        <span className='navbar-start'>
          <Link href='/' className='btn btn-ghost normal-case text-xl flex'>
            <span>M</span>
            <span className='text-red-500 ml-[-10px]'>M</span>
          </Link>
        </span>
        <h1 className='hidden lg:flex text-2xl font-bold w-full flex-center'>
          <span className='text-red-500'>Murder</span>
          <span className='text-slate-100'>Mystery</span>
        </h1>
        {isSignedIn ? (
          <div className='flex gap-4 navbar-end items-center'>
            <Link
              href={userIsSuspectCheck ? '/suspect-dashboard' : '/user-profile'}
              className='hover:bg-primary cursor-pointer badge p-4 uppercase text-white relative'
            >
              Profile
              {/* omit notificatio badge for time being per Dan's insistance that admin handle all team assignment
             {totalNotifications > 0 && (
                <span className="absolute top-0 right-0 mt-0.5 mr-0.5 transform translate-x-1/4 -translate-y-1/4 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center shadow-lg">
                  {totalNotifications}
                </span>
              )} */}
            </Link>

            <UserButton afterSignOutUrl='/' />
          </div>
        ) : (
          <div className='navbar-end flex gap-2'>
            <Link
              href='/sign-up'
              className='hover:bg-primary cursor-pointer badge p-4 uppercase text-white'
            >
              Signup
            </Link>
            <Link
              href='/sign-in'
              className='hover:bg-primary cursor-pointer badge p-4 uppercase text-white'
            >
              Login
            </Link>
          </div>
        )}
      </nav>
    </div>
  )
};
