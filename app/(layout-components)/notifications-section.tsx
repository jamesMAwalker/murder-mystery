import React from "react";
import { useQuery } from "convex/react-internal";
import { api } from "@/convex/_generated/api";

export const NotificationsSection: React.FC = () => {
  const user = useQuery(api.users.getFromSession);

  return (
    <div className="p-4 rounded-lg ">
      {!user?.has_team && <PendingInvites />}
      {user?.has_team && user?.is_captain && <RequestsToJoin />}
    </div>
  );
};

const PendingInvites: React.FC = () => {
  const pendingInvitations = useQuery(api.invitations.getFromSessionByUser);
  console.log("pendingInvitations: ", pendingInvitations);

  const teams = useQuery(api.teams.getAll);
  const invitingTeams = teams?.filter((team) =>
    pendingInvitations?.some((invite) => invite.inviting_team_id === team._id)
  );
  console.log("invitingTeams: ", invitingTeams);

  return (
    <div className="p-4 bg-slate-800 rounded-lg">
      <h1 className="mb-2 font-bold text-white">Invitations:</h1>
      {pendingInvitations?.length === 0 ? (
        <h2 className="text-white text-lg font-semibold">
          You do not have any pending invitations.
        </h2>
      ) : (
        <InvitationList
          invitations={pendingInvitations}
          invitingTeams={invitingTeams}
        />
      )}
    </div>
  );
};

const InvitationList: React.FC<{
  invitations: any[];
  invitingTeams: any[];
}> = ({ invitations, invitingTeams }) => (
  <ul className="flex-col gap-4 w-full overflow-y-auto">
    {invitingTeams?.map((invite) => (
      <li
        key={invite._id}
        className="flex items-center justify-between p-4 bg-slate-800 gap-2 w-full rounded-md"
      >
        <span className="font-semibold text-lg">Team: {invite.team_name}</span>
        <button className="btn btn-primary">Accept</button>
        <button className="btn btn-primary">Decline</button>
      </li>
    ))}
  </ul>
);

const RequestsToJoin: React.FC = () => {
  const teamRequests = useQuery(api.requests.getFromSessionByTeam);
  const allPlayers = useQuery(api.users.getAll);

  const RequestingPlayerIds = new Set(
    teamRequests?.map((request: any) => request.requesting_user_id)
  );

  const requestingPlayers = allPlayers?.filter((player) =>
    RequestingPlayerIds.has(player._id)
  );
  console.log("requestingPlayers: ", requestingPlayers);

  console.log("RequestingPlayerIds: ", RequestingPlayerIds);
  console.log("teamRequests: ", teamRequests);
  const team = useQuery(api.teams.getFromSession);
  return (
    <div className="p-4 bg-slate-800 rounded-lg">
      <h1 className="mb-2 font-bold text-white">Player Requests:</h1>
      {teamRequests?.length === 0 ? (
        <h2 className="text-white text-lg font-semibold">
          There are no requests to join {team?.team_name} at this time.
        </h2>
      ) : (
        <RequestList requestingPlayers={requestingPlayers} />
      )}
    </div>
  );
};

const RequestList: React.FC<{ requestingPlayers: any[] }> = ({
  requestingPlayers,
}) => (
  <ul className="flex-col gap-4 w-full overflow-y-auto">
    {requestingPlayers?.map((player) => (
      <li
        key={player._id}
        className="flex items-center justify-between p-4 bg-slate-800 gap-2 w-full rounded-md"
      >
        <span className="font-semibold text-lg">{player.name}</span>
      </li>
    ))}
    <button className="btn btn-primary">Accept</button>
    <button className="btn btn-primary">Decline</button>
  </ul>
);
