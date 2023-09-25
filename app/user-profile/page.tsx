"use client";

import React, { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useConvexAuth, useMutation, useQuery } from "convex/react-internal";
import { useAuth, useSession } from "@clerk/nextjs";
import { WithoutSystemFields } from "convex/server";
import { Doc } from "@/convex/_generated/dataModel";

import { TeamSelection } from "../(layout-components)/team-selection";
import { JoinTeamModal } from "../(layout-components)/join-team-modal";
import { CreateTeamModal } from "../(layout-components)/create-team-modal";
/*
  * NOTES *

  + useQuery | useMutation +
  # These functions allow us to use any of the functions built into the convex backend without API routes or even HTTP requests. Use these to handle all database operations.

  + No HTTP Means No Suspense +
  # Because suspense works by detecting the state of any http requests, using useQuery and useMutation avoids suspense entirely. This means loading states need to be handled manually.
*/

const UserProfilePage = () => {
  const convexAuthState = useConvexAuth();
  const clerkAuthState = useAuth();
  const user = useQuery(api.users.getFromSession);
  const teams = useQuery(api.teams.getAll);
  console.log("teams: ", teams);
  const { isSignedIn, isLoaded, session } = useSession();

  enum ModalType {
    JOIN = "join",
    CREATE = "create",
    NONE = "none",
  }

  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);

  const showJoinModal = () => setModalType(ModalType.JOIN);
  const showCreateModal = () => setModalType(ModalType.CREATE);
  const closeModal = () => setModalType(ModalType.NONE);

  console.log("isSignedIn: ", isSignedIn);
  console.log("isLoaded: ", isLoaded);
  console.log("session: ", session);

  if (!isSignedIn || !isLoaded || !user) {
    return (
      <div className="flex-center full !h-[40vh]">
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
    <div className="USER_INFO">
      <h1 className="text-xl md:text-2xl font-bold">
        Welcome, <span className="text-accent">{user?.name}</span>
      </h1>
    </div>
  );
}

function RequestInfoSection() {
  const requests = useQuery(api.requests.getFromSessionByUser);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="mb-2 font-bold text-gray-800">Current Requests</h1>
      <ul className="space-y-2">
        {requests?.map((request: any) => (
          <li key={request._id} className="text-gray-600">
            {request._id}
          </li>
        ))}
      </ul>
    </div>
  );
}
