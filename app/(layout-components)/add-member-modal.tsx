import React from "react";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react-internal";

interface AddMemberModalProps {
  closeModal: () => void;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  closeModal,
}) => {
  const user = useQuery(api.users.getFromSession);
  const userIsCaptain = user?.is_captain;
  const allUsers = useQuery(api.users.getAll);
  const usersNotCurrentlyOnTeam = allUsers?.filter((user) => {
    return user.has_team === false;
  });

  return (
    <div className="flex flex-col items-center justify-start h-full bg-black !fixed w-screen h-screen z-10 inset-0 p-4">
      {userIsCaptain && (
        <div className="modal-box bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md mt-20 relative">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            &times;
          </button>
          <h3 className="font-bold text-xl mb-4 w-[90%]">
            Invite players to your team
          </h3>
          {usersNotCurrentlyOnTeam && (
            <ul className="flex-col gap-2 sm:gap-4 w-full overflow-y-auto">
              {usersNotCurrentlyOnTeam.map((user: any) => (
                <li
                  key={user._id}
                  className="flex items-center justify-between p-4 bg-slate-800 gap-2 w-full rounded-md"
                >
                  <span className="font-bold text-lg">{user.name}</span>
                  <button className="btn btn-primary text-sm sm:text-base">
                    Invite
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
