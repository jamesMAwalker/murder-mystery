import { mutation } from './_generated/server'
import { v } from "convex/values";

// TODO: Error handling.

export const create = mutation({
  args: {
    team_id: v.id('teams'),
    user_id: v.id('users')
    // user_id: v.string()
  },
  handler: async ({ db }, { team_id, user_id }) => {

    // get user.
    const user = await db.get(user_id)

    // check if user exists in db.
    if (!user) throw Error('User not found in database!')

    // check if user is already attached to a team.
    if (user.has_team) throw Error('User already on a team!')

    // get invitations by this team to this user.
    const existingInvitations = await db.query('invitations')
      .filter(invite => {
        return (
          invite.eq(invite.field("invited_user_id"), user_id) &&
          invite.eq(invite.field("inviting_team_id"), team_id)
        )
      })
      .collect()

    // check if user has already been invited.
    if (existingInvitations.length > 0) {
      throw Error('User already invited to this team!')
    }

    // get team.
    const team = await db.get(team_id)

    // check if team exists
    if (!team) throw Error('Error finding team!')

    // check if team has capacity
    if (team?.members.length >= 10) throw Error('Team already has max members!')

    // create invitation.
    const invitationId = await db.insert('invitations', {
      invited_user_id: user._id,
      inviting_team_id: team._id,
      accepted: false
    })

    const invitation = await db.get(invitationId)

    return { message: 'Invitation successful!', ...invitation };
  }
})