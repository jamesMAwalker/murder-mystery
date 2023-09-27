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

  const team = useQuery(api.teams.getFromSession);
  const teamId = team?._id;

  const allUsers = useQuery(api.users.getAll);
  const usersNotCurrentlyOnTeam = allUsers?.filter((user) => !user.has_team);
  console.log("usersNotCurrentlyOnTeam: ", usersNotCurrentlyOnTeam);

  const invitePlayer = useMutation(api.invitations.create);
  const teamInvites = useQuery(api.invitations.getFromSessionByTeam);
  console.log("teamInvites: ", teamInvites);
  const invitedUserIds = new Set(
    teamInvites?.map((invite: any) => invite.invited_user_id)
  );
  const hasBeenInvited = (user: any) => invitedUserIds.has(user._id);
  console.log("invitedUserIds: ", invitedUserIds);

  return (
    <div className="flex flex-col items-center justify-start h-full bg-black !fixed w-screen h-screen z-10 inset-0 p-4">
      {user && teamId && (
        <div className="modal-box bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md mt-20 relative">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2 p-2"
            onClick={closeModal}
          >
            &times;
          </button>
          <h3 className="font-bold text-xl mb-4 w-[90%]">
            Invite players to your team
          </h3>

          {!teamInvites ? (
            <div className="flex items-left justify-left w-full">
              <div>Loading...</div>
            </div>
          ) : (
            <ul className="flex-col gap-2 sm:gap-4 w-full overflow-y-auto">
              {teamInvites &&
                usersNotCurrentlyOnTeam?.map((userToInvite: any) => (
                  <li
                    key={userToInvite._id}
                    className="flex items-center justify-between p-4 bg-slate-800 gap-2 w-full rounded-md"
                  >
                    <span className="font-bold text-lg">
                      {userToInvite.name}
                    </span>
                    {hasBeenInvited(userToInvite) ? (
                      <button
                        className="btn btn-primary text-sm sm:text-base"
                        disabled
                      >
                        Invited
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary text-sm sm:text-base"
                        onClick={() =>
                          invitePlayer({
                            team_id: teamId,
                            user_id: userToInvite._id,
                          })
                        }
                      >
                        Invite
                      </button>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
