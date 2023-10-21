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

export const startGame = mutation({
  handler: async ({ db }) => {
    const game = await db.query("game").unique();

    // set all rounds to inactive
    if (!game?._id) throw Error('Game object not found!');

    // ensure game is not concluded.
    db.patch(game?._id, {
      concluded: false
    })

    // get rounds.
    const rounds = await db.query("phased_rounds").collect();

    // set all rounds to inactive
    rounds.forEach(round => {
      db.patch(round._id, {
        active: false
      })
    })

    // set first round to active.
    db.patch(rounds[0]._id, {
      active: true
    })
   
    // set first phase to active.
    const updatedPhases = rounds[0].phases.map((phase, idx) => {
      return idx === 0 ? { ...phase, active: true } : phase
    })

    db.patch(rounds[0]._id, {
      active: true,
      phases: updatedPhases
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
    const rounds = await db.query("phased_rounds").collect();

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
    const rounds = await db.query("phased_rounds").collect();

    // reset phases.
    const roundsWithResetPhases = rounds.map(round => {
      const updatedPhases = round.phases.map(phase => {
        return {
         ...phase,
          active: false,
          completed: false
        }
      })

      return {
        ...round,
        phases: updatedPhases
      }
    })

    // set all rounds and phases to inactive
    rounds.forEach((round, idx) => {
      db.patch(round._id, {
        active: false,
        completed: false,
        phases: roundsWithResetPhases[idx].phases
      })
    })
  }
})


