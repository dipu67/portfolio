/**
 * Telegram Bot Service for Real-time Notifications
 * Sends notifications when new contact messages are received
 */

interface TelegramMessage {
  chat_id: string
  text: string
  parse_mode?: 'HTML' | 'Markdown'
  disable_web_page_preview?: boolean
}

interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
  priority?: string
  timestamp: string
}

class TelegramService {
  private botToken: string
  private chatId: string
  private apiUrl: string

  constructor() {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN || ''
    this.chatId = process.env.TELEGRAM_CHAT_ID || ''
    this.apiUrl = `https://api.telegram.org/bot${this.botToken}`

    if (!this.botToken || !this.chatId) {
      console.warn('Telegram configuration missing. Notifications will be disabled.')
    }
  }

  /**
   * Check if Telegram is properly configured
   */
  isConfigured(): boolean {
    return !!(this.botToken && this.chatId)
  }

  /**
   * Send a message to Telegram
   */
  async sendMessage(message: TelegramMessage): Promise<boolean> {
    if (!this.isConfigured()) {
      console.warn('Telegram not configured. Skipping notification.')
      return false
    }

    try {
      const response = await fetch(`${this.apiUrl}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Telegram API error:', errorData)
        return false
      }

      console.log('Telegram notification sent successfully')
      return true
    } catch (error) {
      console.error('Error sending Telegram message:', error)
      return false
    }
  }

  /**
   * Send notification for new contact form submission
   */
  async notifyNewContact(contactData: ContactFormData): Promise<boolean> {
    if (!this.isConfigured()) {
      return false
    }

    const priorityEmoji = this.getPriorityEmoji(contactData.priority || 'medium')
    const timeFormatted = new Date(contactData.timestamp).toLocaleString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    const message = `🔔 <b>New Contact Message</b> ${priorityEmoji}

👤 <b>Name:</b> ${this.escapeHtml(contactData.name)}
📧 <b>Email:</b> ${this.escapeHtml(contactData.email)}
${contactData.subject ? `📝 <b>Subject:</b> ${this.escapeHtml(contactData.subject)}\n` : ''}
💬 <b>Message:</b>
${this.escapeHtml(contactData.message)}

⏰ <b>Received:</b> ${timeFormatted}
🚨 <b>Priority:</b> ${contactData.priority?.toUpperCase() || 'MEDIUM'}

<i>💡 Check your admin panel to respond!</i>`

    return this.sendMessage({
      chat_id: this.chatId,
      text: message,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    })
  }

  /**
   * Send notification for urgent/high priority messages
   */
  async notifyUrgentContact(contactData: ContactFormData): Promise<boolean> {
    if (!this.isConfigured()) {
      return false
    }

    const message = `🚨🚨 <b>URGENT CONTACT MESSAGE</b> 🚨🚨

⚡ <b>HIGH PRIORITY MESSAGE RECEIVED</b>

👤 <b>From:</b> ${this.escapeHtml(contactData.name)}
📧 <b>Email:</b> ${this.escapeHtml(contactData.email)}

💬 <b>Message:</b>
${this.escapeHtml(contactData.message)}

<b>⚠️ IMMEDIATE ATTENTION REQUIRED ⚠️</b>`

    return this.sendMessage({
      chat_id: this.chatId,
      text: message,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    })
  }

  /**
   * Send test notification to verify bot setup
   */
  async sendTestNotification(): Promise<boolean> {
    const message = `🤖 <b>Telegram Bot Test</b>

✅ Your Telegram bot is working correctly!
🎯 Portfolio contact notifications are now active.

<i>You'll receive notifications here when someone contacts you through your portfolio.</i>`

    return this.sendMessage({
      chat_id: this.chatId,
      text: message,
      parse_mode: 'HTML',
    })
  }

  /**
   * Get priority emoji based on priority level
   */
  private getPriorityEmoji(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'high':
      case 'urgent':
        return '🔴'
      case 'medium':
        return '🟡'
      case 'low':
        return '🟢'
      default:
        return '🟡'
    }
  }

  /**
   * Escape HTML characters for Telegram
   */
  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }

  /**
   * Get bot info (for testing connection)
   */
  async getBotInfo(): Promise<any> {
    if (!this.isConfigured()) {
      console.error('Telegram not configured:', {
        hasToken: !!this.botToken,
        hasChat: !!this.chatId,
        tokenLength: this.botToken?.length || 0
      })
      return { ok: false, error: 'Not configured' }
    }

    try {
      console.log('Testing bot connection with URL:', `${this.apiUrl}/getMe`)
      const response = await fetch(`${this.apiUrl}/getMe`)
      const data = await response.json()
      
      console.log('Bot info response:', { 
        status: response.status, 
        ok: response.ok,
        data: data 
      })
      
      if (response.ok) {
        return data
      } else {
        console.error('Bot info API error:', data)
        return data
      }
    } catch (error) {
      console.error('Error getting bot info:', error)
      return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

// Export singleton instance
export const telegramService = new TelegramService()
export default telegramService
