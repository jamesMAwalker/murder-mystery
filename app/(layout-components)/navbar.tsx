"use client";

import { useEffect } from "react";
import { UserButton } from "@clerk/nextjs/app-beta";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import Link from "next/link";
import { useCreateUserInDB } from "../(hooks)/convex/users/useCreateUserInDB";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// TODO: Handle user creation in Convex Webhook

export const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const loggedUser = useQuery(api.users.getFromSession);

  const createUser = useMutation(api.users.create);

  const invites = useQuery(api.invitations.getFromSessionByUser);
  const requests = useQuery(api.requests.getFromSessionByTeam);
  const isArray = (input: any): input is Array<any> => {
    return !!input && typeof input === "object" && input.constructor === Array;
  };

  const totalNotifications =
    (isArray(invites) ? invites.length : 0) +
    (isArray(requests) ? requests.length : 0);

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
      };

      createUser(newConvexUser);
    }
  }, [isSignedIn, user]);

  return (
    <div className="nav-wrapper z-20 fixed top-0 p-4 flex w-full items-center">
      <nav className="navbar p-2 w-full rounded-md bg-slate-800 text-white">
        <span className="navbar-start">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            LOGO
          </Link>
        </span>
        {isSignedIn ? (
          <div className="flex gap-4 navbar-end items-center">
            <Link
              href="/user-profile"
              className="hover:bg-primary cursor-pointer badge p-4 uppercase text-white relative"
            >
              Profile
              {totalNotifications > 0 && (
                <span className="absolute top-0 right-0 mt-0.5 mr-0.5 transform translate-x-1/4 -translate-y-1/4 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center shadow-lg">
                  {totalNotifications}
                </span>
              )}
            </Link>

            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <div className="navbar-end flex gap-2">
            <Link
              href="/sign-up"
              className="hover:bg-primary cursor-pointer badge p-4 uppercase text-white"
            >
              Signup
            </Link>
            <Link
              href="/sign-in"
              className="hover:bg-primary cursor-pointer badge p-4 uppercase text-white"
            >
              Login
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};
