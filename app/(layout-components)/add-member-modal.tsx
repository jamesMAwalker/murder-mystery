import React, { useState } from "react";

interface AddMemberModalProps {
  closeModal: () => void;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  closeModal,
}) => {
  return (
    <div>
      {/* Your modal content here */}
      <button onClick={closeModal}>Close</button>
    </div>
  );
};
