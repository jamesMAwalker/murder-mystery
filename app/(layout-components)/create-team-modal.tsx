import React, { useState, useRef, useEffect } from "react";
import { useCreateTeamInDB } from "../(hooks)/convex/teams/useCreateTeamInDB";
import { useUserContext } from "../(context)/user.context";

interface CreateTeamModalProps {
  activeModal: string | null;
  hideModal: () => void;
  setLoggedUser: React.Dispatch<React.SetStateAction<IConvexUser | null>>;
}

export const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  activeModal,
  hideModal,
  setLoggedUser,
}) => {
  const [teamName, setTeamName] = useState("");
  const modalRef = useRef<HTMLInputElement | null>(null);
  const { createTeam } = useCreateTeamInDB();
  const { user: convexUser } = useUserContext();
  console.log("user: ", convexUser);

  useEffect(() => {
    if (activeModal === "create-team-modal") {
      modalRef.current?.focus();
    }
  }, [activeModal]);

  const handleTeamNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  const handleCreateTeamSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!convexUser?._id) return;

    createTeam(teamName, convexUser._id);

    const updatedUser = { ...convexUser, has_team: true, team_name: teamName };

    setLoggedUser(updatedUser);
    setTeamName("");
    hideModal();
  };

  if (activeModal !== "create-team-modal" || !convexUser) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-start h-full bg-black !fixed w-screen h-screen z-10 inset-0 p-4">
      {convexUser && (
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
      )}
    </div>
  );
};
