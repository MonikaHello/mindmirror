'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const supabase = createClient()
  const router = useRouter()
  
  const [settings, setSettings] = useState({
    trackCycle: false,
    trackSleep: true,
    trackHealth: true,
    periodStartDate: '',
    averageCycleLength: 28,
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data }: any = await supabase
        .from('profiles')
        .select('settings, name')
        .eq('id', user.id)
        .single()
      if (data?.settings) {
        setSettings(data.settings)
      }
      if (data?.name) {
        setUserName(data.name)
      }
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const updates: any = { settings, name: userName }
      await (supabase
  .from('profiles') as any)
  .update(updates)
  .eq('id', user.id)
    }
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-light mb-6">Settings</h1>
      
      <div className="card">
        <h2 className="text-lg mb-4">Profile</h2>
        <label className="text-sm text-white/50 block mb-2">Your name</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="input"
          placeholder="What should we call you?"
        />
      </div>

      <div className="card">
        <h2 className="text-lg mb-4">Body Tracking</h2>
        
        <div className="flex items-center justify-between py-3 border-b border-white/10">
          <div>
            <div className="text-white/90">Menstrual Cycle</div>
            <div className="text-sm text-white/50">Track cycle phases</div>
          </div>
          <button
            onClick={() => setSettings({ ...settings, trackCycle: !settings.trackCycle })}
            className={`w-12 h-7 rounded-full transition-colors ${settings.trackCycle ? 'bg-primary' : 'bg-white/20'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform mx-1 ${settings.trackCycle ? 'translate-x-5' : ''}`} />
          </button>
        </div>

        {settings.trackCycle && (
          <div className="py-4 border-b border-white/10 pl-4 space-y-4">
            <div>
              <label className="text-sm text-white/60 block mb-2">Last period start date</label>
              <input
                type="date"
                value={settings.periodStartDate}
                onChange={(e) => setSettings({ ...settings, periodStartDate: e.target.value })}
                className="input py-2"
              />
            </div>
            <div>
              <label className="text-sm text-white/60 block mb-2">Average cycle length</label>
              <input
                type="number"
                value={settings.averageCycleLength}
                onChange={(e) => setSettings({ ...settings, averageCycleLength: parseInt(e.target.value) || 28 })}
                className="input py-2 w-24"
                min="21"
                max="35"
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between py-3 border-b border-white/10">
          <div>
            <div className="text-white/90">Sleep Quality</div>
            <div className="text-sm text-white/50">Log how you slept</div>
          </div>
          <button
            onClick={() => setSettings({ ...settings, trackSleep: !settings.trackSleep })}
            className={`w-12 h-7 rounded-full transition-colors ${settings.trackSleep ? 'bg-primary' : 'bg-white/20'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform mx-1 ${settings.trackSleep ? 'translate-x-5' : ''}`} />
          </button>
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <div className="text-white/90">Health Factors</div>
            <div className="text-sm text-white/50">Track illness, pain, etc.</div>
          </div>
          <button
            onClick={() => setSettings({ ...settings, trackHealth: !settings.trackHealth })}
            className={`w-12 h-7 rounded-full transition-colors ${settings.trackHealth ? 'bg-primary' : 'bg-white/20'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform mx-1 ${settings.trackHealth ? 'translate-x-5' : ''}`} />
          </button>
        </div>
      </div>

      <button
        onClick={saveSettings}
        disabled={saving}
        className="btn btn-primary w-full py-3 mb-4"
      >
        {saving ? 'Saving...' : saved ? 'Saved' : 'Save Settings'}
      </button>

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
