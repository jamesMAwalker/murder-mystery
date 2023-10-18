import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getUserFromAuthSession } from "./lib/getUserFromAuthSession";

export const create = mutation({
  args: {
    team_name: v.string(),
    user_id: v.id("users"),
  },
  handler: async ({ db }, { team_name, user_id }) => {
    const user = await db.get(user_id);

    // check if user exists in db.
    if (!user) throw Error("User not found in database!");

    // check if user has a team.
    if (user.has_team) throw Error("User already has a team!");

    // get team.
    const existingTeamName = await db
      .query("teams")
      .filter((team) => team.eq(team.field("team_name"), team_name))
      .unique();

    // check if team name exists in db.
    if (existingTeamName) throw Error("Team name already taken!");

    // TODO: Check if total teams capacity has been reached.

    // Insert team into db.
    const teamId = await db.insert("teams", {
      team_name,
      team_captain: user._id,
      members: [user._id],
    });

    // Update team fields of all added members.
    await db.patch(user._id, {
      is_captain: true,
      has_team: true, 
      team_name,
      team_id: teamId,
    });


    // create guess object for this team.
    await db.insert("guesses", {
      team_name: team_name,
      team_id: teamId,
      guesses: [],
      suspect_guess_id: null,
      suspect_guess_name: null,
    })

    return user;
  },
});

export const createFromSession = mutation({
  args: {
    team_name: v.string(),
    user_id: v.id("users"),
  },
  handler: async (ctx, { team_name, user_id }) => {
    const { db } = ctx;

    // get user.
    const user = await getUserFromAuthSession(ctx);

    // check if user exists in db.
    if (!user) throw Error("User not found in database!");

    // check if user has a team.
    if (user.has_team) throw Error("User already has a team!");

    // get team.
    const existingTeamName = await db
      .query("teams")
      .filter((team) => team.eq(team.field("team_name"), team_name))
      .unique();

    // check if team name exists in db.
    if (existingTeamName) throw Error("Team name already taken!");

    // TODO: Check if total teams capacity has been reached.

    // Insert team into db.
    const teamId = await db.insert("teams", {
      team_name,
      team_captain: user._id,
      members: [user._id],
    });

    // Update team fields of all added members.
    await db.patch(user._id, {
      is_captain: true,
      has_team: true,
      team_name,
      team_id: teamId,
    });

    // create guess object for this team.
    await db.insert("guesses", {
      team_name: team_name,
      team_id: teamId,
      guesses: [],
      suspect_guess_id: null,
      suspect_guess_name: null,
    })

    return user;
  },
});

export const getAll = query(async ({ db }) => {
  return await db.query("teams").collect();
});

export const getFromSession = query(async (ctx) => {
  const { db } = ctx;

  // get user.
  const user = await getUserFromAuthSession(ctx);

  // check if user exists in db.
  if (!user) throw Error("Error finding user!");

  // check if user has a team
  if (!user.has_team) return null;

  // throw Error("User does not have a team!");

  // get the current user's team entry.
  const team = await db
    .query("teams")
    .filter((team) => team.eq(team.field("_id"), user?.team_id))
    .unique();

  // check if team exists
  if (!team) throw Error("Error finding team!");

  return team;
});

export const getByUserId = query({
  args: {
    user_id: v.string(),
  },
  handler: async ({ db }, { user_id }) => {
    // get user.
    const user = await db
      .query("users")
      .filter((user) => user.eq(user.field("user_id"), user_id))
      .unique();

    // check if user exists in db.
    if (!user) throw Error("User not found in database!");

    // check if user has team.
    if (!user.has_team) throw Error("User has no team!");

    // get team.
    const existingTeam = await db
      .query("teams")
      .filter((team) => team.eq(team.field("_id"), user.team_id))
      .unique();

    // check if team exists in db.
    if (!existingTeam) throw Error("Team not found in database!");

    return existingTeam;
  },
});

export const getByTeamId = query({
  args: {
    team_id: v.id("teams"),
  },
  handler: async ({ db }, { team_id }) => {
    const team = await db.get(team_id);

    if (!team) throw Error("Team not found in database!");

    return team;
  },
});

