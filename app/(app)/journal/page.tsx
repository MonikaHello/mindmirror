import { createClient } from '@/lib/supabase/server'
import JournalClient from './JournalClient'
import { redirect } from 'next/navigation'

export default async function JournalPage() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single() as any

  // Check if user needs onboarding
  if (profile && !profile.onboarding_complete) {
    redirect('/onboarding')
  }

  // Get user entries
  const { data: entries } = await supabase
    .from('entries')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // Get user name from profile or Google metadata
  const userName = profile?.name || user.user_metadata?.name || user.user_metadata?.full_name || null

  return (
    <JournalClient 
      initialEntries={entries || []} 
      profile={profile}
      isPremium={(profile as any)?.subscription_status === 'premium'}
      userName={userName}
    />
  )
}
