import React from "react";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react-internal";

interface JoinTeamModalProps {
  closeModal: () => void;
}

interface Team {
  _id: string;
  team_name: string;
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

  const renderTeam = (team: Team) => (
    <li
      key={team._id}
      className="flex items-center justify-between p-4 bg-slate-800 gap-2 w-full rounded-md"
    >
      <span className="font-semibold text-lg">{team.team_name}</span>
      {hasBeenRequested(team._id) ? (
        <button className="btn btn-secondary btn-md" disabled>
          Requested
        </button>
      ) : (
        <button
          className="btn btn-primary btn-md"
          onClick={() => createRequest({ team_id: team._id })}
        >
          Request to Join
        </button>
      )}
    </li>
  );

  if (user?.has_team) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-start h-full bg-black !fixed w-screen h-screen z-10 inset-0 p-4">
      <div className="modal-box bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md mt-20">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2 p-2"
          onClick={closeModal}
        >
          &times;
        </button>
        <h3 className="font-bold text-xl mb-4">Available Teams</h3>
        {teams && user && requests ? (
          <ul className="flex-col gap-4 w-full overflow-y-auto">
            {teams?.map(renderTeam)}
          </ul>
        ) : (
          <div className="flex items-left justify-left w-full">
            <div>Loading...</div>{" "}
          </div>
        )}
      </div>
    </div>
  );
};
