"use client"; // This indicates that the component is intended to be client-side only.
import React from "react";
import { useModal, ModalType } from "../(context)/modal.context";
import { JoinTeamModal } from "./join-team-modal";
import { CreateTeamModal } from "./create-team-modal";
import { AddMemberModal } from "./add-member-modal";
import { LeaveTeamModal } from "./leave-team-modal";
import { EvidenceModal } from "./evidence-modal";

export function ModalsRenderer() {
  const { modalType, modalPayload, closeModal } = useModal();
  console.log("modalPayload: ", modalPayload);
  console.log("modalType: ", modalType);

  if (modalType === ModalType.JOIN) {
    return <JoinTeamModal closeModal={closeModal} />;
  }

  if (modalType === ModalType.CREATE) {
    return <CreateTeamModal closeModal={closeModal} />;
  }

  if (modalType === ModalType.ADD) {
    return <AddMemberModal closeModal={closeModal} />;
  }

  if (modalType === ModalType.LEAVE) {
    return <LeaveTeamModal closeModal={closeModal} />;
  }

  if (modalType === ModalType.EVIDENCE) {
    return <EvidenceModal report={modalPayload} closeModal={closeModal} />;
  }

  return null; // No modal to render.
}
