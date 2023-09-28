import React, { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react-internal";
import { TeamDetailsModal } from "./team-details-modal";

export const TeamInfo: React.FC = () => {
  const team = useQuery(api.teams.getFromSession);
  const allUsers = useQuery(api.users.getAll);
  const captain = allUsers?.find((user) => user._id === team?.team_captain);
  const teammates = allUsers?.filter((user) =>
    team?.members?.includes(user._id)
  );
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const displayTeamDetails = () => setShowTeamDetails(true);
  const closeDetailModal = () => setShowTeamDetails(false);

  return (
    <div className="flex flex-col gap-4 w-full pl-4 pr-4 bg-slate-800 rounded-lg">
      <h2 className="text-white text-xl font-bold ">
        Team: <span className="font-semibold">{team?.team_name}</span>
      </h2>
      <h2 className="text-white text-lg font-semibold">
        Membership:{" "}
        <span className="font-semibold">{teammates?.length}/10</span>
      </h2>

      <button
        className="btn btn-primary w-full sm:w-auto"
        onClick={() => displayTeamDetails()}
      >
        See Team Details
      </button>

      {showTeamDetails && <TeamDetailsModal closeModal={closeDetailModal} />}
    </div>
  );
};
