"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@clerk/nextjs";
import { useUserContext } from "../(context)/user.context";
import { useGameContext } from "../(context)/game.context";

import { TeamButtons } from "../(layout-components)/team-buttons";
import { JoinTeamModal } from "../(layout-components)/join-team-modal";
import { CreateTeamModal } from "../(layout-components)/create-team-modal";

const UserProfilePage = () => {
  // user data from convex db
  const { user: convexUser } = useUserContext();
  console.log("convexUser: ", convexUser);

  // users and teams data from convex db
  const { users, teams } = useGameContext();

  // session data from clerk
  const { isLoaded, isSignedIn } = useSession();

  // modal function to satisfy typescript
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [hasTeam, setHasTeam] = useState<boolean | null>(
    convexUser?.has_team || null
  );
  function showModal(id: string) {
    setActiveModal(id);
  }

  function hideModal() {
    setActiveModal(null);
  }

  // check that clerk session is loaded and user is signed in
  if (!isLoaded || !isSignedIn) {
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
      {convexUser && (
        <div className="flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-2 w-full">
            <p className="text-white text-xl sm:text-2xl font-semibold">
              {convexUser.name}
            </p>
            <p className="text-white text-base sm:text-lg">
              {convexUser.email}
            </p>
          </div>

          <TeamButtons
            hasTeam={hasTeam}
            showModal={showModal}
            team={convexUser.team_name}
          />

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
            setHasTeam={setHasTeam}
          />
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
