"use client";

import React, { use } from "react";
import { useQuery, useMutation } from "convex/react";
import { useModal, ModalType } from "../(context)/modal.context";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface Report {
  _id: Id<"clues">;
  order: number;
  title: string;
  content: string;
  released: boolean;
  _creationTime: number;
}

export function ReportSection() {
  const reports = useQuery(api.clues.getAll);

  const { showModal } = useModal();

  const handleEvidenceModal = (report: Report) => {
    showModal(ModalType.EVIDENCE, report);
  };

  console.log("reports: ", reports);
  // useDetectReportRelease();

  // Release
  const releaseReport = useMutation(api.clues.release);
  async function handleReleaseReport(reportId: Id<"clues">) {
    console.log("releasing report...");
    const res = await releaseReport({ clue_id: reportId });
    console.log("release response: ", res);
    handleEvidenceModal(res as Report);
  }

  // Retraction
  const retractReport = useMutation(api.clues.retract);
  async function handleRetractReport(reportId: Id<"clues">) {
    console.log("retracting report...");
    const res = await retractReport({ clue_id: reportId });
    console.log("retract res: ", res);
  }

  return (
    <div className="w-full rounded-md flex-col-tl gap-8">
      <h2 className="text-xl font-bold">Manage Reports</h2>
      <ul className="w-full flex-col-tl gap-4">
        {reports?.map((report) => {
          return (
            <li
              className="flex-col-tl p-4 rounded-md gap-4 w-full border border-warning"
              key={report?._id}
            >
              <div className="TEXT_CONTENT flex-col-tl gap-2">
                <label className="text-warning text-sm tracking-widest uppercase">
                  Report #{report.order}
                </label>
                <h4 className="font-bold text-lg">{report.title}</h4>
                <p>{report.content}</p>
              </div>
              <button
                disabled={report?.released}
                onClick={() => handleReleaseReport(report?._id)}
                className="w-full btn btn-warning"
              >
                Release Report
              </button>
              <button
                disabled={!report?.released}
                onClick={() => handleRetractReport(report?._id)}
                className="w-full btn btn-warning btn-outline"
              >
                Retract Report
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
