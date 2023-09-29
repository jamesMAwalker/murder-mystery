"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SuspectContextType = {
  selectedSuspectId: null | string; // Assuming ID is a string, adjust if not
  setSelectedSuspectId: (id: null | string) => void;
};

const defaultContextValue: SuspectContextType = {
  selectedSuspectId: null,
  setSelectedSuspectId: () => {},
};

export const SuspectContext =
  createContext<SuspectContextType>(defaultContextValue);

export const useSelectedSuspect = () => {
  return useContext(SuspectContext);
};

type SuspectProviderProps = {
  children: ReactNode;
};

export const SuspectProvider: React.FC<SuspectProviderProps> = ({
  children,
}) => {
  const [selectedSuspectId, setSelectedSuspectId] = useState<null | string>(
    null
  );

  return (
    <SuspectContext.Provider
      value={{ selectedSuspectId, setSelectedSuspectId }}
    >
      {children}
    </SuspectContext.Provider>
  );
};
