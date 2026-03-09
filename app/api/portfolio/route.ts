import { NextRequest, NextResponse } from 'next/server'
import { getPortfolioData, savePortfolioData } from '@/lib/db'

// GET - Read portfolio data
export async function GET() {
  try {
    const data = getPortfolioData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading portfolio data:', error)
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
  }
}

// POST - Update portfolio data
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    savePortfolioData(data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error writing portfolio data:', error)
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}
