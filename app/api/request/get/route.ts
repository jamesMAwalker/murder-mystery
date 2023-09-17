import { NextResponse, NextRequest } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function POST(req: NextRequest) {
  const {
    user_id = null,
    team_id = null
  } = await req.json()

  const getRequestsByUserOrTeamId = user_id
    ? async () => await convex.query(api.requests.getByUserId, { user_id })
    : async () => await convex.query(api.requests.getByTeamId, { team_id })

  try {
    const requests = await getRequestsByUserOrTeamId()

    if (!requests) {
      return NextResponse.json({
        status: 500,
        message: 'Error getting requests!'
      })
    }

    return NextResponse.json({
      status: 200,
      message: 'Success!',
      requests
    })

  } catch (error: any) {


    return NextResponse.json({
      status: 500,
      message: 'Something went wrong!',
      error: error?.message
    })
  }

}