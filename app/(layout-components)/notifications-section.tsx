import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation } from "convex/react-internal";
import { api } from "@/convex/_generated/api";
import { join } from "path";

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
  console.log("showAllInvitations: ", showAllInvitations);

  const pendingInvitations = useQuery(api.invitations.getFromSessionByUser);
  console.log("pendingInvitations: ", pendingInvitations);
  const allTeams = useQuery(api.teams.getAll); // Fetch all teams at once.

  const teamNameById = allTeams?.reduce((acc: any, team: any) => {
    acc[team._id] = team.team_name;
    return acc;
  }, {});

  const invitationsWithTeamNames = pendingInvitations?.map((invite) => ({
    ...invite,
    team_name: teamNameById
      ? teamNameById[invite.inviting_team_id]
      : "Unknown Team",
  }));

  const displayedInvitations = showAllInvitations
    ? invitationsWithTeamNames
    : invitationsWithTeamNames?.slice(0, 3);
  console.log("displayedInvitations: ", displayedInvitations);
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

          <button
            className="btn btn-secondary"
            onClick={() =>
              !showAllInvitations
                ? setShowAllInvitations(true)
                : setShowAllInvitations(false)
            }
          >
            {showAllInvitations ? "Show Less" : "Show More"}
          </button>
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

  const requestsWithPlayerData = teamRequests.map((request: any) => {
    const player = allPlayers?.find(
      (p: any) => p._id === request.requesting_user_id
    );
    return {
      ...request,
      player_name: player?.name,
    };
  });
  console.log("requestsWithPlayerData: ", requestsWithPlayerData);

  const displayedRequests = showAllRequests
    ? requestsWithPlayerData
    : requestsWithPlayerData.slice(0, 3);

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
          <RequestList requests={requestsWithPlayerData} />
          {requestsWithPlayerData.length > 3 && (
            <button
              className="btn btn-secondary"
              onClick={() => {
                showAllRequests
                  ? setShowAllRequests(false)
                  : setShowAllRequests(true);
              }}
            >
              {showAllRequests ? "Show Less" : "Show More"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

const InvitationList: React.FC<{ invitations: any[] | undefined }> = ({
  invitations,
}) => {
  console.log("invitations: ", invitations);
  const destroy = useMutation(api.invitations.destroy);
  const joinTeam = useMutation(api.teams.addMember);

  const handleAcceptInvite = (invite: any) => {
    joinTeam({
      user_id: invite.invited_user_id,
      team_id: invite.inviting_team_id,
    });
    destroy({ invitation_id: invite._id });
  };
  console.log("invitations: ", invitations);

  return (
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
              onClick={() => handleAcceptInvite(invite)}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>

            <button
              className="btn btn-danger btn-sm mb-2 md:mb-0"
              title="Decline this invitation"
              onClick={() =>
                destroy({
                  invitation_id: invite._id,
                })
              }
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

const RequestList: React.FC<{ requests: any[] | undefined }> = ({
  requests,
}) => {
  console.log("requests: ", requests);
  const destroyRequest = useMutation(api.requests.destroy);
  const addPlayerToTeam = useMutation(api.teams.addMember);

  function handleAcceptRequest(request: any) {
    addPlayerToTeam({
      user_id: request.requesting_user_id,
      team_id: request.requested_team_id,
    });
    destroyRequest({ request_id: request._id });
  }

  return (
    <ul className="flex flex-col gap-4 w-full overflow-y-auto">
      {requests?.map((request) => (
        <li
          key={request._id}
          className="flex flex-col-td md:flex-row items-start md:items-center justify-between p-4 bg-slate-700 gap-2 w-full rounded-md shadow-md"
        >
          <span className="font-semibold text-lg mb-2 md:mb-0 md:mr-2">
            {request.player_name} wants to join your team!
          </span>
          <div className="flex  md:flex-row gap-2">
            <button
              className="btn btn-success btn-sm mb-2 md:mb-0"
              title="Accept this invitation"
              onClick={() => handleAcceptRequest(request)}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>

            <button
              className="btn btn-danger btn-sm mb-2 md:mb-0"
              title="Decline this invitation"
              onClick={() => destroyRequest({ request_id: request._id })}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NotificationsSection;
