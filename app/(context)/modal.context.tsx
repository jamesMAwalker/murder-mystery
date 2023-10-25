"use client";

import { createContext, useContext, ReactNode, useState } from "react";

export enum ModalType {
  JOIN = "join",
  CREATE = "create",
  ADD = "add",
  LEAVE = "leave",
  EVIDENCE = "evidence",
  NONE = "none",
}

type ModalContextType = {
  modalType: ModalType;
  modalPayload: any; // If you know the possible types, you can further type this
  showModal: (type: ModalType, payload?: any) => void;
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
  const [modalPayload, setModalPayload] = useState<any>(null);

  const showModal = (type: ModalType, payload: any = null) => {
    setModalType(type);
    setModalPayload(payload);
  };

  const closeModal = () => {
    setModalType(ModalType.NONE);
    setModalPayload(null); // Clear the payload when closing the modal
  };

  return (
    <ModalContext.Provider
      value={{ modalType, modalPayload, showModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
