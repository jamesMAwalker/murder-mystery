import { mutation, query } from './_generated/server'
import { v } from "convex/values";
import { getUserFromAuthSession } from './lib/getUserFromAuthSession';

export const updateTimer = mutation({
  args: {
    round_id: v.id('rounds'),
    new_time: v.float64()
  },
  handler: async ({ db }, { round_id, new_time }) => {

    // update round with new remaining time value.
    db.patch(round_id, {
      remaining_time: new_time
    })

    return await db.get(round_id)
  }
})

export const updateActive = mutation({
  args: {
    round_id: v.id('rounds'),
  },
  handler: async ({ db }, { round_id }) => {
    const rounds = await db.query("rounds").collect();

    // set all other rounds to inactive
    rounds.forEach(round => {
      if (round._id !== round_id) {
        db.patch(round._id, {
          active: false
        })
      } else {
        db.patch(round_id, {
          active: true
        })
      }
    })

    return await db.get(round_id)
  }
})

export const endRounds = mutation({
  handler: async ({ db }) => {
    const rounds = await db.query("rounds").collect();

    // set all rounds to inactive
    rounds.forEach(round => {
      db.patch(round._id, {
        active: false
      })
    })
  }
})

export const resetRounds = mutation({
  handler: async ({ db }) => {

    // collect rounds.
    const rounds = await db.query('rounds').collect()

    // filter for 1st round.
    const roundZero = await db.query('rounds')
      .filter(round => {
        return round.eq(round.field('round_number'), 0)
      })
      .unique()

    // error if not found.
    if (!roundZero?._id) throw Error('Error resetting!');

    // set all other rounds to inactive
    rounds.forEach(round => {
      if (round._id !== roundZero._id) {
        db.patch(round._id, {
          active: false
        })
      } else {
        db.patch(roundZero._id, {
          active: true
        })
      }
    })


  }
})


export const getAll = query(async ({ db }) => {
  return await db.query("rounds").collect();
});


export const getActive = query({
  handler: async ({ db }) => {
    const rounds = await db.query("rounds").collect();

    // filter for active round.
    const activeRound = await db.query('rounds')
      .filter(round => {
        return round.eq(round.field('active'), true)
      })
      .unique()

    return activeRound;
  }
})
