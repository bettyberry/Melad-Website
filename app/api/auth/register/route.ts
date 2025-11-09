import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body


    return NextResponse.json({ 
      success: true, 
      user: { 
        id: Date.now().toString(), 
        name, 
        email 
      } 
    })
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}