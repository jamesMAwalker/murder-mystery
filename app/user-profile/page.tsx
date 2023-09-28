"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useConvexAuth, useMutation, useQuery } from "convex/react-internal";
import { useAuth, useSession } from "@clerk/nextjs";
import { usePrevious } from "../(hooks)/utility/usePrevious";

import { TeamSelection } from "../(layout-components)/team-selection";
import { JoinTeamModal } from "../(layout-components)/join-team-modal";
import { CreateTeamModal } from "../(layout-components)/create-team-modal";
import { AddMemberModal } from "../(layout-components)/add-member-modal";
import { LeaveTeamModal } from "../(layout-components)/leave-team-modal";
import { NotificationsSection } from "../(layout-components)/notifications-section";
import { TeamInfo } from "../(layout-components)/team-info";
import { NotificationToast } from "../(layout-components)/notification-toast";

const UserProfilePage = () => {
  const { isSignedIn, isLoaded } = useSession();
  const user = useQuery(api.users.getFromSession);

  enum ModalType {
    JOIN = "join",
    CREATE = "create",
    ADD = "add",
    LEAVE = "leave",
    NONE = "none",
  }

  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  console.log("modalType: ", modalType);
  const showJoinModal = () => setModalType(ModalType.JOIN);
  const showCreateModal = () => setModalType(ModalType.CREATE);
  const showAddModal = () => setModalType(ModalType.ADD);
  const showLeaveModal = () => setModalType(ModalType.LEAVE);
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
      {user.has_team && <TeamInfo />}
      <TeamSelection
        showJoinModal={showJoinModal}
        showCreateModal={showCreateModal}
        showAddModal={showAddModal}
        showLeaveModal={showLeaveModal}
      />
      {modalType === ModalType.JOIN && (
        <JoinTeamModal closeModal={closeModal} />
      )}
      {modalType === ModalType.CREATE && (
        <CreateTeamModal closeModal={closeModal} />
      )}
      {modalType === ModalType.ADD && (
        <AddMemberModal closeModal={closeModal} />
      )}
      {modalType === ModalType.LEAVE && (
        <LeaveTeamModal closeModal={closeModal} />
      )}

      <NotificationsSection />
    </div>
  );
};

export default UserProfilePage;

function UserInfoSection() {
  const user = useQuery(api.users.getFromSession);
  return (
    <div className="flex flex-col w-full p-4 bg-slate-800 rounded-lg">
      <h1 className="text-xl md:text-2xl font-bold">
        Welcome, <span className="text-accent">{user?.name}</span>
      </h1>
    </div>
  );
}
