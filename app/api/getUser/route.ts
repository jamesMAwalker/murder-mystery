import { NextResponse, NextRequest } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function POST(req: NextRequest) {
  const userData = await req.json()

  try {
    const existingUser = await convex.query(api.users.getById, { user_id: userData.user_id })

    // return error if no user found.
    if (!existingUser) {
      return NextResponse.json({
        status: 422,
        message: 'User not found in database!'
      })
    }

    // return found user.
    return NextResponse.json({
      status: 200,
      message: 'User Created!',
      user: existingUser
    })

  } catch (error) {
    console.error('error: ', error);

    // return error if something else goes wrong.
    return NextResponse.json({
      status: 500,
      message: 'Error getting user!'
    })
  }

}