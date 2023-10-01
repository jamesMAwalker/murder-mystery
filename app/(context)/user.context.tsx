"use client";

import { createContext, ReactNode, useContext, useState } from "react";

// import { useGetUserFromDB } from "../(hooks)/convex/users/useGetUserFromDB";
// import { useGetTeamFromDB } from "../(hooks)/convex/teams/useGetTeamFromDB";
// import { useGetRequestsByUserID } from "../(hooks)/convex/requests/useGetRequestsByUserID";
// import { useGetInvitationsByUserID } from "../(hooks)/convex/invitations/useGetInvitationsByUserID";

const defaults: {
  user: IConvexUser | null;
  team?: IConvexTeam;
  requests?: IConvexRequest[] | null;
  invitations?: IConvexInvitation | null;
  loggedUser: IConvexUser | null;
  activeProfileModal: string | null;
  setActiveProfileModal: React.Dispatch<React.SetStateAction<string | null>>;
  setLoggedUser: React.Dispatch<React.SetStateAction<IConvexUser | null>>;
  showProfileModal: (id: string) => void;
  hideProfileModal: () => void;
} = {
  user: null,
  team: undefined,
  requests: null,
  invitations: null,
  loggedUser: null,
  activeProfileModal: null,
  setActiveProfileModal: () => {}, // noop function
  setLoggedUser: () => {}, // noop function
  showProfileModal: () => {}, // noop function
  hideProfileModal: () => {}, // noop function
};

const UserContext = createContext<typeof defaults | null>(defaults);

export const useUserContext = () => useContext(UserContext)!;

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const user = useGetUserFromDB() || null;
//   const team = useGetTeamFromDB(user?.team_id) || null;

//   const [loggedUser, setLoggedUser] = useState<IConvexUser | null>(null);
//   const [activeProfileModal, setActiveProfileModal] = useState<string | null>(
//     null
//   );

//   const requests = useGetRequestsByUserID(user?._id) || null;
//   const invitations = useGetInvitationsByUserID(user?._id) || null;

//   function showProfileModal(id: string) {
//     setActiveProfileModal(id);
//   }

//   function hideProfileModal() {
//     setActiveProfileModal(null);
//   }

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         team,
//         requests,
//         invitations,
//         loggedUser,
//         activeProfileModal,
//         setActiveProfileModal,
//         setLoggedUser,
//         showProfileModal,
//         hideProfileModal,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };
