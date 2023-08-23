import { query, mutation } from './_generated/server'
import { v } from "convex/values";


export const create = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    team: v.string(),
    user_id: v.string(),
  },
  handler: async ({ db }, args) => {
    const user = await db.insert('users', {
      ...args
    })

    return user;
  }
})

export const get = query(async ({ db }) => {
  return await db.query("users").collect()
}) 

export const getById = query({
  args: { user_id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .filter(user => user.eq(user.field("user_id"), args.user_id))
      .first()
  }
})