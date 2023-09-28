import React, { useState } from "react";
import { useQuery } from "convex/react-internal";
import { api } from "@/convex/_generated/api";

export const NotificationsSection: React.FC = () => {
  const user = useQuery(api.users.getFromSession);

  return (
    <div className="p-4 rounded-lg">
      {!user?.has_team ? <PendingInvites /> : null}
      {user?.has_team && user?.is_captain ? <RequestsToJoin /> : null}
    </div>
  );
};

const PendingInvites: React.FC = () => {
  const [showAllInvitations, setShowAllInvitations] = useState(false);
  const pendingInvitations = useQuery(api.invitations.getFromSessionByUser);
  const teams = useQuery(api.teams.getAll);

  const invitingTeams = teams?.filter((team) =>
    pendingInvitations?.some((invite) => invite.inviting_team_id === team._id)
  );

  const displayedInvitations = showAllInvitations
    ? invitingTeams
    : invitingTeams?.slice(0, 3);

  return (
    <div className="p-4 bg-slate-800 rounded-lg">
      <h1 className="mb-2 font-bold text-white">Invitations:</h1>
      {pendingInvitations?.length === 0 ? (
        <h2 className="text-white text-lg font-semibold">
          You do not have any pending invitations.
        </h2>
      ) : (
        <>
          <InvitationList invitations={displayedInvitations} />
          {!showAllInvitations && (
            <button
              className="btn btn-secondary"
              onClick={() => setShowAllInvitations(true)}
            >
              Show More
            </button>
          )}
        </>
      )}
    </div>
  );
};

const InvitationList: React.FC<{ invitations: any[] }> = ({ invitations }) => (
  <ul className="flex flex-col gap-4 w-full overflow-y-auto">
    {invitations?.map((invite) => (
      <li
        key={invite._id}
        className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-800 gap-2 w-full rounded-md"
      >
        <span className="font-semibold text-lg md:mr-2">
          Team: {invite.team_name}
        </span>
        <div className="flex gap-2 mt-2 md:mt-0">
          <button className="btn btn-success" title="Accept this invitation">
            Accept
          </button>
          <button className="btn btn-danger" title="Decline this invitation">
            Decline
          </button>
        </div>
      </li>
    ))}
  </ul>
);

const RequestsToJoin: React.FC = () => {
  const [showAllRequests, setShowAllRequests] = useState(false);
  const teamRequests = useQuery(api.requests.getFromSessionByTeam);
  const allPlayers = useQuery(api.users.getAll);

  const RequestingPlayerIds = new Set(
    teamRequests?.map((request: any) => request.requesting_user_id)
  );

  const requestingPlayers = allPlayers?.filter((player) =>
    RequestingPlayerIds.has(player._id)
  );

  const displayedRequests = showAllRequests
    ? requestingPlayers
    : requestingPlayers?.slice(0, 3);

  const team = useQuery(api.teams.getFromSession);

  return (
    <div className="p-4 bg-slate-800 rounded-lg">
      <h1 className="mb-2 font-bold text-white">Player Requests:</h1>
      {teamRequests?.length === 0 ? (
        <h2 className="text-white text-lg font-semibold">
          There are no requests to join {team?.team_name} at this time.
        </h2>
      ) : (
        <>
          <RequestList requestingPlayers={displayedRequests} />
          {!showAllRequests && (
            <button
              className="btn btn-secondary"
              onClick={() => setShowAllRequests(true)}
            >
              Show More
            </button>
          )}
        </>
      )}
    </div>
  );
};

const RequestList: React.FC<{ requestingPlayers: any[] }> = ({
  requestingPlayers,
}) => (
  <ul className="flex flex-col gap-4 w-full overflow-y-auto">
    {requestingPlayers?.map((player) => (
      <li
        key={player._id}
        className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-800 gap-2 w-full rounded-md"
      >
        <span className="font-semibold text-lg md:mr-2">{player.name}</span>
        <div className="flex gap-2 mt-2 md:mt-0">
          <button className="btn btn-success" title="Accept this player">
            Accept
          </button>
          <button className="btn btn-danger" title="Decline this player">
            Decline
          </button>
        </div>
      </li>
    ))}
  </ul>
);

export default NotificationsSection;
