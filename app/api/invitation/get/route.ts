import { NextResponse, NextRequest } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function POST(req: NextRequest) {
  const {
    user_id = null,
    team_id = null
  } = await req.json()

  const getInvitationsByUserOrTeamId = user_id
    ? async () => await convex.query(api.invitations.getByUserId, { user_id })
    : async () => await convex.query(api.invitations.getByTeamId, { team_id })

  try {
    const invitations = await getInvitationsByUserOrTeamId()

    if (!invitations) {
      return NextResponse.json({
        status: 500,
        message: 'Error getting invitations!'
      })
    }

    return NextResponse.json({
      status: 200,
      message: 'Success!',
      invitations
    })

  } catch (error: any) {


    return NextResponse.json({
      status: 500,
      message: 'Something went wrong!',
      error: error?.message
    })
  }

}