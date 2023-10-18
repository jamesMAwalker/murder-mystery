"use client";

import React from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react-internal";

interface ViewTeamMembersMicroModalProps {
  team: Team | null;
  close: () => void;
}

interface Team {
  _id: string;
  team_name: string;
  members: string[];
}

interface User {
  _id: string;
  name: string;
  has_team: boolean;
}

export const ViewTeamMembersModal: React.FC<ViewTeamMembersMicroModalProps> = ({
  team,
  close,
}) => {
  const users = useQuery(api.users.getAll);
  const usersOnTeam: User[] | undefined = users?.filter((user) =>
    team?.members?.includes(user._id)
  );

  if (!team || !usersOnTeam) {
    return (
      <div className="microModalBackdrop absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
        <div className="microModal relative p-6 bg-slate-800 rounded-lg shadow-lg w-3/4 max-w-lg">
          <div className="flex-center h-40">
            <span className="loading loading-ring loading-lg scale-150"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="microModalBackdrop absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="microModal relative p-6 bg-slate-800 rounded-lg shadow-lg w-3/4 max-w-lg">
        <button
          onClick={close}
          className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2 p-2 text-2xl"
        >
          &times;
        </button>
        <h4 className="text-2xl text-white font-bold mb-4">
          Team Name:
          <span className="text-accent"> {team.team_name}</span>
        </h4>
        <div className="membersSection mt-4 border-t border-slate-600 pt-4">
          <h3 className="text-xl font-semibold text-white mb-2">
            Team Members:
          </h3>
          <ul className="flex flex-col gap-2 w-full overflow-y-auto">
            {usersOnTeam?.map((user, index) => (
              <li key={user._id} className="text-white text-lg">
                {index + 1}. {user.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
