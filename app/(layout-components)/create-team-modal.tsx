import React from "react";

interface CreateTeamModalProps {
  activeModal: string | null;
  hideModal: () => void;
}

export const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  activeModal,
  hideModal,
}) => {
  if (activeModal !== "create-team-modal") {
    return null;
  }

  return (
    <div className="flex-col-tl bg-black gap-4 !fixed w-screen h-screen z-10 inset-0 p-4">
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={hideModal}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Create a Team</h3>
        <p>Lorem ipsum dolor sit...</p>
        {/* You can add more input fields and logic related to creating a team */}
      </div>
    </div>
  );
};
