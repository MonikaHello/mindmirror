import { createClient } from '@/lib/supabase/server'
import JournalClient from './JournalClient'

export default async function JournalPage() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  // Get user entries
  const { data: entries } = await supabase
    .from('entries')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  return (
    <JournalClient 
      initialEntries={entries || []} 
      profile={profile!}
      isPremium={(profile as any)?.subscription_status === 'premium'}
    />
  )
}
