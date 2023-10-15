"use client";

import React, { useState, useRef, useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react-internal";
import { ModalWrapper } from "./modal-wrapper";

interface CreateTeamModalProps {
  closeModal: () => void;
}

export const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  closeModal,
}) => {
  const user = useQuery(api.users.getFromSession);
  const createTeam = useMutation(api.teams.createFromSession);
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLInputElement | null>(null);

  const handleTeamNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if (newName.length <= 20) {
      setTeamName(newName);
      setError("");
    } else {
      setError("Team name is too long. Keep it under 20 characters.");
    }
  };

  const handleCreateTeamSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?._id) return;

    if (teamName.length > 20) {
      setError("Team name is too long. Keep it under 20 characters.");
      return;
    }

    createTeam({ team_name: teamName, user_id: user._id });
    closeModal();
  };

  if (!user) {
    return null;
  }

  return (
    <ModalWrapper>
      {user && (
        <div>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            &times;
          </button>
          <h3 className="font-bold text-xl mb-4">Create a Team</h3>
          <div>
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
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
              <div className="modal-action">
                <button className="btn btn-primary text-lg" type="submit">
                  Create Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModalWrapper>
  );
};
