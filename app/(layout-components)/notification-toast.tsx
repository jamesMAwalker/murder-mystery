// NotificationToast.tsx
import React from "react";

interface NotificationToastProps {
  message: string;
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  onClose,
}) => {
  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
      <div className="alert alert-info">
        <span>{message}</span>
      </div>
    </div>
  );
};
