import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    
    console.log('=== TELEGRAM DEBUG INFO ===')
    console.log('Bot Token:', botToken ? `${botToken.substring(0, 10)}...` : 'MISSING')
    console.log('Chat ID:', chatId)
    console.log('Token Length:', botToken?.length)
    console.log('Token has colon:', botToken?.includes(':'))
    
    if (!botToken) {
      return NextResponse.json({
        error: 'TELEGRAM_BOT_TOKEN is missing',
        env: process.env.NODE_ENV
      })
    }
    
    // Test the exact URL that's being used
    const apiUrl = `https://api.telegram.org/bot${botToken}`
    const testUrl = `${apiUrl}/getMe`
    
    console.log('Testing URL:', testUrl)
    
    // Make the actual API call
    const response = await fetch(testUrl)
    const data = await response.json()
    
    console.log('API Response Status:', response.status)
    console.log('API Response:', data)
    
    return NextResponse.json({
      success: response.ok,
      status: response.status,
      url: testUrl.replace(botToken, `${botToken.substring(0, 10)}...`), // Hide full token in response
      response: data,
      tokenInfo: {
        length: botToken.length,
        hasColon: botToken.includes(':'),
        format: botToken.match(/^\d+:[\w-]+$/) ? 'Valid' : 'Invalid'
      }
    })
    
  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json({
      error: 'Debug failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
