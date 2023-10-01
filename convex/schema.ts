import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  clues: defineTable({
    content: v.string(),
    order: v.float64(),
    released: v.boolean(),
    title: v.string(),
  }),
  game: defineTable({
    concluded: v.boolean(),
    guilty_suspect_id: v.id("suspects"),
    guilty_suspect_name: v.string(),
    votes_locked: v.boolean(),
  }),
  guesses: defineTable({
    guesses: v.array(v.id("suspects")),
    suspect_guess_id: v.union(v.id("suspects"), v.null()),
    suspect_guess_name: v.union(v.string(), v.null()),
    team_id: v.id("teams"),
    team_name: v.string(),
  }),
  invitations: defineTable({
    accepted: v.boolean(),
    invited_user_id: v.id("users"),
    inviting_team_id: v.id("teams"),
  }),
  notes: defineTable({
    note: v.string(),
    suspect_id: v.id("suspects"),
    suspect_name: v.string(),
    user_id: v.id("users"),
    user_name: v.string(),
  }),
  requests: defineTable({
    accepted: v.boolean(),
    requested_team_id: v.id("teams"),
    requesting_user_id: v.id("users"),
  }),
  rounds: defineTable({
    phases: v.array(
      v.object({
        active: v.boolean(),
        completed: v.boolean(),
        phase_ending_time: v.float64(),
        phase_starting_time: v.float64(),
        phase_title: v.string(),
      })
    ),
    round_number: v.float64(),
  }),
  suspects: defineTable({
    age: v.string(),
    bio: v.string(),
    gender: v.string(),
    home_country: v.string(),
    image_url: v.string(),
    is_guilty: v.boolean(),
    occupation: v.string(),
    suspect_name: v.string(),
    user_id: v.null(),
  }),
  teams: defineTable({
    members: v.array(v.id("users")),
    team_captain: v.id("users"),
    team_name: v.string(),
  }),
  user_guesses: defineTable({
    user_name: v.string(),
    user_id: v.id("users"),
    suspect_guess_id: v.id("suspects"),
    suspect_guess_name: v.string(),
    user_team_id: v.id("teams"),
  }),
  users: defineTable({
    email: v.string(),
    has_team: v.boolean(),
    is_captain: v.boolean(),
    name: v.string(),
    team_id: v.union(v.id("teams"), v.null()),
    team_name: v.union(v.null(), v.string()),
    user_id: v.string(),
  }),
});