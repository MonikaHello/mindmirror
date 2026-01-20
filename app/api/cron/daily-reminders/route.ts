import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const currentHour = new Date().getUTCHours()
  const today = new Date().toISOString().split('T')[0]

  try {
    // Get users who want notifications at this hour
    const { data: users, error } = await supabase
      .from('profiles')
      .select('id, email, name, settings')
      .eq('settings->notificationsEnabled', true)

    if (error) throw error

    let sentCount = 0

    for (const user of users || []) {
      const settings = user.settings as any
      const notificationHour = parseInt(settings?.notificationTime?.split(':')[0] || '20')
      
      // Check if this is the right hour for this user
      if (notificationHour !== currentHour) continue

      // Check if user already has an entry today
      const { data: todayEntries } = await supabase
        .from('entries')
        .select('id')
        .eq('user_id', user.id)
        .gte('created_at', today)
        .limit(1)

      if (todayEntries && todayEntries.length > 0) continue

      // Send reminder email
      try {
        await resend.emails.send({
          from: 'MindMirror <hello@mindmirror.app>',
          to: user.email,
          subject: 'How are you feeling today?',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 400px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 24px; font-weight: 600; color: #1a1a2e; margin-bottom: 12px;">
                Hey${user.name ? ` ${user.name}` : ''} 👋
              </h1>
              <p style="color: #666; line-height: 1.6; margin-bottom: 24px; font-size: 16px;">
                Take a moment to check in with yourself. How are you feeling right now?
              </p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/journal" style="display: inline-block; background: linear-gradient(135deg, #4a6fa5 0%, #3d5a80 100%); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 500; font-size: 16px;">
                Open MindMirror
              </a>
              <p style="color: #999; font-size: 13px; margin-top: 40px; line-height: 1.5;">
                You're receiving this because you enabled daily reminders in MindMirror.<br/>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/settings" style="color: #999;">Manage notifications</a>
              </p>
            </div>
          `,
        })
        sentCount++
      } catch (emailError) {
        console.error(`Failed to send email to ${user.email}:`, emailError)
      }
    }

    return NextResponse.json({ 
      success: true, 
      sent: sentCount,
      hour: currentHour 
    })
  } catch (error) {
    console.error('Daily reminders cron error:', error)
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 })
  }
}
