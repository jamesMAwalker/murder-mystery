"use client";

import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { cn } from "@/lib/utils";

const SuspectDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const suspectCard = useQuery(api.suspects.getFromUserSession);
  const user = useQuery(api.users.getFromSession);

  useEffect(() => {
    if (user && !suspectCard) {
      window.location.href = "/user-profile";
    }
  }, [user, suspectCard]);

  if (!user || !suspectCard) {
    return <LoadingIndicator />;
  }

  return (
    <div className="flex-col-tl gap-8">
      <DashboardHeader
        user={user}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      {activeTab === 0 && <SuspectInfo suspectCard={suspectCard} />}
      {[1, 2, 3].includes(activeTab) && (
        <InstructionsDisplay instructionsSet={activeTab - 1} />
      )}
    </div>
  );
};

const LoadingIndicator = () => (
  <div className="flex-center h-40">
    <span className="loading loading-ring loading-lg scale-150"></span>
  </div>
);

const DashboardHeader = ({ user, setActiveTab, activeTab }) => (
  <div className="INTRO flex-col-tl gap-8 w-full">
    <h1 className="text-3xl font-bold">Suspect Dashboard</h1>
    <p className="text-2xl font-bold flex items-end gap-2">
      <span>Welcome,</span>
      <span className="text-secondary">{user?.name}!</span>
    </p>
    <div className="tabs tabs-boxed w-full">
      {["Suspect", "Rd. 1", "Rd. 2", "Rd. 3"].map((tab, idx) => (
        <a
          key={tab}
          onClick={() => setActiveTab(idx)}
          className={cn(
            "tab tab-lg",
            idx === activeTab && "tab-active text-accent"
          )}
        >
          {tab}
        </a>
      ))}
    </div>
  </div>
);

const InstructionsDisplay = ({ instructionsSet }) => {
  const instructionsData = useQuery(
    api.suspect_instructions.getFromUserSession
  );
  const instructions = instructionsData?.instructions;
  const rdInstructions = instructions?.[instructionsSet];

  return rdInstructions ? (
    <div className="INSTRUCTIONS_DISPLAY flex-col-tl gap-4 full">
      <h4 className="text-xl font-bold">
        Round - {rdInstructions.round_number}: Instructions
      </h4>
    </div>
  ) : null;
};

const SuspectInfo = ({ suspectCard }) => (
  <div className="USER_INFO flex-col-tl gap-4">
    <h2 className="card-title flex gap-2">
      <span>Your Character is:</span>
      <span className="text-error">{suspectCard?.suspect_name}</span>
    </h2>
    <div
      className={cn(
        "badge badge-outline p-2",
        suspectCard?.is_guilty ? "badge-error" : "badge-success"
      )}
    >
      {suspectCard?.is_guilty ? "Guilty" : "Not Guilty"}
    </div>
    <p className="font-normal">{suspectCard?.bio}</p>
  </div>
);

export default SuspectDashboard;
