import { mutation, query } from './_generated/server'
import { v } from "convex/values";
import { getUserFromAuthSession } from './lib/getUserFromAuthSession';


export const create = mutation({
  args: {
    suspect_id: v.id('suspects'),
    note_content: v.string()
  },
  handler: async (ctx, { suspect_id, note_content }) => {
    
    const { db } = ctx

    // get user.
    const user = await getUserFromAuthSession(ctx)

    // get suspect.
    const suspect = await db.get(suspect_id)

    // fail on missing suspect.
    if (!user) throw Error('Error finding suspect!')

    // check if user exists in db.
    if (!user) throw Error('Error finding user!')


    const notes = await db.query('notes')
      .filter(note => {
        return note.and(
          note.eq(note.field('suspect_id'), suspect_id),
          note.eq(note.field('user_id'), user?._id)
        )
      })
      .collect()

    // break execution if note already exists.
    if (notes.length >= 1) return { message: 'Note already exists for this suspect and user.' }

    // create note in database.
    const note = await db.insert('notes', {
      user_id: user._id,
      user_name: user.name,
      suspect_id,
      suspect_name: suspect?.suspect_name!,
      note: note_content
    })

    return note;

  }
})

export const update = mutation({
  args: {
    note_id: v.id('notes'),
    note_content: v.string()
  },
  handler: async ({ db }, { note_id, note_content }) => {

    const noteExists = db.get(note_id)

    if (!noteExists) return { message: 'No note with this id found.' }

    // create note in database.
    const note = await db.patch(note_id, {
      note: note_content
    })

    return note;

  }
})

export const getFromSessionByUser = query({
  args: {
    suspect_id: v.id('suspects')
  },
  handler: async (ctx, { suspect_id }) => {
    console.log('suspect_id: ', suspect_id);
    const { db } = ctx

    // get user from db using clerk auth session.
    const user = await getUserFromAuthSession(ctx)
    // console.log('user: ', user);

    // get notes using user id and suspect id.
    const note = await db
      .query('notes')
      .filter((note) => {
        return note.and(
          note.eq(note.field('suspect_id'), suspect_id),
          note.eq(note.field('user_id'), user?._id)
        )
      })
      .unique()

    console.log('note: ', note);
    return note
  }
})