import React, { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react-internal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const TeamInfo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useQuery(api.users.getFromSession);
  const team = useQuery(api.teams.getFromSession);
  const members = team?.members;
  console.log("members: ", members);

  const allUsers = useQuery(api.users.getAll);
  const captain = allUsers?.find((user) => user._id === team?.team_captain);
  const teammates = allUsers?.filter((user) =>
    team?.members?.includes(user._id)
  );
  const displayedTeammates = teammates?.sort(
    (a, b) => a._creationTime - b._creationTime
  );
  console.log("displayedTeammates: ", displayedTeammates);

  const removeMember = useMutation(api.teams.removeMember);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col gap-4 w-full p-4 bg-slate-800 rounded-lg">
      <h2 className="text-white text-2xl font-bold">Team Details</h2>

      <div className="text-white overflow-hidden">
        <h3 className="text-xl font-semibold">Team Name: {team?.team_name}</h3>
        <p>Captain: {captain?.name}</p>
      </div>
      <div
        className="flex justify-between items-center cursor-pointer p-1 bg-gray-700 rounded-md"
        onClick={toggleOpen}
      >
        <h3 className="text-white text-lg font-semibold ml-2">
          {user?.is_captain
            ? `Manage Team (${teammates?.length}/10)`
            : `See Teammates (${teammates?.length}/10)`}
        </h3>
        <span className="text-lg transform transition-transform duration-300 mr-2">
          {!isOpen ? "+" : "-"}
        </span>
      </div>
      {isOpen && (
        <ol className="flex flex-col gap-2 w-full mt-2">
          {displayedTeammates?.map((member, index) => (
            <li
              key={member._id}
              className="flex items-center justify-between p-2 bg-slate-700 gap-2 rounded-md shadow-sm"
            >
              <span className="text-white text-lg">
                {index + 1}. {member.name}
              </span>
              {user?.is_captain && user._id !== member._id && team && (
                <button
                  className="bg-red-600 text-white text-sm px-4 py-1 rounded transition duration-300 hover:bg-red-700 active:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                  onClick={() =>
                    removeMember({
                      user_id: member?._id,
                      team_id: team?._id,
                    })
                  }
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-1" />
                  Remove
                </button>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
