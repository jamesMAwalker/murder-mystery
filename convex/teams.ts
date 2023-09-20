import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    team_name: v.string(),
    user_id: v.id("users"),
  },
  handler: async ({ db }, { team_name, user_id }) => {
    // get user.
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

    // TODO: Check if teams capacity has been reached.

    // Insert team into db.
    const teamId = await db.insert("teams", {
      team_name,
      team_captain: user._id,
      members: [user._id],
    });

    // Update team fields of all added members.
    await db.patch(user._id, { has_team: true, team_name, team_id: teamId });

    return user;
  },
});

// TODO: Delete one of 'get' or 'getOne', then rename 'getAll' to get.

export const get = query({
  args: {
    team_id: v.id("teams"),
  },
  handler: async ({ db }, { team_id }) => {
    const team = await db.get(team_id);

    if (!team) throw Error("Team not found in database!");

    return team;
  },
});

export const getAll = query(async ({ db }) => {
  return await db.query("teams").collect();
});

export const getOne = query({
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

// delete user from team if user is on team.

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
