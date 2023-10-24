import React from "react";
import { ModalWrapper } from "./modal-wrapper";

interface EvidenceModalProps {
  report: any;
  closeModal: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  report,
  closeModal,
}) => {
  const abbreviatedContent = report.content.slice(0, 40) + "...";
  console.log(report);

  const handleViewEvidenceClick = () => {
    console.log("handleViewEvidenceClick");
    // redirect to the report page
    window.location.href = "/reports";
    closeModal();
  };

  return (
    <ModalWrapper>
      <button
        className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2 p-2 sm:p-4"
        onClick={closeModal}
      >
        &times;
      </button>

      <div className="flex-col-tl gap-4 p-4 mt-8 rounded-md w-full sm:max-w-lg md:max-w-xl mx-auto border-2 border-warning">
        <div className="INTRO flex-col-tl gap-2">
          <h3 className="text-xl sm:text-2xl font-bold">NEW CLUE AVAILABLE!</h3>
          <p className="text-sm sm:text-base">
            A new piece of evidence has been released. Check it out!
          </p>
        </div>

        <div className="TEXT_CONTENT flex-col-tl gap-2">
          <label className="text-warning text-xs sm:text-sm tracking-widest uppercase">
            Report #{report.order}
          </label>
          <h4 className="font-bold text-base sm:text-lg truncate w-full">
            {report.title}
          </h4>
          <p className="text-xs sm:text-sm">{abbreviatedContent}</p>
        </div>
      </div>
      <button
        className="btn btn-warning w-full mt-4 sm:text-sm md:text-base"
        onClick={() => handleViewEvidenceClick()}
      >
        View Evidence
      </button>
    </ModalWrapper>
  );
};
