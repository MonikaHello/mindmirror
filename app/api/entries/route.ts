import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/entries - Get all entries for current user
export async function GET() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: entries, error } = await supabase
    .from('entries')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(entries)
}

// POST /api/entries - Create a new entry
export async function POST(request: Request) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  
  const { data: entry, error } = await supabase
    .from('entries')
    .insert({
      user_id: user.id,
      event: body.event,
      category: body.category,
      thought: body.thought,
      feelings: body.feelings || [],
      other_feeling: body.otherFeeling,
      intensity: body.intensity || 5,
      health: body.health || {},
      voice_note_url: body.voiceNoteUrl,
      voice_note_duration: body.voiceNoteDuration,
    }as any)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(entry)
}
