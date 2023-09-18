import { NextResponse, NextRequest } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function POST(req: NextRequest) {
  const { team_id, user_id } = await req.json()

  try {
    const newConvexRequest = await convex.mutation(api.requests.create, { team_id, user_id })

    if (!newConvexRequest) {
      return NextResponse.json({
        status: 500,
        message: 'Error creating request!'
      })
    }

    return NextResponse.json({
      status: 200,
      message: 'Request sent!',
      request: newConvexRequest
    })

  } catch (error: any) {
    console.error('____error____: ', error);

    return NextResponse.json({
      status: 500,
      message: 'Something went wrong!',
      error: error?.message
    })
  }

}