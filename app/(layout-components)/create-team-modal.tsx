import React, { useState, useRef, useEffect } from "react";
import { useCreateTeamInDB } from "../(hooks)/convex/teams/useCreateTeamInDB";
import { useUserContext } from "../(context)/user.context";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react-internal";

interface CreateTeamModalProps {
  closeModal: () => void;
}

export const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  closeModal,
}) => {
  const user = useQuery(api.users.getFromSession);
  const teams = useQuery(api.teams.getAll);
  const [teamName, setTeamName] = useState("");
  console.log("teamName: ", teamName);
  const modalRef = useRef<HTMLInputElement | null>(null);

  // useEffect(() => {
  //   if (activeProfileModal === "create-team-modal") {
  //     modalRef.current?.focus();
  //   }
  // }, [activeProfileModal]);

  const handleTeamNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  const handleCreateTeamSubmit = () => {
    if (!user?._id) return;
  };

  // const handleCreateTeamSubmit = async (
  //   e: React.FormEvent<HTMLFormElement>
  // ) => {
  //   e.preventDefault();
  //   if (!user?._id) return;

  //   createTeam(teamName, loggedUser._id);

  //   const updatedUser = { ...loggedUser, has_team: true, team_name: teamName };

  //   setLoggedUser(updatedUser);
  //   setTeamName("");
  //   hideProfileModal();
  // };

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-start h-full bg-black !fixed w-screen h-screen z-10 inset-0 p-4">
      {user && (
        <div className="modal-box bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md mt-20">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>
          <h3 className="font-bold text-xl mb-4">Create a Team</h3>
          <form>
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
