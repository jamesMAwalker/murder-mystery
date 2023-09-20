"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@clerk/nextjs";
import { useUserContext } from "../(context)/user.context";
import { useGameContext } from "../(context)/game.context";

import { TeamButtons } from "../(layout-components)/team-buttons";
import { JoinTeamModal } from "../(layout-components)/join-team-modal";
import { CreateTeamModal } from "../(layout-components)/create-team-modal";
import { useGetUserFromDB } from "../(hooks)/convex/users/useGetUserFromDB";

const UserProfilePage = () => {
  // user data from convex db
  const { user } = useUserContext();

  // users and teams data from convex db
  const { users, teams } = useGameContext();

  // session data from clerk
  const { isLoaded, isSignedIn } = useSession();

  // modal function to satisfy typescript
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [loggedUser, setLoggedUser] = useState<IConvexUser | null>(null);
  console.log("loggedUser: ", loggedUser);

  const fetchedUser = useGetUserFromDB();

  const [hasTeam, setHasTeam] = useState<boolean | null>(
    loggedUser?.has_team || null
  );

  function showModal(id: string) {
    setActiveModal(id);
  }

  function hideModal() {
    setActiveModal(null);
  }

  useEffect(() => {
    if (fetchedUser) {
      console.log("fetchedUser: ", fetchedUser);
      setLoggedUser(fetchedUser);
      setHasTeam(fetchedUser.has_team);
    }
  }, [fetchedUser]);

  // check that clerk session is loaded and user is signed in
  if (!isLoaded || !isSignedIn || !loggedUser) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  /*
    * User Profile UI Elements
    # User Info: Should show user's: name, email, team name (if on team).
    # Action Buttons:
    - If not on team: Should show buttons: Join Team, Create Team
      > Each of these opens a dropdown with a list of joinable teams (not full).
    - If on team: Should show buttons: Add Member, Leave Team
      > Add member shows a dropdown with a list of unattached participants.

    # If you think of anything else, feel free to add!
  */

  return (
    <div className="relative bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md">
      {loggedUser && (
        <div className="flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-2 w-full">
            <p className="text-white text-xl sm:text-2xl font-semibold">
              {loggedUser.name}
            </p>
            <p className="text-white text-base sm:text-lg">
              {loggedUser.email}
            </p>
            <TeamButtons
              hasTeam={loggedUser.has_team}
              showModal={showModal}
              team={loggedUser.team_name}
            />
          </div>

          {teams && Array.isArray(teams) && (
            <JoinTeamModal
              teams={teams}
              activeModal={activeModal}
              hideModal={hideModal}
            />
          )}
          <CreateTeamModal
            activeModal={activeModal}
            hideModal={hideModal}
            setLoggedUser={setLoggedUser}
          />
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
