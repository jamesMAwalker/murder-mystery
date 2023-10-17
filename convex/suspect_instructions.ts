import { query } from "./_generated/server";
import { v } from "convex/values";

export const getByUserId = query({
  args: {
    instructions_id: v.id("suspect_instructions"),
  },
  handler: async ({ db }, { instructions_id }) => {
    return await db.get(instructions_id)
  }
})
