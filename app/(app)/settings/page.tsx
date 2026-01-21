'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const supabase = createClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-light mb-6">Settings</h1>
      
      <div className="card">
        <h2 className="text-lg mb-4">Account</h2>
        <button 
          onClick={handleSignOut}
          className="btn w-full"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
