import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import React from "react";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react-internal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface TeamInfoProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RevisedTeamInfo: React.FC<TeamInfoProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const user = useQuery(api.users.getFromSession);
  const team = useQuery(api.teams.getFromSession);
  const members = team?.members;
  console.log("members: ", members);

  const allUsers = useQuery(api.users.getAll);
  const teammates = allUsers?.filter((user) =>
    team?.members?.includes(user._id)
  );
  const displayedTeammates = teammates?.sort(
    (a, b) => b._creationTime - a._creationTime
  );
  console.log("displayedTeammates: ", displayedTeammates);

  const toggleOpen = () => setIsOpen(!isOpen);

  if (!user || !team || !teammates) {
    return (
      <div className="flex-center h-40">
        <span className="loading loading-ring loading-lg scale-150"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full p-4 bg-slate-800 rounded-lg">
      <h2 className="text-white text-2xl font-bold">Team Details</h2>
      {teammates && teammates.length > 0 ? (
        <div
          className="flex justify-between items-center cursor-pointer p-1 bg-gray-700 rounded-md hover:bg-gray-600"
          onClick={toggleOpen}
        >
          <h3 className="text-white text-lg font-semibold ml-2">
            View Teammates ({teammates?.length}/10)
          </h3>
          <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            className="text-white text-lg mr-2"
          />
        </div>
      ) : (
        <div className="flex justify-between items-center  p-1 bg-gray-700 rounded-md ">
          <h3 className="text-white text-lg font-semibold ml-2">
            No Teammates at this time.
            <br />
            Please wait.
          </h3>
        </div>
      )}
      {isOpen && (
        <ol className="flex flex-col gap-2 w-full mt-2">
          {displayedTeammates?.map((member) => (
            <li
              key={member._id}
              className="flex items-center justify-between p-2 bg-slate-700 gap-2 rounded-md shadow-sm"
            >
              <span className="text-white text-lg">{member.name}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
