"use client";

import { useState, useEffect, useMemo } from "react";

// Helper function to determine the alert class based on the notification type
const getAlertType = (type: any) => {
  switch (type) {
    case "error":
      return "danger";
    case "report":
    case "request":
    case "invitation":
      return "info";
    case "confirmation":
      return "success";
    default:
      return "secondary";
  }
};

export const NotificationPopupToast = () => {
  const [isVisible, setIsVisible] = useState(true);

  const notifications = useMemo(
    () => [
      {
        id: 1,
        type: "invitation",
        message: "You've been invited to join Team Avengers!",
      },
      {
        id: 2,
        type: "request",
        message: "Iron Man wants to join your team.",
      },
      {
        id: 3,
        type: "report",
        subtype: "toxicology",
        message: "New toxicology report available.",
      },
      {
        id: 4,
        type: "report",
        subtype: "security",
        message: "Security footage from last night is now available.",
      },
      {
        id: 5,
        type: "confirmation",
        message: "Your invitation to Black Widow has been sent.",
      },
      {
        id: 6,
        type: "error",
        message: "Error: You can't request to join a team you're already on!",
      },
    ],
    []
  );

  const latestNotification = useMemo(() => {
    if (notifications.length > 0) {
      return notifications[notifications.length - 1];
    }
    return null;
  }, [notifications]);

  useEffect(() => {
    setIsVisible(true); // Whenever there's a new notification, set visibility to true
    const popupTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(popupTimer);
  }, [latestNotification]);

  if (!isVisible || !latestNotification) {
    return null;
  }

  return (
    <div
      className={`toast toast-start fixed bottom-[4.5rem] w-11/12 mx-auto p-2`}
    >
      <div
        className={`alert alert-${getAlertType(
          latestNotification.type
        )} rounded-md p-3`}
      >
        <span className="block text-left whitespace-normal break-words">
          {latestNotification.message}
        </span>
      </div>
    </div>
  );
};
