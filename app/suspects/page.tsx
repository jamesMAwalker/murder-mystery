// @ts-nocheck
"use client";

import { useRef, useState } from "react";
import { useQuery } from "convex/react-internal";
import { useRouter } from "next/navigation";
import { useSelectedSuspect } from "../(context)/suspect.context";
import { SUSPECTS_DATA } from "./data";
import { ISuspectCard } from "./types";
import { api } from "@/convex/_generated/api";

const SuspectsPage = () => {
  const modalRef = useRef(null);
  const { heading } = SUSPECTS_DATA;
  const { push } = useRouter();

  const [modalContent, setModalContent] = useState<ISuspectCard | null>(null);
  const { selectedSuspectId, setSelectedSuspectId } = useSelectedSuspect();
  console.log("selectedSuspectId: ", selectedSuspectId);

  const handleSuspectClick = (id: string) => {
    const suspect = suspects.find((s) => s._id === id);
    console.log("suspect: ", suspect);
    setModalContent(suspect);
    setSelectedSuspectId(id);
    modalRef.current.showModal();
  };

  const handleCloseModal = () => {
    modalRef.current.close();
  };

  const handleSuspectNotesClick = (suspect_id: any) => {
    console.log("suspect_id: ", suspect_id);
    push("/notes");
  };

  const suspects = useQuery(api.suspects.getAll);
  console.log("suspects: ", suspects);

  return (
    <div className="full flex-col-tl gap-8">
      <h1 className="text-2xl uppercase mt-4">{heading}</h1>
      <ul className="SUSPECT_LIST z-10 full grid grid-cols-2 auto-rows-auto gap-[15px]">
        {suspects?.map((suspect: any, idx: number) => {
          return (
            <li
              key={suspect._id}
              className="SUSPECT_ITEM full flex-col-bl"
              onClick={() => handleSuspectClick(suspect._id)}
            >
              <div className="w-full aspect-square relative">
                <img
                  className="absolute rounded-t-md full object-cover"
                  src={suspect.image_url}
                  alt={suspect.suspect_name}
                />
              </div>
              <button className="btn w-full rounded-t-none btn-secondary">
                {suspect.suspect_name}
              </button>
            </li>
          );
        })}
      </ul>
      <dialog
        className="SUSPECT_MODAL modal !top-[10%] !flex flex-col-center !h-[min-content] isolate"
        ref={modalRef}
      >
        <button
          onClick={handleCloseModal}
          className="z-[1000] bg-white text-black btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
        >
          ✕
        </button>
        <div className="card w-full glass">
          <figure>
            <img
              src={modalContent?.image_url}
              alt={modalContent?.suspect_name}
              className="object-cover aspect-square"
            />
          </figure>
          <div className="card-body gap-4 max-h-[30vh] overflow-y-scroll">
            <h2 className="card-title">{modalContent?.suspect_name}</h2>
            <p>{modalContent?.bio}</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => {
                  console.log("modalContent: ", modalContent);
                  handleSuspectNotesClick(modalContent._id);
                }}
              >
                Take Notes{" "}
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SuspectsPage;
