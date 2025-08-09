import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { telegramService } from '@/lib/telegram'

const MESSAGES_FILE = path.join(process.cwd(), 'data', 'messages.json')

// Ensure messages file exists
function ensureMessagesFile() {
  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2))
  }
}

// GET - Retrieve all messages
export async function GET() {
  try {
    ensureMessagesFile()
    const data = fs.readFileSync(MESSAGES_FILE, 'utf8')
    const messages = JSON.parse(data)
    
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error reading messages:', error)
    return NextResponse.json({ error: 'Failed to read messages' }, { status: 500 })
  }
}

// POST - Add new message or update existing
export async function POST(request: NextRequest) {
  try {
    ensureMessagesFile()
    const body = await request.json()
    
    // Check if this is a new message submission or an update
    if (body.action === 'submit') {
      // New message submission
      const { name, email, subject, message } = body
      
      if (!name || !email || !subject || !message) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
      }
      
      const data = fs.readFileSync(MESSAGES_FILE, 'utf8')
      const messages = JSON.parse(data)
      
      const newMessage = {
        id: Date.now(),
        name,
        email,
        subject,
        message,
        status: 'unread',
        priority: 'normal',
        submittedAt: new Date().toISOString(),
        readAt: null,
        respondedAt: null,
        notes: ''
      }
      
      messages.push(newMessage)
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2))
      
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
      const messages = body
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2))
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
    ensureMessagesFile()
    const { searchParams } = new URL(request.url)
    const messageId = searchParams.get('id')
    
    if (!messageId) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 })
    }
    
    const data = fs.readFileSync(MESSAGES_FILE, 'utf8')
    const messages = JSON.parse(data)
    
    const filteredMessages = messages.filter((msg: any) => msg.id.toString() !== messageId)
    
    if (filteredMessages.length === messages.length) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }
    
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(filteredMessages, null, 2))
    
    return NextResponse.json({ success: true, message: 'Message deleted successfully!' })
  } catch (error) {
    console.error('Error deleting message:', error)
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 })
  }
}
