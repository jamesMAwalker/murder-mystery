import React, { useEffect } from "react";

interface ModalWrapperProps {
  children: React.ReactNode;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  useEffect(() => {
    // Disable scrolling on the body by setting overflow to hidden
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when the modal is closed or the component is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-start justify-center bg-black overflow-y-hidden p-4">
      <div className="relative p-6 bg-slate-800 rounded-lg shadow-xl max-w-md w-full mt-20 overflow-y-hidden">
        {children}
      </div>
    </div>
  );
};
