import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    team: v.string(),
    user_id: v.string(),
  }),
  teams: defineTable({
    team_name: v.string(),
    members: v.array(v.id('users'))
  })
});