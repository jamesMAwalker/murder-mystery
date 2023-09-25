"use client";

import React, { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useConvexAuth, useMutation, useQuery } from "convex/react-internal";
import { useAuth, useSession } from "@clerk/nextjs";

import { TeamSelection } from "../(layout-components)/team-selection";
import { JoinTeamModal } from "../(layout-components)/join-team-modal";
import { CreateTeamModal } from "../(layout-components)/create-team-modal";

const UserProfilePage = () => {
  const { isSignedIn, isLoaded, session } = useSession();
  const user = useQuery(api.users.getFromSession);

  enum ModalType {
    JOIN = "join",
    CREATE = "create",
    NONE = "none",
  }

  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const showJoinModal = () => setModalType(ModalType.JOIN);
  const showCreateModal = () => setModalType(ModalType.CREATE);
  const closeModal = () => setModalType(ModalType.NONE);

  if (!isSignedIn || !isLoaded || !user) {
    return (
      <div className="flex-center h-40">
        <span className="loading loading-ring loading-lg scale-150"></span>
      </div>
    );
  }

  return (
    <div className="my-4 md:my-8 space-y-4 md:space-y-6 bg-slate-800 rounded-lg shadow-md p-2 md:p-4">
      <UserInfoSection />
      <TeamSelection
        showJoinModal={showJoinModal}
        showCreateModal={showCreateModal}
      />
      {modalType === ModalType.JOIN && (
        <JoinTeamModal closeModal={closeModal} />
      )}
      {modalType === ModalType.CREATE && (
        <CreateTeamModal closeModal={closeModal} />
      )}
      <RequestInfoSection />
    </div>
  );
};

export default UserProfilePage;

function UserInfoSection() {
  const user = useQuery(api.users.getFromSession);
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold">
        Welcome, <span className="text-accent">{user?.name}</span>
      </h1>
    </div>
  );
}

function RequestInfoSection() {
  const requests = useQuery(api.requests.getFromSessionByUser);
  const teams = useQuery(api.teams.getAll);

  const requestedTeamName = (request: any) =>
    teams?.find((team: any) => team._id === request.requested_team_id)
      ?.team_name;

  const renderRequests = (requests: any) => {
    return requests?.length > 0 ? (
      <ul className="flex-col gap-4 w-full overflow-y-auto">
        {requests.map((request: any) => (
          <li
            key={request._id}
            className="flex items-center justify-between p-4 bg-slate-800 gap-2 w-full rounded-md"
          >
            <span className="font-semibold text-lg">
              {requestedTeamName(request)}
            </span>
          </li>
        ))}
      </ul>
    ) : (
      <h2 className="text-white text-lg font-semibold">
        You have no pending requests.
      </h2>
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="mb-2 font-bold text-gray-800">Pending Team Requests</h1>
      {renderRequests(requests)}
    </div>
  );
}
