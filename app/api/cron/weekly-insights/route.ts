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

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  try {
    // Get all users with notifications enabled
    const { data: users, error } = await supabase
      .from('profiles')
      .select('id, email, name, settings')
      .eq('settings->notificationsEnabled', true)

    if (error) throw error

    let sentCount = 0

    for (const user of users || []) {
      // Get user's entries from the past week
      const { data: entries } = await supabase
        .from('entries')
        .select('feelings, category, intensity, created_at')
        .eq('user_id', user.id)
        .gte('created_at', oneWeekAgo)
        .order('created_at', { ascending: false })

      if (!entries || entries.length === 0) continue

      // Calculate insights
      const totalEntries = entries.length
      
      // Count feelings
      const feelingCounts: Record<string, number> = {}
      entries.forEach(entry => {
        entry.feelings?.forEach((f: string) => {
          feelingCounts[f] = (feelingCounts[f] || 0) + 1
        })
      })
      const topFeeling = Object.entries(feelingCounts)
        .sort((a, b) => b[1] - a[1])[0]

      // Count categories
      const categoryCounts: Record<string, number> = {}
      entries.forEach(entry => {
        if (entry.category) {
          categoryCounts[entry.category] = (categoryCounts[entry.category] || 0) + 1
        }
      })
      const topCategory = Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])[0]

      // Average intensity
      const avgIntensity = entries.reduce((sum, e) => sum + (e.intensity || 5), 0) / entries.length

      // Build email
      try {
        await resend.emails.send({
          from: 'MindMirror <hello@mindmirror.app>',
          to: user.email,
          subject: 'Your week in review ✨',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 450px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 24px; font-weight: 600; color: #1a1a2e; margin-bottom: 24px;">
                Your Week in Review
              </h1>
              
              <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin-bottom: 16px; text-align: center;">
                <div style="font-size: 36px; font-weight: 600; color: #1a1a2e;">${totalEntries}</div>
                <div style="color: #666; font-size: 14px;">entries this week</div>
              </div>
              
              ${topFeeling ? `
              <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
                <div style="font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Most common feeling</div>
                <div style="font-size: 18px; font-weight: 500; color: #1a1a2e;">
                  ${topFeeling[0]} <span style="color: #888; font-weight: normal;">(${topFeeling[1]} times)</span>
                </div>
              </div>
              ` : ''}
              
              ${topCategory ? `
              <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
                <div style="font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Top category</div>
                <div style="font-size: 18px; font-weight: 500; color: #1a1a2e;">
                  ${topCategory[0]}
                </div>
              </div>
              ` : ''}
              
              <div style="background: linear-gradient(135deg, rgba(74, 111, 165, 0.1) 0%, rgba(61, 90, 128, 0.05) 100%); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <div style="font-size: 12px; color: #4a6fa5; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Average intensity</div>
                <div style="font-size: 24px; font-weight: 500; color: #1a1a2e;">
                  ${avgIntensity.toFixed(1)} <span style="font-size: 14px; color: #888;">/ 10</span>
                </div>
              </div>
              
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/patterns" style="display: block; text-align: center; background: linear-gradient(135deg, #4a6fa5 0%, #3d5a80 100%); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 500; font-size: 16px;">
                See All Patterns
              </a>
              
              <p style="color: #999; font-size: 13px; margin-top: 40px; text-align: center; line-height: 1.5;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/settings" style="color: #999;">Manage notifications</a>
              </p>
            </div>
          `,
        })
        sentCount++
      } catch (emailError) {
        console.error(`Failed to send weekly email to ${user.email}:`, emailError)
      }
    }

    return NextResponse.json({ 
      success: true, 
      sent: sentCount 
    })
  } catch (error) {
    console.error('Weekly insights cron error:', error)
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 })
  }
}
