import { query } from "./_generated/server";
import { v } from "convex/values";
import { getUserFromAuthSession } from "./lib/getUserFromAuthSession";

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


export const getFromUserSession = query({
  handler: async (ctx) => {
    const { db } = ctx;

    // get user.
    const user = await getUserFromAuthSession(ctx);

    // get suspect character information.
    const suspectCard = await db
      .query("suspects")
      .filter((suspect) =>
        suspect.eq(suspect.field("user_id"), user?._id),
      )
      .unique();

    return suspectCard;
  }
})