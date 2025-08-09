import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'portfolio.json')

// GET - Read portfolio data
export async function GET() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    console.error('Error reading portfolio data:', error)
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
  }
}

// POST - Update portfolio data
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Ensure the data directory exists
    const dataDir = path.dirname(DATA_FILE)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    // Write the data to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error writing portfolio data:', error)
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}
