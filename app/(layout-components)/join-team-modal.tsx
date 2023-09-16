import React from "react";

interface JoinTeamModalProps {
  teams: any[] | null; // Ideally, define a Team type
  activeModal: string | null;
  hideModal: () => void;
}

export const JoinTeamModal: React.FC<JoinTeamModalProps> = ({
  teams,
  activeModal,
  hideModal,
}) => {
  if (activeModal !== "join-team-modal") {
    return null;
  }

  return (
    <div className="flex-col-tl bg-black gap-4 !fixed w-screen h-screen z-10 inset-0 p-4">
      <button
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={hideModal}
      >
        &times;
      </button>
      <h3 className="font-bold text-lg">Available Teams</h3>
      {teams && teams.length > 0 && (
        <ul className=" flex-col-tl gap-4 w-full overflow-scroll">
          {teams.map((team) => (
            <li
              key={team.team_name}
              className="flex items-center justify-between p-4 bg-slate-800 gap-2 w-full rounded-md"
            >
              <span className="font-semibold">{team.team_name}</span>
              <button className="btn btn-primary">Join</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
