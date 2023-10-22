import { mutation, query } from './_generated/server'
import { v } from "convex/values";

/////////////
// QUERIES //
/////////////

export const getOne = query({
  args: {
    round_id: v.id('phased_rounds'),
  },
  handler: async ({ db }, { round_id }) => {
    return await db.get(round_id)
  }
});

export const getAll = query(async ({ db }) => {
  return await db.query("phased_rounds").collect();
});


export const getActiveRound = query({
  handler: async ({ db }) => {

    // filter for active round.
    const activeRound = await db.query('phased_rounds')
      .filter(round => {
        return round.eq(round.field('active'), true)
      })
      .unique()

    return activeRound;
  }
})

export const getActivePhase = query({
  handler: async ({ db }) => {

    // filter for active round.
    const activeRound = await db.query('phased_rounds')
      .filter(round => {
        return round.eq(round.field('active'), true)
      })
      .unique()

    const activePhase = activeRound?.phases.find(phase => phase.active)

    return activePhase;
  }
})

///////////////
// MUTATIONS //
///////////////

// + ROUNDS + //

// set current round to inactive, next round to active.
export const startNextRound = mutation({
  args: {
    round_id: v.id('phased_rounds'),
  },
  handler: async ({ db }, { round_id }) => {

    // get round by id
    const activeRound = await db.get(round_id)

    if (activeRound?.round_number! >= 4) return;

    // get next round by number
    const nextRound = await db.query('phased_rounds')
      .filter(round => {
        return round.eq(round.field('round_number'), activeRound?.round_number! + 1)
      })
      .unique()

    // set current round to inactive
    db.patch(round_id, {
      active: false,
      completed: true
    })
    // set next round to active
    db.patch(nextRound?._id!, {
      active: true
    })

    // set first phase to active.
    const updatedPhases = nextRound?.phases.map((phase, idx) => {
      return idx === 0 ? { ...phase, active: true } : phase;
    });

    // patch db with new phases.
    db.patch(nextRound?._id!, {
      phases: updatedPhases
    })

    return nextRound;
  }
})


// + PHASES + //

// set current phase to inactive, next round to active.
export const startNextPhase = mutation({
  args: {
    round_id: v.id('phased_rounds'),
    active_phase_id: v.string(),
  },
  handler: async ({ db }, { round_id, active_phase_id }) => {

    const activeRound = await db.get(round_id)
    console.log('activeRound: ', activeRound);

    // set current phase to inactive & next phase to active.
    const updatedPhases = activeRound?.phases.map((phase, idx) => {
      
      const isCurrentPhase = phase.phase_id === active_phase_id

      const hasMultipleRounds = activeRound?.phases.length > 1
      const prevPhaseId = hasMultipleRounds ? activeRound?.phases[idx - 1]?.phase_id : null
      const isNextPhase = prevPhaseId === active_phase_id

      return isCurrentPhase
        ? { ...phase, active: false }
        : isNextPhase
          ? { ...phase, active: true }
          : phase;
    });

    // patch db with new phases.
    db.patch(round_id, {
      phases: updatedPhases
    })
  }
});

// updates the current time of a phase.
export const setPhaseActive = mutation({
  args: {
    round_id: v.id('phased_rounds'),
    phase_id: v.string(),
    is_active: v.boolean()
  },
  handler: async ({ db }, { round_id, phase_id, is_active }) => {

    const activeRound = await db.get(round_id)

    // update phase timer with args.
    const updatedPhases = activeRound?.phases.map(phase => {
      const isPhaseToUpdate = phase.phase_id === phase_id

      return isPhaseToUpdate
        ? { ...phase, active: is_active }
        : phase;

    });

    // patch db with new time.
    db.patch(round_id, {
      phases: updatedPhases
    })
  }
});

// updates the current time of a phase.
export const setPhaseCurrentTime = mutation({
  args: {
    round_id: v.id('phased_rounds'),
    phase_id: v.string(),
    new_time: v.float64(),
  },
  handler: async ({ db }, { round_id, phase_id, new_time }) => {

    const activeRound = await db.get(round_id)

    // update phase timer with args.
    const updatedPhases = activeRound?.phases.map(phase => {
      const isPhaseToUpdate = phase.phase_id === phase_id

      return isPhaseToUpdate
        ? { ...phase, phase_current_time: new_time }
        : phase;

    });

    // patch db with new time.
    db.patch(round_id, {
      phases: updatedPhases
    })
  }
});

// sets given phase to complete.
export const setPhaseComplete = mutation({
  args: {
    round_id: v.id('phased_rounds'),
    phase_id: v.string(),
  },
  handler: async ({ db }, { round_id, phase_id }) => {

    const activeRound = await db.get(round_id)

    if (!activeRound) throw new Error('Error finding round!')

    // create new phases with current phase set to complete.
    const updatedPhases = activeRound?.phases.map(phase => {
      const phaseToUpdate = phase.phase_id === phase_id

      return phaseToUpdate
        ? { ...phase, completed: true, active: false }
        : phase;

    });

    // update in db.
    db.patch(activeRound._id, {
      phases: updatedPhases
    })
  }
});