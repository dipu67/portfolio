import { NextRequest, NextResponse } from 'next/server'
import { telegramService } from '@/lib/telegram'
import { getAllMessages, addMessage, bulkUpdateMessages, deleteMessage as dbDeleteMessage } from '@/lib/db'

// GET - Retrieve all messages
export async function GET() {
  try {
    const messages = getAllMessages()
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error reading messages:', error)
    return NextResponse.json({ error: 'Failed to read messages' }, { status: 500 })
  }
}

// POST - Add new message or update existing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Check if this is a new message submission or an update
    if (body.action === 'submit') {
      // New message submission
      const { name, email, subject, message } = body
      
      if (!name || !email || !subject || !message) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
      }
      
      const newMessage = addMessage({ name, email, subject, message })
      
      // Send Telegram notification for new contact message
      try {
        await telegramService.notifyNewContact({
          name,
          email,
          subject,
          message,
          priority: 'normal',
          timestamp: newMessage.submittedAt
        })
      } catch (telegramError) {
        console.error('Failed to send Telegram notification:', telegramError)
        // Don't fail the request if Telegram fails
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Message sent successfully!',
        id: newMessage.id 
      })
    } else {
      // Update existing messages (for admin)
      bulkUpdateMessages(body)
      return NextResponse.json({ success: true, message: 'Messages updated successfully!' })
    }
  } catch (error) {
    console.error('Error handling messages:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}

// DELETE - Delete a message
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const messageId = searchParams.get('id')
    
    if (!messageId) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 })
    }
    
    const deleted = dbDeleteMessage(Number(messageId))
    
    if (!deleted) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true, message: 'Message deleted successfully!' })
  } catch (error) {
    console.error('Error deleting message:', error)
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 })
  }
}
