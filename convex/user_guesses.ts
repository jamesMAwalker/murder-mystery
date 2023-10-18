import { mutation, query } from './_generated/server'
import { v } from "convex/values";
import { getUserFromAuthSession } from './lib/getUserFromAuthSession';
import { Id } from './_generated/dataModel';

export const createOrUpdateFromSession = mutation({
  args: {
    suspect_id: v.id("suspects"),
  },
  handler: async (ctx, { suspect_id }) => {
    const { db } = ctx;

    // get user from session.
    const user = await getUserFromAuthSession(ctx);

    // get team guess by user's team id.
    const teamGuess = await db
      .query("guesses")
      .filter((guess) =>
        guess.eq(guess.field("team_id"), user?.team_id)
      )
      .unique();

    // check if user guess already exists.
    const userGuess = await db
      .query("user_guesses")
      .filter((guess) =>
        guess.eq(guess.field("user_id"), user?._id as Id<'users'>)
      )
      .unique();

    // if user guess exists, update with new suspect guess.
    if (userGuess?._id) {
      db.patch(userGuess?._id, {
        suspect_guess_id: suspect_id
      })


      // * handle updating team guess *  //

      // get all guesses for user's team.
      const teamGuesses = await db
        .query('user_guesses')
        .filter((guess) =>
          guess.eq(guess.field('user_team_id'), user?.team_id as Id<'teams'>)
        )
        .collect()
      
      // update team guess array with new suspect guess.
      db.patch(teamGuess?._id!, {
        guesses: teamGuesses.map((guess) => guess.suspect_guess_id)
      })

      // pull latest version of team guess
      const updatedGuess = await db.get(teamGuess?._id!);

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
      db.patch(teamGuess?._id!, {
        suspect_guess_id: mostVotedSuspectId as Id<'suspects'>
      })
    }

    // if user guess doesn't exist, create new user guess.
    if (!userGuess?._id) {
      db.insert("user_guesses", {
        user_name: user?.name!,
        user_id: user?._id as Id<'users'>,
        suspect_guess_id: suspect_id,
        suspect_guess_name: (await db.get(suspect_id))?.suspect_name!,
        user_team_id: user?.team_id!,
      })


      // * handle updating team guess * //
      
      // get all guesses for user's team.
      const teamGuesses = await db
        .query('user_guesses')
        .filter((guess) =>
          guess.eq(guess.field('user_team_id'), user?.team_id as Id<'teams'>)
        )
        .collect()

      // update team guess array with new suspect guess.
      db.patch(teamGuess?._id!, {
        guesses: teamGuesses.map((guess) => guess.suspect_guess_id)
      })

      // pull latest version of team guess
      const updatedGuess = await db.get(teamGuess?._id!);

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
      db.patch(teamGuess?._id!, {
        suspect_guess_id: mostVotedSuspectId as Id<'suspects'>
      })
    }
  }
});

export const getFromSessionByUser = query({
  handler: async (ctx) => {
    const { db } = ctx;

    // get user from session.
    const user = await getUserFromAuthSession(ctx);

    // get user guess object.
    const userGuess = await db
      .query('user_guesses')
      .filter((guess) => guess.eq(guess.field('user_id'), user?._id))
      .unique()

    return userGuess;
  },
});
