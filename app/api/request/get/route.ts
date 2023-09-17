import { NextResponse, NextRequest } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function POST(req: NextRequest) {
  const { user_id } = await req.json()

  try {
    const requests = await convex.query(api.requests.getById, user_id)

    if (!requests) {
      return NextResponse.json({
        status: 500,
        message: 'Error getting requests!'
      })
    }

    return NextResponse.json({
      status: 200,
      message: 'Success!',
      data: requests
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