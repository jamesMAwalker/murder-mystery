import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getUserFromAuthSession } from "./lib/getUserFromAuthSession";

export const create = mutation({
  args: {
    user_id: v.string(),
    name: v.string(),
    email: v.string(),
    has_team: v.boolean(),
    is_captain: v.boolean(),
    team_id: v.null(),
    team_name: v.null(),
    role: v.string(),
  },
  handler: async ({ db }, args) => {

    // check if email exists in db.
    const existingUser = await db
      .query("users")
      .filter((user) => user.eq(user.field("email"), args.email))
      .unique();

    // if (existingUser) throw Error("Email already in use!");
    if (existingUser) {
      return { message: 'Existing user found.', user: existingUser }
    }

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

export const getFromSession = query({
  handler: async (ctx) => {

    try {
      // get and return user from session.
      return await getUserFromAuthSession(ctx)
      
    } catch (error: any) {

      // throw error if not found.
      throw new Error('User not found.')
    }
  }
})

export const getByClerkId = query({
  args: { user_id: v.string() },
  handler: async ({ db }, args) => {
    const user = await db
      .query('users')
      .filter(user => user.eq(user.field("user_id"), args.user_id))
      .unique()

    if (!user) throw Error('User not found in database!')

    return user
  }
})

export const getByConvexId = query({
  args: { user_id: v.id('users') },
  handler: async ({ db }, { user_id }) => {
    const user = await db.get(user_id)
    
    if (!user) throw Error('User not found in database!')
    
    return user
  }
})