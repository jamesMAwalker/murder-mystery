"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/convex/_generated/api";
// import { cn } from "@/lib/utils";
import { useConvexAuth, useMutation, useQuery } from "convex/react-internal";
import { useAuth, useSession } from "@clerk/nextjs";
import { RevisedTeamInfo } from "../(layout-components)/revised-team-info";
// import { usePrevious } from "../(hooks)/utility/usePrevious";
// import { useModal, ModalType } from "../(context)/modal.context";

// import { TeamSelection } from "../(layout-components)/team-selection";
// import { JoinTeamModal } from "../(layout-components)/join-team-modal";
// import { CreateTeamModal } from "../(layout-components)/create-team-modal";
// import { AddMemberModal } from "../(layout-components)/add-member-modal";
// import { LeaveTeamModal } from "../(layout-components)/leave-team-modal";
// import { NotificationsSection } from "../(layout-components)/notifications-section";
// import { TeamInfo } from "../(layout-components)/team-info";
import { NotificationToast } from "../(layout-components)/notification-toast";

const UserProfilePage = () => {
  const user = useQuery(api.users.getFromSession);
  const { isSignedIn, isLoaded } = useSession();

  // const [activeTab, setActiveTab] = useState(0);
  const [isTeamInfoOpen, setIsTeamInfoOpen] = useState(false);

  // const invitations = useQuery(api.invitations.getFromSessionByUser);
  // const hasInvites = Array.isArray(invitations) ? invitations.length : 0;

  // const requests = useQuery(api.requests.getFromSessionByTeam);
  // const hasRequests = Array.isArray(requests) ? requests.length : 0;

  // const hasNotifications = hasInvites + hasRequests > 0;

  // const { showModal } = useModal();

  // const handleModal = (modalType: ModalType) => {
  //   showModal(modalType);
  //   setIsTeamInfoOpen(false);
  // };

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
    <div className="my-4 md:my-8 space-y-2 md:space-y-2 bg-slate-800 rounded-lg shadow-md p-2 md:p-4">
      <UserInfoSection />
      <RevisedTeamInfo isOpen={isTeamInfoOpen} setIsOpen={setIsTeamInfoOpen} />
      {/* <SuspectsDashboardButton />
      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasNotifications={hasNotifications}
      />
      {activeTab === 0 && (
        <>
          {user?.has_team && (
            <TeamInfo isOpen={isTeamInfoOpen} setIsOpen={setIsTeamInfoOpen} />
          )}
          <TeamSelection
            showJoinModal={() => handleModal(ModalType.JOIN)}
            showCreateModal={() => handleModal(ModalType.CREATE)}
            showAddModal={() => handleModal(ModalType.ADD)}
            showLeaveModal={() => handleModal(ModalType.LEAVE)}
          />
        </>
      )}
      {activeTab === 1 && <NotificationsSection />}
    </div>
  );
}

*/}
    </div>
  );
};

export default UserProfilePage;

function UserInfoSection() {
  const user = useQuery(api.users.getFromSession);
  return (
    <div className="flex flex-col w-full p-4 bg-slate-800 rounded-lg">
      <div className="flex text-slate-100 items-center text-xl md:text-2xl font-bold">
        Welcome to&nbsp;<span className="text-red-500">Murder</span>
        <span className="text-slate-100">Mystery,</span>
      </div>
      <h1 className="text-xl md:text-2xl font-bold mt-2">
        <span className="text-2xl text-slate-100">{user?.name}</span>
      </h1>
    </div>
  );
}

// function SuspectsDashboardButton() {
//   const isSuspect = true;

//   if (!isSuspect) {
//     return null;
//   }

//   return (
//     <button
//       className="btn btn-primary btn-lg w-full"
//       onClick={() => (window.location.href = "/suspect-dashboard")}
//     >
//       Suspects Dashboard
//     </button>
//   );
// }

// function ProfileTabs({ activeTab, setActiveTab, hasNotifications }: any) {
//   const hasTeam = useQuery(api.users.getFromSession)?.has_team;

//   // Base styles for tabs
//   const baseTabStyles =
//     "tab tab-lg flex-1 text-center cursor-pointer px-2 py-1 w-1/2 truncate";

//   function renderTab(
//     tabContent: any,
//     tabIndex: any,
//     notificationCount = undefined
//   ) {
//     return (
//       <a
//         onClick={() => setActiveTab(tabIndex)}
//         className={cn(
//           baseTabStyles,
//           activeTab === tabIndex && "tab-active text-accent",
//           tabIndex === 1 &&
//             notificationCount &&
//             "bg-blue-400 text-white shadow-md",
//           notificationCount && "animate-pulse"
//         )}
//       >
//         {tabContent}
//         {notificationCount && (
//           <span className="ml-2 rounded-full bg-red-500 text-white px-2 py-0.5 text-xs animate-bounce">
//             {notificationCount}
//           </span>
//         )}
//       </a>
//     );
//   }

//   return (
//     <div className="flex w-full tabs tabs-boxed">
//       {hasTeam
//         ? renderTab("My Team", 0, undefined)
//         : renderTab("Get Started", 0, undefined)}

//       {renderTab(
//         <>
//           <i className="fas fa-bell"></i>
//           <span className="ml-1">
//             {hasNotifications ? "New Notifications" : "Notifications"}
//           </span>
//         </>,
//         1,
//         hasNotifications
//       )}
//     </div>
//   );
// }
