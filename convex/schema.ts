import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    user_id: v.string(),
    name: v.string(),
    email: v.string(),
    has_team: v.boolean(),
    is_captain: v.boolean(),
    team_id: v.union(v.string(), v.null()),
    team_name: v.union(v.string(), v.null()),
  }),
  teams: defineTable({
    team_captain: v.string(),
    team_name: v.string(),
    members: v.array(v.id('users'))
  }),
  invitations: defineTable({
    invited_user_id: v.id('users'),
    inviting_team_id: v.id('teams'),
    accepted: v.boolean()
  }),
  requests: defineTable({
    requesting_user_id: v.id('users'),
    requested_team_id: v.id('teams'),
    accepted: v.boolean()
  }),
  suspects: defineTable({
    age: v.string(),
    bio: v.string(),
    gender: v.string(),
    home_country: v.string(),
    image_url: v.union(v.string(), v.null()),
    is_guilty: v.boolean(),
    occupation: v.string(),
    suspect_name: v.string(),
    user_id: v.union(v.string(), v.null()),
  }),
  notes: defineTable({
    note: v.string(),
    suspect_id: v.id("suspects"),
    suspect_name: v.string(),
    user_id: v.id("users"),
    user_name: v.string(),
  }),
});