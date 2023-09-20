import React, { useState, useRef, useEffect } from "react";
import { useCreateTeamInDB } from "../(hooks)/convex/teams/useCreateTeamInDB";
import { useUserContext } from "../(context)/user.context";

interface CreateTeamModalProps {
  activeModal: string | null;
  hideModal: () => void;
  setHasTeam: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  activeModal,
  hideModal,
  setHasTeam,
}) => {
  const { user: convexUser } = useUserContext();
  const [teamName, setTeamName] = useState("");
  const modalRef = useRef<HTMLInputElement | null>(null);
  const { createTeam, team } = useCreateTeamInDB();

  useEffect(() => {
    if (activeModal === "create-team-modal") {
      modalRef.current?.focus(); // Auto-focus the input on modal open
    }
  }, [activeModal]);

  const handleTeamNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  const handleCreateTeamSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // TODO: create team logic
    e.preventDefault();

    // send create team request to convex db
    createTeam(teamName, convexUser?._id);
    setHasTeam(true);

    // reset team name state and hide modal
    setTeamName("");
    hideModal();
  };

  if (activeModal !== "create-team-modal") {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-start h-full bg-black !fixed w-screen h-screen z-10 inset-0 p-4">
      <div className="modal-box bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md mt-20">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={hideModal}
        >
          ✕
        </button>
        <h3 className="font-bold text-xl mb-4">Create a Team</h3>
        <form onSubmit={handleCreateTeamSubmit}>
          <div className="form-control w-full mb-4">
            <label className="label text-lg mb-2">
              <span className="label-text">What is your team name?</span>
            </label>
            <input
              type="text"
              placeholder="Team Name"
              value={teamName}
              className="input input-bordered w-full text-lg"
              onChange={handleTeamNameInput}
              ref={modalRef}
            />
          </div>
          <div className="modal-action">
            <button className="btn btn-primary text-lg" type="submit">
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
