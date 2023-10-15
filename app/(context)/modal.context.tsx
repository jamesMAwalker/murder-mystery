// modalContext.tsx
"use client";

import { createContext, useContext, ReactNode, useState } from "react";

export enum ModalType {
  JOIN = "join",
  CREATE = "create",
  ADD = "add",
  LEAVE = "leave",
  NONE = "none",
}

type ModalContextType = {
  modalType: ModalType;
  showModal: (type: ModalType) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);

  const showModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType(ModalType.NONE);

  return (
    <ModalContext.Provider value={{ modalType, showModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
