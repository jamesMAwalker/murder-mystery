import { NextResponse, NextRequest } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function POST(req: NextRequest) {
  const { team_name, user_id } = await req.json()

  try {
    const newConvexTeam = await convex.mutation(api.teams.create, { team_name, user_id })

    if (!newConvexTeam) {
      return NextResponse.json({
        status: 422,
        message: 'Error creating team!'
      })
    }

    return NextResponse.json({
      status: 200,
      message: 'Team Created!',
      data: newConvexTeam
    })

  } catch (error) {
    console.error('error: ', error);

    return NextResponse.json({
      status: 500,
      message: 'Error creating user!',
      error
    })
  }

}