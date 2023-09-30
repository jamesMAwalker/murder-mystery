import { mutation, query } from './_generated/server'
import { v } from "convex/values";


export const getGameObject = query({
  handler: async ({ db }) => {
    return await db.query("game").unique();
  }
})

export const lockVoting = mutation({
  handler: async ({ db }) => {
    const game = await db.query("game").unique();

    if (!game?._id) throw Error('Error loading game!')

    db.patch(game?._id, {
      votes_locked: true
    })
  }
})

export const endGame = mutation({
  handler: async ({ db }) => {
    const game = await db.query("game").unique();

    // set all rounds to inactive
    if (!game?._id) throw Error('Game object not found!');

    // set game to concluded.
    db.patch(game?._id, {
      concluded: true
    })

    // get rounds.
    const rounds = await db.query("rounds").collect();
    
    // set all rounds to inactive
    rounds.forEach(round => {
      db.patch(round._id, {
        active: false
      })
    })
  }
})

export const resetGame = mutation({
  handler: async ({ db }) => {
    const game = await db.query("game").unique();

    // set all rounds to inactive
    if (!game?._id) throw Error('Game object not found!');

    // set game to concluded.
    db.patch(game?._id, {
      concluded: false
    })

    // get rounds.
    const rounds = await db.query("rounds").collect();
    
    // set all rounds to inactive
    rounds.forEach(round => {
      db.patch(round._id, {
        active: false
      })
    })
  }
})


