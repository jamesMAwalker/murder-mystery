import React from "react";
// import { useCreateRequestInDB } from "../(hooks)/convex/requests/useCreateRequest";
// import { useUserContext } from "../(context)/user.context";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react-internal";
import { useGetRequestsByUserID } from "../(hooks)/convex/requests/useGetRequestsByUserID";

interface JoinTeamModalProps {
  closeModal: () => void;
}

export const JoinTeamModal: React.FC<JoinTeamModalProps> = ({ closeModal }) => {
  const user = useQuery(api.users.getFromSession);
  const teams = useQuery(api.teams.getAll);
  const userId = user?._id;
  const createTeamRequest = () => {
    console.log("createTeamRequest");
    const request = api.users.createRequest(userId);
  };

  // Uncomment when needed
  // const { createRequest, request, error } = useCreateRequestInDB();
  // const requests = useGetRequestsByUserID(userId);
  // const handleTeamRequest = (team_id: string, user_id: string) => {
  //   createRequest(team_id, user_id);
  //   closeModal();
  // };

  if (!teams || !userId) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-top h-screen bg-black fixed w-screen inset-0 p-4 z-10">
      <div className="modal-box bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2 p-2"
          onClick={closeModal}
        >
          &times;
        </button>
        <h3 className="font-bold text-xl mb-4">Available Teams</h3>

        {teams.length > 0 && (
          <ul className="flex-col gap-4 w-full overflow-y-auto">
            {teams.map((team: any) => (
              <li
                key={team._id}
                className="flex items-center justify-between p-4 bg-slate-800 gap-2 w-full rounded-md"
              >
                <span className="font-semibold text-lg">{team.team_name}</span>
                <button
                  className="btn btn-primary btn-md"
                  // Uncomment when function is ready
                  // onClick={() => handleTeamRequest(team._id, userId)}
                >
                  Join
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
