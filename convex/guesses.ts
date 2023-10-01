import { mutation, query } from './_generated/server'
import { v } from "convex/values";
import { getUserFromAuthSession } from './lib/getUserFromAuthSession';
import { Id } from './_generated/dataModel';

export const createFromSession = mutation({
  args: {
    suspect_id: v.id("suspects"),
  },
  handler: async (ctx, { suspect_id }) => {
    const { db } = ctx;

    // get user from db using clerk auth session.
    const user = await getUserFromAuthSession(ctx);

    // error check.
    if (!user) throw Error('Error finding user!');

    // get team id from user.
    const teamId = user?.team_id!;

    const team = await db.get(teamId as Id<'teams'>);

    // error check.
    if (!team) throw Error('Error finding team!');

    // get team guess object using team id.
    const guess = await db
      .query("guesses")
      .filter((guess) =>
        guess.eq(guess.field("team_id"), team?._id)
      )
      .unique();

    if (!guess?._id) throw Error('Error finding guess!');

    // add guess to guesses array.
    db.patch(guess?._id, {
      guesses: [...guess?.guesses, suspect_id]
    })

    const updatedGuess = await db.get(guess?._id);

    // count frequency of suspects in guesses (votes).
    const votes: { [key: Id<'suspects'>]: number } = {};

    updatedGuess?.guesses?.forEach((guessId) => {
      votes[guessId] = votes[guessId] || 0;
      votes[guessId] += 1;
    })

    // get id with most votes
    const sortedVotes = Object.entries(votes).sort((a, b) => b[1] - a[1]);
    const mostVotedSuspectId = sortedVotes[0][0];

    // set team guess to most voted suspect.
    db.patch(guess?._id, {
      suspect_guess_id: mostVotedSuspectId as Id<'suspects'>
    })

    return await db.get(guess?._id);
  },
});

export const retractGuessFromSession = mutation({
  args: {
    suspect_id: v.id("suspects"),
  },
  handler: async (ctx, { suspect_id }) => {
    const { db } = ctx;

    // get user from db using clerk auth session.
    const user = await getUserFromAuthSession(ctx);

    // error check.
    if (!user) throw Error('Error finding user!');

    // get team id from user.
    const teamId = user?.team_id!;

    const team = await db.get(teamId as Id<'teams'>);

    // error check.
    if (!team) throw Error('Error finding team!');

    // get team guess object using team id.
    const guess = await db
      .query("guesses")
      .filter((guess) =>
        guess.eq(guess.field("team_id"), team?._id)
      )
      .unique();

    if (!guess?._id) throw Error('Error finding guess!');

    // remove guess from guesses array.
    db.patch(guess?._id, {
      guesses: guess?.guesses.filter((guessId) => guessId !== suspect_id)
    })

    // get updated guess object.
    const updatedGuess = await db.get(guess?._id);

    // count frequency of suspects in guesses (votes).
    const votes: { [key: Id<'suspects'>]: number } = {};

    updatedGuess?.guesses?.forEach((guessId) => {
      votes[guessId] = votes[guessId] || 0;
      votes[guessId] += 1;
    })

    // get id with most votes
    const sortedVotes = Object.entries(votes).sort((a, b) => b[1] - a[1]);
    const mostVotedSuspectId = sortedVotes[0][0];

    // set team guess to most voted suspect.
    db.patch(guess?._id, {
      suspect_guess_id: mostVotedSuspectId as Id<'suspects'>
    })

    return await db.get(guess?._id);
  },
});

export const getFromSessionByTeam = query({
  handler: async (ctx) => {
    const { db } = ctx;

    // get user from session.
    const user = await getUserFromAuthSession(ctx);

    // get requests by team id.
    const teamGuess = await db
      .query("guesses")
      .filter((guess) =>
        guess.eq(guess.field("team_id"), user?.team_id as Id<'teams'>)
      )
      .unique();

    console.log('teamGuess: ', teamGuess);

    return teamGuess;
  },
});

export const getFunctionFromSessionByTeam = mutation({
  handler: async (ctx) => {
    const { db } = ctx;

    // get user from session.
    const user = await getUserFromAuthSession(ctx);

    // get requests by team id.
    const teamGuess = await db
      .query("guesses")
      .filter((guess) =>
        guess.eq(guess.field("team_id"), user?.team_id as Id<'teams'>)
      )
      .unique();

    return teamGuess;
  },
});