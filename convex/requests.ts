import { mutation } from './_generated/server'
import { v } from "convex/values";

// TODO: Error handling.

export const requestToJoinTeam = mutation({
  args: {
    team_id: v.id('teams'),
    user_id: v.string()
  },
  handler: async ({ db }, { team_id, user_id }) => {

    const user = await db.query('users')
      .filter(user => user.eq(user.field("user_id"), user_id))
      .unique()

    // check if user exists in db.
    if (!user) throw Error('User not found in database!')

    // check if user is already attached to a team.
    if (user.has_team) throw Error('User already on a team!')

    // get requests. errors if more than one
    const requests = await db.query('requests')
      .filter(request => request.eq(request.field("requested_team_id"), team_id))
      .collect()

    if (requests.length > 0) throw Error('You have already requested to join this team!')

    // get team.
    const team = await db.get(team_id)

    // check if team exists
    if (!team) throw Error('Error finding team!')

    // check if team has capacity
    if (team?.members.length >= 10) throw Error('Team already has max members!')

    const request = await db.insert('requests', {
      requesting_user_id: user._id,
      requested_team_id: team._id,
      accepted: false
    })

    return request;

  }
})