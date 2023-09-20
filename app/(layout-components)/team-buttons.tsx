import React, { useEffect } from "react";
import { useUserContext } from "../(context)/user.context";

interface TeamButtonsProps {
  hasTeam: boolean | null | undefined; // changed to include null for initial state
  setHasTeam: React.Dispatch<React.SetStateAction<boolean | null>>;
  showModal: (id: string) => void;
  team: any; // Ideally, define a Team type
}

export const TeamButtons: React.FC<TeamButtonsProps> = ({
  hasTeam,
  setHasTeam,
  showModal,
  team,
}) => {
  const { user: convexUser } = useUserContext();

  useEffect(() => {
    // check for convexUser and set hasTeam state to ensure that the button render reflects changes to the convexUser

    if (convexUser) {
      setHasTeam(convexUser.has_team);
    }
  }, [convexUser]);

  if (hasTeam === null || hasTeam === undefined) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-white text-lg font-semibold">Loading...</h2>
      </div>
    );
  }

  if (hasTeam) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-white text-lg font-semibold">Team: {team}</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="btn btn-primary w-full sm:w-auto">
            Add Member
          </button>
          <button className="btn btn-accent w-full sm:w-auto">
            Leave Team
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-white text-lg font-semibold">No team yet...</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="btn btn-primary cursor-pointer w-full sm:w-auto"
            onClick={() => showModal("join-team-modal")}
          >
            Join Team
          </button>
          <button
            className="btn btn-accent w-full sm:w-auto"
            onClick={() => showModal("create-team-modal")}
          >
            Create Team
          </button>
        </div>
      </div>
    );
  }
};
