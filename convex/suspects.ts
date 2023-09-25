import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query(async ({ db }) => {
  return await db.query('suspects').collect()
})