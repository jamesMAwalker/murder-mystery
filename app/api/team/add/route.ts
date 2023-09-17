import { NextResponse, NextRequest } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function PATCH(req: NextRequest) {
  const { team_id, user_id } = await req.json()

  try {
    const updatedTeam = await convex.mutation(api.teams.addMember, { team_id, user_id })

    if (!updatedTeam) {
      return NextResponse.json({
        status: 422,
        message: 'Error updating team!'
      })
    }

    return NextResponse.json({
      status: 200,
      message: 'Team updated!',
      team: updatedTeam
    })

  } catch (error: any) {

    return NextResponse.json({
      status: 500,
      message: 'Something went wrong!',
      error: error.message
    })
  }

}