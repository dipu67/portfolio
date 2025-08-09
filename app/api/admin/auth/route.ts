import { NextRequest, NextResponse } from 'next/server'

// Server-side only environment variable (no NEXT_PUBLIC_ prefix)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD  

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    // Check password on server-side (secure)
    if (password === ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: true, message: 'Authentication successful' },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
