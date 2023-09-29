import React from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react-internal";

interface TeamDetailsModalProps {
  closeModal: () => void;
}

export const TeamDetailsModal: React.FC<TeamDetailsModalProps> = ({
  closeModal,
}) => {
  const team = useQuery(api.teams.getFromSession);
  const allUsers = useQuery(api.users.getAll);
  const captain = allUsers?.find((user) => user._id === team?.team_captain);
  const teammates = allUsers?.filter((user) =>
    team?.members?.includes(user._id)
  );

  const displayedTeammates = teammates?.slice(0, 10);

  return (
    <div className="flex flex-col items-center justify-start h-full bg-black !fixed w-screen h-screen z-10 inset-0 p-4">
      <div className="modal-box bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md mt-20 relative">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2 p-2"
          onClick={closeModal}
        >
          &times;
        </button>

        <div className="flex flex-col gap-4 bg-slate-800 rounded-lg p-4">
          <h2 className="text-white text-xl font-bold mb-2">
            Team:{" "}
            <span className="font-semibold text-2xl">{team?.team_name}</span>
          </h2>
          <h3 className="text-white text-lg font-semibold mb-2">
            Team Captain: <span className="font-bold">{captain?.name}</span>
          </h3>
          <h3 className="text-white text-lg font-semibold mb-2">Members:</h3>
          <ol className="flex flex-col gap-2 w-full">
            {displayedTeammates?.map((user, index) => (
              <li
                key={user._id}
                className="flex items-center justify-between p-2 bg-slate-700 gap-2 rounded-md shadow-sm"
              >
                <span className="text-white text-lg">
                  {index + 1}. {user.name}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
