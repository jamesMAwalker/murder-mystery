"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

const ReportsPage = () => {
  return (
    <div className="flex-col-tl lg:h-full gap-16">
      <div className="INTRO flex-col-tl gap-2">
        <h1 className="text-2xl font-bold text-warning">Evidence Reports Page</h1>
        <p>
          As the investigation continues, new evidence will come to light,
          giving you further clues about who may be the perpetrator.
          <br />
          Come back to this page whenever a new report notification appears!
        </p>
      </div>
      <ReportsSection />
    </div>
  );
};

export default ReportsPage;

function ReportsSection() {
  /*
    * Precedence Communication *
    # We want users to be able to tell when a report is new - add a badge when a report is the most recently  released.
    # We should also ensure that the most recent report is listed at top. Use the order property to sort the list of reports.
  */

  const reports = useQuery(api.clues.getAll);
  console.log("reports: ", reports);
  const releasedReports = reports?.filter((rep) => rep.released);
  console.log("releasedReports: ", releasedReports);

  // show message if no released reports.
  if (!reports) {
    // Data is still loading
    return (
      <div className="border border-warning rounded-md flex-col-center gap-2 w-full aspect-square">
        <span className="loading loading-ring loading-lg scale-150"></span>
      </div>
    );
  }

  if (releasedReports?.length === 0) {
    // No released reports
    return (
      <div className="border border-warning rounded-md flex-col-center gap-2 w-full aspect-square">
        <h2 className="text-lg font-bold text-warning">
          No released reports yet!
        </h2>
        <p>Check again at the end of the round.</p>
      </div>
    );
  }

  return (
    <ul className="flex-col-tl gap-4">
      <h2 className="text-xl font-bold">Reports</h2>
      {/* sort reports with latest on top */}
      {reports
        ?.sort((ra, rb) => rb.order - ra.order)
        ?.map((report, idx) => {
          // only show released reports.
          if (!report.released) return;

          // const isLatest = idx === 2

          return (
            <li
              className={cn(
                "flex-col-tl p-4 rounded-md gap-4 w-full border border-warning"
                // isLatest && '!border-accent'
              )}
              key={report?._id}
            >
              <div className="TEXT_CONTENT flex-col-tl gap-2">
                <label
                  className={cn(
                    "text-warning text-sm tracking-widest uppercase"
                    // isLatest && '!text-accent'
                  )}
                >
                  Report #{report.order}
                </label>
                <h4 className="font-bold text-lg">{report.title}</h4>
                <p>{report.content}</p>
              </div>
            </li>
          );
        })}
    </ul>
  );
}
