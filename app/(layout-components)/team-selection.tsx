import { useUserContext } from "../(context)/user.context";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react-internal";
import React from "react";

interface TeamSelectionProps {
  showJoinModal: () => void;
  showCreateModal: () => void;
  showAddModal: () => void;
  showLeaveModal: () => void;
}

export const TeamSelection: React.FC<TeamSelectionProps> = ({
  showJoinModal,
  showCreateModal,
  showAddModal,
  showLeaveModal,
}) => {
  const user = useQuery(api.users.getFromSession);
  const hasTeam = user?.has_team;
  const userTeam = useQuery(api.teams.getAll)?.find(
    (team) => team._id === user?.team_id
  );

  if (hasTeam === null || hasTeam === undefined) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-white text-lg font-semibold">Loading...</h2>
      </div>
    );
  }

  if (hasTeam) {
    const teamIsFull = userTeam?.members?.length === 10;

    return (
      <div className="flex flex-col gap-4 w-full pl-4 pr-4 pb-4 bg-slate-800 rounded-lg">
        {/* <h2 className="text-white text-lg font-semibold">Team: {team}</h2> */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="btn btn-primary w-full sm:w-auto"
            disabled={teamIsFull}
            onClick={() => showAddModal()}
          >
            {teamIsFull ? "Team is Full" : "Invite Player"}
          </button>
          <button
            className="btn btn-accent w-full sm:w-auto"
            onClick={() => showLeaveModal()}
          >
            Leave Team
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col flex-col-td gap-4 pl-4 pr-4 pb-4 bg-slate-800 rounded-lg">
        <h2 className="text-white text-lg font-semibold">
          You are not on a team. Join or create one to get started!
        </h2>
        <div className="flex flex-col gap-4 w-full bg-slate-800 rounded-lg">
          <button
            className="btn btn-primary cursor-pointer w-full sm:w-auto"
            onClick={() => showJoinModal()}
          >
            Join Team
          </button>
          <button
            className="btn btn-accent cursor-pointer w-full sm:w-auto"
            onClick={() => showCreateModal()}
          >
            Create Team
          </button>
        </div>
      </div>
    );
  }
};
