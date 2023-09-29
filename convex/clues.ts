import { mutation, query } from './_generated/server'
import { v } from "convex/values";

export const getAll = query(async ({ db }) => {
  return await db.query("clues").collect();
});

export const release = mutation({
  args: {
    clue_id: v.id('clues'),
  },
  handler: async ({ db }, { clue_id }) => {

    db.patch(clue_id, {
      released: true
    })

    return await db.get(clue_id)
  }
})

export const retract = mutation({
  args: {
    clue_id: v.id('clues'),
  },
  handler: async ({ db }, { clue_id }) => {

    db.patch(clue_id, {
      released: false
    })

    return await db.get(clue_id)
  }
})