export const addMember = mutation({
  args: {
    team_id: v.id("teams"),
    user_id: v.id("users"),
  },
  handler: async ({ db }, { team_id, user_id }) => {
    // get user.
    const user = await db.get(user_id);

    // check if user exists in db.
    if (!user) throw "User not found in database!";

    // check if user is already attached to a team.
    if (user.has_team) throw "User already on a team!";

    // get team.
    const team = await db.get(team_id);

    // check if team exists.
    if (!team) throw "Error finding team!";

    // check if team has capacity.
    if (team?.members.length >= 10) throw "Team already has max members!";

    // check if user is already on this team.
    if (team.members.includes(user_id)) throw "User is already on this team!";

    // update team.
    await db.patch(team._id, {
      members: [...team.members, user._id],
    });

    // update member
    await db.patch(user._id, {
      has_team: true,
      team_id: team._id,
      team_name: team.team_name,
    });

    const updatedTeam = await db.get(team_id);

    return { team: updatedTeam, message: "Successfully added!" };
  },
});

export const removeMember = mutation({
  args: {
    team_id: v.id("teams"),
    user_id: v.id("users"),
  },
  handler: async ({ db }, { team_id, user_id }) => {
    // get user.
    const user = await db.get(user_id);

    // check if user exists in db.
    if (!user) throw Error("User not found in database!");

    // check if user is already attached to a team.
    if (!user.has_team) throw Error("User has no team!");

    // get team.
    const team = await db.get(team_id);

    // check if team exists.
    if (!team) throw Error("Error finding team!");

    // check if user is already on this team.
    if (!team.members.includes(user_id))
      throw Error("User is not on this team!");

    // filter out user to remove.
    const teamWithoutUser = team.members.filter(
      (memberId) => memberId !== user_id
    );

    // Check if the team has only one member left.
    if (teamWithoutUser.length === 0) {
      await db.delete(team._id); // Delete the team

      // Update the member's team details to null
      await db.patch(user._id, {
        has_team: false,
        is_captain: false,
        team_id: null,
        team_name: null,
      });

      return { message: "Team deleted since there are no more members!" };
    }

    // if user is captain set new captain.
    if (user.is_captain && teamWithoutUser.length) {
      await db.patch(team._id, {
        team_captain: teamWithoutUser[0],
      });
      await db.patch(teamWithoutUser[0], {
        is_captain: true,
      });
    }
    console.log(teamWithoutUser);

    // Update the team members list.
    await db.patch(team._id, {
      members: teamWithoutUser,
    });

    // update member
    await db.patch(user._id, {
      has_team: false,
      is_captain: false,
      team_id: null,
      team_name: null,
    });

    const updatedTeam = await db.get(team_id);

    return { team: updatedTeam, message: "Successfully removed!" };
  },
});

export const destroy = mutation({
  args: {
    team_id: v.id("teams"),
  },
  handler: async ({ db }, { team_id }) => {
    // get request.
    const teamToDestroy = await db.get(team_id);

    // check if request exists in db.
    if (!teamToDestroy) throw Error("Team not found!");

    // for all members reset team related fields
    teamToDestroy.members.forEach((memberId) => {
      db.patch(memberId, {
        has_team: false,
        team_id: null,
        team_name: null,
      });
    });

    // delete team.
    await db.delete(team_id);

    return "Team deleted!";
  },
});

/*

  * Team Functions *

  - create -
  # Needs: 'team_name', 'user_id'
  # Optional: 'members'
  # Flow: Create a team entry with the creating member as the sole member of an array 'members'. If team creation is successful,set creating member's 'has_team' flag to true, and populate the user's 'team_name' and 'team_id' fields with those from the newly created team entry.

  - inviteMemberToTeam -
  # Needs: 'team_id', 'user_id'
  # Flow: Check that all user's 'has_team' field is false. Send a join invitation to all new users whose 'has_team' is false.

  - requestJoinTeam
  # Needs: 'user_id', 'team_id'
  # Flow: Check that user's 'has_team' field is false. Send a request

  - addMember -
  # Needs: 'team_id', 'user_id'
  # Flow: Get entry for 'user_id'. If 'has_team' is false, proceed to get the entry for 'team_id'. Perform a patch operation to add the user to the 'members' array on the team entry. If successful, set added user's 'team_id', 'team_name' with values from the team entry. Set user's 'has_team' flag to true.

  - removeMember -
  # Needs: 'team_id', 'user_id'
  # Flow: Only an admin or the user can remove themselves from a team. Get the team entry with 'team_id', and filter the 'members' list for non-matching 'user_id'. Patch the memebers array with the result of the filter.

  - deleteTeam -
  # Needs: 'team_id', 'user_id'
  # Flow: Only team leader can delete team. Get team with 'team_id'. Get user with 'user_id'. If team & user exist in db and 'user._id' matches 'team_captain', update 'has_team', 'team_id', and 'team_name' fields on all users. If successful, delete team entry from db.

*/
