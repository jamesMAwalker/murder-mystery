import React from "react";
import { useCreateRequestInDB } from "../(hooks)/convex/requests/useCreateRequest";
import { useUserContext } from "../(context)/user.context";
import { useGetRequestsByUserID } from "../(hooks)/convex/requests/useGetRequestsByUserID";

interface JoinTeamModalProps {
  teams: any | undefined; // Ideally, define a Team type
  activeModal: string | null;
  hideModal: () => void;
}

export const JoinTeamModal: React.FC<JoinTeamModalProps> = ({
  teams,
  activeModal,
  hideModal,
}) => {
  const { user: convexUser } = useUserContext();

  const userId = convexUser?._id || undefined;

  const requests = useGetRequestsByUserID(userId);

  const { createRequest, request, error } = useCreateRequestInDB();

  const filteredTeamsByExistingRequest = teams?.filter((team: any) => {
    if (Array.isArray(requests)) {
      const hasNoExistingRequest = requests?.some(
        (request) => request.requested_team_id !== team._id
      );
      return hasNoExistingRequest;
    }
  });

  const filteredFullTeams = filteredTeamsByExistingRequest?.filter(
    (team: any) => team.members.length <= 10
  );

  if (activeModal !== "join-team-modal" || !teams || !userId) {
    return null;
  }

  const handleTeamRequest = (team_id: string, user_id: string) => {
    createRequest(team_id, user_id);
    hideModal();
  };

  return (
    <div className="flex-col-tl bg-black gap-4 !fixed w-screen h-screen z-10 inset-0 p-4">
      <button
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={hideModal}
      >
        &times;
      </button>
      <h3 className="font-bold text-lg">Available Teams</h3>
      {teams && teams.length > 0 && (
        <ul className=" flex-col-tl gap-4 w-full overflow-scroll">
          {filteredFullTeams.map((team: any) => (
            <li
              key={team.team_name}
              className="flex items-center justify-between p-4 bg-slate-800 gap-2 w-full rounded-md"
            >
              <span className="font-semibold">{team.team_name}</span>
              <button
                className="btn btn-primary"
                onClick={() => handleTeamRequest(team._id, userId)}
              >
                Join
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
