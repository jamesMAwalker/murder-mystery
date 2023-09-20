import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    user_id: v.string(),
    name: v.string(),
    email: v.string(),
    has_team: v.boolean(),
    team_id: v.null(),
    team_name: v.null(),
  },
  handler: async ({ db }, args) => {
    // check if email exists in db.
    const existingUser = await db
      .query("users")
      .filter((user) => user.eq(user.field("email"), args.email))
      .unique();

    if (existingUser) throw Error("Email already in use!");

    // check if id exists in db.
    const existingId = await db
      .query("users")
      .filter((user) => user.eq(user.field("user_id"), args.user_id))
      .unique();

    if (existingId) throw Error("User already exists!");

    // create user.
    const user = await db.insert("users", {
      ...args,
    });

    return user;
  },
});

export const getAll = query(async ({ db }) => {
  return await db.query("users").collect();
});

export const getById = query({
  args: { user_id: v.string() },
  handler: async ({ db }, args) => {
    return await db
      .query("users")
      .filter((user) => user.eq(user.field("user_id"), args.user_id))
      .unique();
  },
});
