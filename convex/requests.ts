import { mutation, query } from './_generated/server'
import { v } from "convex/values";


export const create = mutation({
  args: {
    team_id: v.id('teams'),
    user_id: v.id('users')
  },
  handler: async ({ db }, { team_id, user_id }) => {

    // get user.
    const user = await db.get(user_id)

    // check if user exists in db.
    if (!user) throw Error('User not found in database!')

    // check if user is already attached to a team.
    if (user.has_team) throw Error('User already on a team!')

    // check if user has already made a request to team (entry with both team_id & user_id exists).
    const existingRequests = await db.query('requests')
      .filter(request => {
        return (
          request.eq(request.field("requested_team_id"), team_id) &&
          request.eq(request.field("requesting_user_id"), user_id)
        )
      })
      .collect()

    if (existingRequests.length > 0) throw Error('You have already requested to join this team!')

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

export const getByUserId = query({
  handler: async (ctx) => {
    
    const { db, auth } = ctx

    // get user from auth
    const clerk_user = await auth.getUserIdentity()

    const clerkId = clerk_user?.subject // subject is the user ID

    // get user from db with clerk id
    const user = await db
      .query('users')
      .filter(user => user.eq(user.field("user_id"), clerkId))
      .unique()

    const userRequests = await db.query('requests')
      .filter(request => request.eq(request.field("requesting_user_id"), user?._id))
      .collect()

    if (!userRequests) throw Error('No requests found!')

    return userRequests;

  }
})

export const getByTeamId = query({
  args: {
    team_id: v.id('teams')
  },
  handler: async ({ db }, { team_id }) => {
    const teamRequests = await db.query('requests')
      .filter(request => request.eq(request.field("requested_team_id"), team_id))
      .collect()

    if (!teamRequests) throw Error('No requests found!')

    return teamRequests;

  }
})

export const destroy = mutation({
  args: {
    request_id: v.id('requests'),
  },
  handler: async ({ db }, { request_id }) => {

    // get request.
    const requestToDestroy = await db.get(request_id)

    // check if request exists in db.
    if (!requestToDestroy) throw Error('Request not found!')

    // delete request.
    await db.delete(request_id)

    return 'Request deleted!';
  }
})