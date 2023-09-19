/*
  * Teams Route *
  # Sending a POST to this route with a 'team_id' will return one team.
  # Sending a GET to this route will return all teams.
*/


import { NextResponse, NextRequest } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)


export async function POST(req: NextRequest) {
  // TODO: Use ...something I forgot 😌...

  const { team_id } = await req.json()

  try {
    const team = await convex.query(api.teams.get, { team_id })

    if (!team) {
      return NextResponse.json({
        status: 422,
        message: 'Team not found in database!'
      })
    }

    return NextResponse.json({
      status: 200,
      message: 'Success!',
      team
    })

  } catch (error) {
    console.error('error: ', error);

    return NextResponse.json({
      status: 500,
      message: 'Error finding team!'
    })
  }

}

export async function GET() {
  try {
    const teams = await convex.query(api.teams.getAll)

    if (!teams) {
      return NextResponse.json({
        status: 500,
        message: 'Error fetching teams!'
      })
    }

    return NextResponse.json({
      status: 200,
      message: 'Success!',
      teams
    })

  } catch (error) {
    console.error('error: ', error);

    return NextResponse.json({
      status: 500,
      message: 'Server Error!'
    })
  }
}