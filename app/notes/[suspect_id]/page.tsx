"use client";
import React from "react";

import { useQuery } from "convex/react-internal";
import { api } from "@/convex/_generated/api";

/*
  * Route Approach *
  # For the time being we will use the simpler react state approach to display notes based on which suspect is selected. This should be a little less complicated than routing, so we'll save some time in this round.
  # Later, we can refactor to use routing if needed for improved UX or organization.
*/

import { useRouter } from "next/navigation";

const SuspectNotePage = (props: any) => {
  const router = useRouter();

  console.log("props: ", props);

  // get suspect id from route params.

  // get note from suspect id and auth user.

  // allow display and creation of notes.

  return <div>SuspectNotePage</div>;
};

export default SuspectNotePage;
