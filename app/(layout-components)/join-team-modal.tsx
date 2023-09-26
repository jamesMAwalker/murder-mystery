import React from "react";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react-internal";

interface JoinTeamModalProps {
  closeModal: () => void;
}

export const JoinTeamModal: React.FC<JoinTeamModalProps> = ({ closeModal }) => {
  const user = useQuery(api.users.getFromSession);
  const teams = useQuery(api.teams.getAll);
  const requests = useQuery(api.requests.getFromSessionByUser);
  const userId = user?._id;
  const createRequest = useMutation(api.requests.createFromSession);

  const renderJoinTeams = () => {
    const requestedTeamIds = requests?.map(
      (request: any) => request.requested_team_id
    );

    return (
      <ul className="flex-col gap-4 w-full overflow-y-auto">
        {teams?.map((team: any) => {
          if (requestedTeamIds?.includes(team._id)) {
            return (
              <li
                key={team._id}
                className="flex items-center justify-between p-4 bg-slate-800 gap-2 w-full rounded-md"
              >
                <span className="font-semibold text-lg">{team.team_name}</span>
                <button className="btn btn-secondary btn-md" disabled>
                  Requested
                </button>
              </li>
            );
          } else {
            return (
              <li
                key={team._id}
                className="flex items-center justify-between p-4 bg-slate-800 gap-2 w-full rounded-md"
              >
                <span className="font-semibold text-lg">{team.team_name}</span>
                <button
                  className="btn btn-primary btn-md"
                  onClick={() => createRequest({ team_id: team._id })}
                >
                  Request to Join
                </button>
              </li>
            );
          }
        })}
      </ul>
    );
  };

  if (!teams || !userId) {
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

        {teams.length > 0 && renderJoinTeams()}
      </div>
    </div>
  );
};
