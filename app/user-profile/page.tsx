"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useConvexAuth, useMutation, useQuery } from "convex/react-internal";
import { useAuth, useSession } from "@clerk/nextjs";
import { usePrevious } from "../(hooks)/utility/usePrevious";
import { useModal, ModalType } from "../(context)/modal.context";

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
  const { showModal } = useModal();
  const [activeTab, setActiveTab] = useState(0);
  const hasInvites = useQuery(api.invitations.getFromSessionByUser)
    ?.length as number;
  console.log("hasInvites: ", hasInvites);
  const hasRequests = useQuery(api.requests.getFromSessionByTeam)
    ?.length as number;

  console.log("hasRequests: ", hasRequests);

  const hasNotifications = hasInvites + hasRequests > 0;
  console.log("hasNotifications: ", hasNotifications);

  // enum ModalType {
  //   JOIN = "join",
  //   CREATE = "create",
  //   ADD = "add",
  //   LEAVE = "leave",
  //   NONE = "none",
  // }

  // const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  // console.log("modalType: ", modalType);
  // const showJoinModal = () => setModalType(ModalType.JOIN);
  // const showCreateModal = () => setModalType(ModalType.CREATE);
  // const showAddModal = () => setModalType(ModalType.ADD);
  // const showLeaveModal = () => setModalType(ModalType.LEAVE);
  // const closeModal = () => setModalType(ModalType.NONE);

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
      <SuspectsDashboardButton />
      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasNotifications={hasNotifications}
      />

      {activeTab === 0 && (
        <>
          {user?.has_team && <TeamInfo />}
          <TeamSelection
            showJoinModal={() => showModal(ModalType.JOIN)}
            showCreateModal={() => showModal(ModalType.CREATE)}
            showAddModal={() => showModal(ModalType.ADD)}
            showLeaveModal={() => showModal(ModalType.LEAVE)}
          />
        </>
      )}
      {activeTab === 1 && <NotificationsSection />}

      {/*
      // <NotificationsSection /> */}
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

function SuspectsDashboardButton() {
  const isSuspect = true;

  if (!isSuspect) {
    return null;
  }

  return (
    <button
      className="btn btn-primary btn-lg w-full"
      onClick={() => (window.location.href = "/suspect-dashboard")}
    >
      Suspects Dashboard
    </button>
  );
}

function ProfileTabs({ activeTab, setActiveTab, hasNotifications }: any) {
  const hasTeam = useQuery(api.users.getFromSession)?.has_team;

  // Base styles for tabs
  const baseTabStyles =
    "tab tab-lg flex-1 text-center cursor-pointer px-2 py-1 w-1/2 truncate";

  return (
    <div className="flex w-full tabs tabs-boxed">
      {hasTeam ? (
        <a
          onClick={() => setActiveTab(0)}
          className={cn(
            baseTabStyles,
            activeTab === 0 && "tab-active text-accent"
          )}
        >
          My Team
        </a>
      ) : (
        <a
          onClick={() => setActiveTab(0)}
          className={cn(
            baseTabStyles,
            activeTab === 0 && "tab-active text-accent"
          )}
        >
          Get Started
        </a>
      )}
      <a
        onClick={() => setActiveTab(1)}
        className={cn(
          baseTabStyles,
          "bg-blue-400 text-white shadow-md", // Color alteration and shadow for distinction
          activeTab === 1 && "tab-active",
          hasNotifications && "animate-pulse" // Animation for attention
        )}
      >
        <i className="fas fa-bell"></i> {/* Iconography */}
        <span className="ml-1">
          {hasNotifications ? "New Notifications" : "Notifications"}
        </span>
        {hasNotifications && (
          <span className="ml-2 rounded-full bg-red-500 text-white px-2 py-0.5 text-xs animate-bounce">
            {hasNotifications}
          </span>
        )}
      </a>
    </div>
  );
}
