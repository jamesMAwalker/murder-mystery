import React, { useEffect } from "react";

interface TeamButtonsProps {
  hasTeam: boolean | null | undefined; // changed to include null for initial state
  showModal: (id: string) => void;
  team: any; // Ideally, define a Team type
}

export const TeamButtons: React.FC<TeamButtonsProps> = ({
  hasTeam,
  showModal,
  team,
}) => {
  if (hasTeam === null || hasTeam === undefined) {
    return <div>Loading...</div>; // Show loading state
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
