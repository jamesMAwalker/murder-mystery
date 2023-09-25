import { QueryCtx } from "../_generated/server";

export async function getUserFromAuthSession(ctx:QueryCtx) {

  const { auth, db } = ctx

  // get user from auth
  const clerk_user = await auth.getUserIdentity()

  const clerkId = clerk_user?.subject // subject is the user ID

  // get user from db with clerk id
  const user = await db
    .query('users')
    .filter(user => user.eq(user.field("user_id"), clerkId))
    .unique()

  return user;
}