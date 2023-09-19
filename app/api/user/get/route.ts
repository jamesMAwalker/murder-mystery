/*
  * getUser Route *
  # Sending a POST to this route with a 'team_id' will return one team.
  # Sending a GET to this route will return all teams.
*/


import { NextResponse, NextRequest } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

// Get ONE user.
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


// Get ALL users.
export async function GET() {
  try {
    const users = await convex.query(api.users.getAll)

    // return error if no users found.
    if (!users) {
      return NextResponse.json({
        status: 422,
        message: 'Error fetching users!'
      })
    }

    // return found collection.
    return NextResponse.json({
      status: 200,
      message: 'Success!',
      users
    })

  } catch (error) {
    console.error('error: ', error);

    // return error if something else goes wrong.
    return NextResponse.json({
      status: 500,
      message: 'Sever Error!'
    })
  }
}