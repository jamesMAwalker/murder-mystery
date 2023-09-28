// ToastHandler.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react-internal";
import { api } from "@/convex/_generated/api";
import { NotificationToast } from "./notification-toast";

export const ToastHandler: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const user = useQuery(api.users.getFromSession);
  const invites = useQuery(api.invitations.getFromSessionByUser);
  const requests = useQuery(api.requests.getFromSessionByTeam);
  console.log("requests: ", requests);

  useEffect(() => {
    if (!user?.is_captain && Array.isArray(invites) && invites?.length > 0) {
      setShowToast(true);
      setToastMessage(
        `You have ${invites.length} pending invitation${
          invites.length > 1 ? "s" : ""
        }.`
      );
    } else if (
      user?.is_captain &&
      Array.isArray(requests) &&
      requests?.length > 0
    ) {
      setShowToast(true);
      setToastMessage(
        `You have ${requests?.length} pending request${
          requests?.length > 1 ? "s" : ""
        }.`
      );
    }

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  }, [invites, requests]);

  const closeToast = () => {
    setShowToast(false);
  };

  return (
    user &&
    showToast && (
      <NotificationToast message={toastMessage} onClose={closeToast} />
    )
  );
};
