import React from "react";
import { ModalWrapper } from "./modal-wrapper";

interface EvidenceModalProps {
  closeModal: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({ closeModal }) => {
  return (
    <ModalWrapper>
      <div>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2 p-2"
          onClick={closeModal}
        >
          &times;
        </button>
        <h3 className="font-bold text-xl mb-4 w-[90%]">Evidence</h3>
        <div className="flex items-left justify-left w-full">
          <div>Loading...</div>
        </div>
      </div>
    </ModalWrapper>
  );
};
