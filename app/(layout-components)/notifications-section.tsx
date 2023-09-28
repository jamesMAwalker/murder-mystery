import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "convex/react-internal";
import { api } from "@/convex/_generated/api";

export const NotificationsSection: React.FC = () => {
  const user = useQuery(api.users.getFromSession);

  return (
    <div className="flex flex-col flex-col-td gap-4">
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
    <div className="flex flex-col flex-col-td gap-4 p-4 bg-slate-800 rounded-lg">
      <h1 className="mb-2 font-bold text-white">Invitations:</h1>
      {pendingInvitations?.length === 0 ? (
        <h2 className="text-white text-lg font-semibold">
          You do not have any pending invitations.
        </h2>
      ) : (
        <>
          {displayedInvitations && (
            <InvitationList invitations={displayedInvitations} />
          )}
          {!showAllInvitations && (
            <button
              className="btn btn-secondary w-full sm:w-auto"
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

const RequestsToJoin: React.FC = () => {
  const [showAllRequests, setShowAllRequests] = useState(false);

  const allPlayers = useQuery(api.users.getAll);
  const teamRequestsResponse = useQuery(api.requests.getFromSessionByTeam);
  const isArrayOfRequests = Array.isArray(teamRequestsResponse);
  const teamRequests = isArrayOfRequests ? teamRequestsResponse : [];

  const RequestingPlayerIds = new Set(
    teamRequests.map((request: any) => request.requesting_user_id)
  );

  const requestingPlayers = allPlayers?.filter((player) =>
    RequestingPlayerIds.has(player._id)
  );

  const displayedRequests = showAllRequests
    ? requestingPlayers
    : requestingPlayers?.slice(0, 3);

  const team = useQuery(api.teams.getFromSession);

  return (
    <div className="flex flex-col flex-col-td gap-4 p-4 bg-slate-800 rounded-lg">
      <h1 className="mb-2 font-bold text-white">
        Requests to join {team?.team_name}:
      </h1>
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

const InvitationList: React.FC<{ invitations: any[] | undefined }> = ({
  invitations,
}) => (
  <ul className="flex flex-col gap-4 w-full overflow-y-auto">
    {invitations?.map((invite) => (
      <li
        key={invite._id}
        className="flex flex-col-td md:flex-row items-start md:items-center justify-between p-4 bg-slate-700 gap-2 w-full rounded-md shadow-md"
      >
        <span className="font-semibold text-lg mb-2 md:mb-0 md:mr-2">
          Team {invite.team_name} invites you to join them!
        </span>
        <div className="flex  md:flex-row gap-2">
          <button
            className="btn btn-success btn-sm mb-2 md:mb-0"
            title="Accept this invitation"
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>

          <button
            className="btn btn-danger btn-sm mb-2 md:mb-0"
            title="Decline this invitation"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </li>
    ))}
  </ul>
);

const RequestList: React.FC<{ requestingPlayers: any[] | undefined }> = ({
  requestingPlayers,
}) => (
  <ul className="flex flex-col gap-4 w-full overflow-y-auto">
    {requestingPlayers?.map((player) => (
      <li
        key={player._id}
        className="flex flex-col-td md:flex-row items-start md:items-center justify-between p-4 bg-slate-700 gap-2 w-full rounded-md shadow-md"
      >
        <span className="font-semibold text-lg mb-2 md:mb-0 md:mr-2">
          {player.name} wants to join your team!
        </span>
        <div className="flex  md:flex-row gap-2">
          <button
            className="btn btn-success btn-sm mb-2 md:mb-0"
            title="Accept this invitation"
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>

          <button
            className="btn btn-danger btn-sm mb-2 md:mb-0"
            title="Decline this invitation"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </li>
    ))}
  </ul>
);

export default NotificationsSection;
