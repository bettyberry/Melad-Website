import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const data = await req.json()

  // Example: save to DB (replace with Prisma / Supabase / MongoDB)
  console.log("New user:", data)

  return NextResponse.json({ success: true })
}
