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
  notes: defineTable({
    note: v.string(),
    suspect_id: v.id("suspects"),
    suspect_name: v.string(),
    user_id: v.id("users"),
    user_name: v.string(),
  }),
  phased_rounds: defineTable({
    active: v.boolean(),
    completed: v.boolean(),
    phases: v.array(
      v.object({
        active: v.boolean(),
        completed: v.boolean(),
        phase_current_time: v.float64(),
        phase_id: v.optional(v.string()),
        phase_starting_time: v.float64(),
        phase_title: v.string(),
        phase_type: v.optional(v.string()),
      })
    ),
    round_number: v.float64(),
  }),
  requests: defineTable({
    accepted: v.boolean(),
    requested_team_id: v.id("teams"),
    requesting_user_id: v.id("users"),
  }),
  rounds: defineTable({
    active: v.boolean(),
    completed: v.boolean(),
    remaining_time: v.float64(),
    round_number: v.float64(),
    starting_time: v.float64(),
  }),
  suspect_instructions: defineTable({
    instructions: v.array(
      v.object({
        donts: v.array(v.string()),
        dos: v.array(v.string()),
        general_instructions: v.string(),
        round_number: v.float64(),
        target_suspect: v.string(),
      })
    ),
    suspect_id: v.id("suspects"),
    suspect_name: v.string(),
    user_id: v.id("users"),
    user_name: v.string(),
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
    user_id: v.union(v.id('users'), v.null()),
  }),
  teams: defineTable({
    members: v.array(v.id("users")),
    team_captain: v.union(v.id("users"), v.null()),
    team_name: v.string(),
  }),
  user_guesses: defineTable({
    suspect_guess_id: v.union(v.id("suspects"), v.null()),
    suspect_guess_name: v.union(v.string(), v.null()),
    user_id: v.id("users"),
    user_name: v.string(),
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
    role: v.string()
  }),
});