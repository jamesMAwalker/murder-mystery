import { NextResponse, NextRequest } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function POST(req: NextRequest) {
  const userData = await req.json()

  
  try {
    const existingUser = await convex.query(api.users.getById, { user_id: userData.user_id})
    
    if (existingUser) {
      return NextResponse.json({
        status: 422,
        message: 'User already exists in database.'
      })
    }

    const newConvexUser = await convex.mutation(api.users.create, userData)
    
    return NextResponse.json({
      status: 200,
      message: 'User Created!',
      data: newConvexUser
    })

  } catch (error) {
    console.error('error: ', error);
    
    return NextResponse.json({
      status: 500,
      message: 'Error creating user!'
    })
  }

}