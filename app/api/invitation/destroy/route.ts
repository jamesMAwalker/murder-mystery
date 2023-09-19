import { NextResponse, NextRequest } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function DELETE(req: NextRequest) {
  const { invitation_id } = await req.json()

  try {
    const destroyConfirm = await convex.mutation(api.invitations.destroy, { invitation_id })

    if (!destroyConfirm) {
      return NextResponse.json({
        status: 500,
        message: 'Error removing invitation!'
      })
    }

    return NextResponse.json({
      status: 200,
      message: destroyConfirm
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