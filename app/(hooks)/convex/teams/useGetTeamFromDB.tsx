"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const getTeamFromDB = async (team_id: string) => {
  return await axios.post("/api/team/get", { team_id: team_id });
};

export const useGetTeamFromDB = (team_id: string | null | undefined) => {
  const [team, setTeam] = useState<IConvexTeam>(Object);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (team_id) {
      (async () => {
        try {
          const res = await getTeamFromDB(team_id);

          console.log("_____res from get team hook_____: ", res);

          const foundConvexTeam = res.data.team;

          if (!foundConvexTeam) throw Error("Could not find team!");

          setTeam(foundConvexTeam);
        } catch (error: any) {
          console.error("error: ", error);
          setError(error?.message);
        }
      })();
    }
  }, [team_id]);

  return team;
};
