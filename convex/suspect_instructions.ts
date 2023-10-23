import { query } from "./_generated/server";
import { getUserFromAuthSession } from "./lib/getUserFromAuthSession";

export const getFromUserSession = query({
  handler: async (ctx) => {
    const { db } = ctx;

    // get user.
    const user = await getUserFromAuthSession(ctx);

    const instructions = await db
      .query("suspect_instructions")
      .filter((instruction) =>
        instruction.eq(instruction.field("user_id"), user?._id),
      )
      .unique();

    return instructions;
  }
})
