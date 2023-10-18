"use client";

import React, { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react-internal";
import { ModalWrapper } from "./modal-wrapper";
import { ViewTeamMembersModal } from "./view-team-micro-modal";

interface JoinTeamModalProps {
  closeModal: () => void;
}

interface Team {
  _id: string;
  team_name: string;
  members: string[];
}

interface Request {
  requested_team_id: string;
}

export const JoinTeamModal: React.FC<JoinTeamModalProps> = ({ closeModal }) => {
  const user = useQuery(api.users.getFromSession);
  const teams = useQuery(api.teams.getAll);
  const requests = useQuery(api.requests.getFromSessionByUser);
  const requestedTeamIds =
    requests?.map((request: Request) => request.requested_team_id) || [];

  const createRequest = useMutation<any>(api.requests.createFromSession); // Add <any> or the expected mutation return type if needed

  const hasBeenRequested = (teamId: string) =>
    requestedTeamIds.includes(teamId);

  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Function to handle "View Team" button click
  const handleViewTeam = (team: Team) => {
    setSelectedTeam(team);
  };

  const closeViewTeamModal = () => {
    setSelectedTeam(null);
  };

  const renderTeam = (team: Team) => (
    <li
      key={team._id}
      className="RENDER_TEAM flex-col-tl p-4 gap-4 w-full rounded-md bg-slate-700/30 p4"
    >
      <div className="font-semibold text-lg flex gap-2 max-w-[100%]">
        <span className="whitespace-nowrap">Team Name:</span>{" "}
        <span className="text-accent truncate w-full">
          <span className="truncate w-full">{team.team_name}</span>
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full">
        {hasBeenRequested(team._id) ? (
          <button className="btn" disabled>
            Requested
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => createRequest({ team_id: team._id })}
          >
            Request
          </button>
        )}
        <button className="btn btn-info" onClick={() => handleViewTeam(team)}>
          View Team
        </button>
      </div>
    </li>
  );

  if (user?.has_team) {
    return null;
  }

  return (
    <ModalWrapper>
      <button
        className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2 p-2 text-2xl"
        onClick={closeModal}
      >
        &times;
      </button>
      <h3 className="font-bold text-2xl pb-4 border-b border-slate-600 mb-4">
        Available Teams
      </h3>
      {teams && user && requests ? (
        <ul className="TEAMS_WRAP flex-col-tl gap-4 max-h-[50vh] overflow-y-auto">
          {teams?.map(renderTeam)}
        </ul>
      ) : (
        <div className="flex items-left justify-left w-full">
          <div>Loading...</div>{" "}
        </div>
      )}

      {selectedTeam && (
        <ViewTeamMembersModal team={selectedTeam} close={closeViewTeamModal} />
      )}
    </ModalWrapper>
  );
};
