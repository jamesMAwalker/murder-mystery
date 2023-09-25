"use client";

import { useEffect } from "react";
import { UserButton } from "@clerk/nextjs/app-beta";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";

import { useCreateUserInDB } from "../(hooks)/convex/users/useCreateUserInDB";

const notifications = ["test 1", "test 2", "test 3"];

// TODO: Move user creation to signin/singup pages.

export const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const { createUser } = useCreateUserInDB();

  useEffect(() => {
    if (isSignedIn && user.id) {
      const newConvexUser = {
        user_id: user.id!,
        name: user.fullName!,
        email: user.primaryEmailAddress?.emailAddress!,
        has_team: false,
        team_name: null,
        team_id: null,
      };
      createUser(newConvexUser);
    }
  }, [isSignedIn, user]);

  return (
    <div className="nav-wrapper z-10 fixed top-0 left-0 w-full">
      <nav className="navbar p-2 w-full bg-slate-800 text-white">
        <div className="container mx-auto flex justify-between items-center">
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
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 mt-0.5 mr-0.5 transform translate-x-1/4 -translate-y-1/4 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center shadow-lg">
                    {notifications.length}
                  </span>
                )}
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex gap-2 navbar-end">
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
        </div>
      </nav>
    </div>
  );
};
