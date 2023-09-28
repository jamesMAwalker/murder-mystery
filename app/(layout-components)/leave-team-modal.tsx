import React from "react";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react-internal";

interface LeaveTeamModalProps {
  closeModal: () => void;
}

export const LeaveTeamModal: React.FC<LeaveTeamModalProps> = ({
  closeModal,
}) => {
  // Fetch the current user
  const user = useQuery(api.users.getFromSession);
  const userId = user?._id;
  // Fetch the current team if the user is on a team
  const team = useQuery(api.teams.getFromSession);
  const teamId = team?._id;

  // what if user is not on a team? the useQuery will trigger error and the modal will not render

  const leaveTeam = useMutation(api.teams.removeMember);
  console.log("team: ", team);
  console.log("user: ", user);

  const renderLeaveTeam = () => {
    return (
      <div className="flex flex-col items-center justify-start h-full bg-black !fixed w-screen h-screen z-10 inset-0 p-4">
        {teamId && userId && (
          <div className="modal-box bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md mt-20 relative">
            {" "}
            {/* Added relative for the close button's absolute positioning */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              &times;
            </button>
            <h3 className="font-bold text-xl mb-4 w-[90%]">
              Are you sure that you want to leave your team?
            </h3>
            <div className="modal-action">
              <button
                className="btn btn-primary w-full"
                onClick={() => {
                  leaveTeam({ user_id: userId, team_id: teamId });
                  closeModal();
                }}
              >
                Leave Team
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!teamId || !userId) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-start h-full bg-black !fixed w-screen h-screen z-10 inset-0 p-4">
      {renderLeaveTeam()}
    </div>
  );
};
