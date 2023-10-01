import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query(async ({ db }) => {
  return await db.query('suspects').collect()
})

export const getBySuspectId = query({
  args: {
    suspect_id: v.id("suspects"),
  },
  handler: async ({ db }, { suspect_id }) => {
  return await db.get(suspect_id)
}})
