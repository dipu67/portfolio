import { NextRequest, NextResponse } from 'next/server'
import { telegramService } from '@/lib/telegram'

// GET - Get Telegram bot status
export async function POST(request: NextRequest) {
  try {
    // Check if Telegram is configured
    if (!telegramService.isConfigured()) {
      return NextResponse.json(
        { 
          error: 'Telegram bot not configured. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in environment variables.' 
        }, 
        { status: 400 }
      )
    }

    // Get bot info to verify connection
    const botInfo = await telegramService.getBotInfo()
    console.log('Bot info result:', botInfo)
    
    if (!botInfo || !botInfo.ok) {
      const errorMessage = botInfo?.error || 'Unknown error'
      const errorCode = botInfo?.error_code || 'N/A'
      
      return NextResponse.json(
        { 
          error: `Failed to connect to Telegram bot: ${errorMessage} (Code: ${errorCode})`,
          details: botInfo,
          troubleshooting: {
            message: "Common causes:",
            causes: [
              "1. Invalid bot token - Check if TELEGRAM_BOT_TOKEN is correct",
              "2. Bot token format - Should be like: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz",
              "3. Environment variables not loaded - Check your .env file"
            ]
          }
        }, 
        { status: 400 }
      )
    }

    // Send test notification
    const success = await telegramService.sendTestNotification()
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Test notification sent successfully!',
        botInfo: {
          username: botInfo.result.username,
          first_name: botInfo.result.first_name,
          id: botInfo.result.id
        }
      })
    } else {
      return NextResponse.json(
        { 
          error: 'Failed to send test notification. Please check your chat ID.' 
        }, 
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Telegram test error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to test Telegram configuration' 
      }, 
      { status: 500 }
    )
  }
}

// GET - Get Telegram bot status
export async function GET() {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    
    const status = {
      configured: !!(botToken && chatId),
      hasToken: !!botToken,
      hasChatId: !!chatId,
      tokenFormat: botToken ? (botToken.includes(':') ? 'Valid format' : 'Invalid format') : 'Missing',
      tokenLength: botToken?.length || 0,
      environment: process.env.NODE_ENV || 'unknown'
    }
    
    if (!status.configured) {
      return NextResponse.json({
        success: false,
        status,
        error: 'Missing required environment variables',
        help: {
          message: "Add these to your .env file:",
          required: [
            "TELEGRAM_BOT_TOKEN=your_bot_token_here",
            "TELEGRAM_CHAT_ID=your_chat_id_here"
          ]
        }
      })
    }

    // Try to get bot info
    const botInfo = await telegramService.getBotInfo()
    
    return NextResponse.json({
      success: !!(botInfo && botInfo.ok),
      configured: true,
      connected: !!(botInfo && botInfo.ok),
      status,
      botInfo: botInfo?.ok ? {
        username: botInfo.result.username,
        first_name: botInfo.result.first_name,
        id: botInfo.result.id,
        can_join_groups: botInfo.result.can_join_groups,
        is_bot: botInfo.result.is_bot
      } : null,
      error: botInfo?.ok ? null : {
        message: botInfo?.description || 'Unknown error',
        code: botInfo?.error_code || 'N/A',
        troubleshooting: [
          "1. Check if TELEGRAM_BOT_TOKEN is correct",
          "2. Bot token should be in format: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz",
          "3. Verify the bot exists by messaging @BotFather",
          "4. Make sure environment variables are loaded properly"
        ]
      }
    })
  } catch (error) {
    console.error('Error checking Telegram status:', error)
    return NextResponse.json(
      { 
        success: false,
        configured: false,
        error: 'Failed to check Telegram status',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}
