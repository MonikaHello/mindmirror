'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

const FEELINGS = [
  { name: 'Anxious', color: '#E8B4B8' },
  { name: 'Sad', color: '#A8C5DA' },
  { name: 'Angry', color: '#D4A5A5' },
  { name: 'Frustrated', color: '#C9B1D4' },
  { name: 'Overwhelmed', color: '#B8C5B8' },
  { name: 'Hopeless', color: '#C4B8A8' },
  { name: 'Ashamed', color: '#D4C5B8' },
  { name: 'Lonely', color: '#A8B8C8' },
  { name: 'Calm', color: '#B8D4C8' },
  { name: 'Happy', color: '#D4D8A8' },
  { name: 'Irritable', color: '#D4B8B8' },
  { name: 'Numb', color: '#B0B0B0' },
  { name: 'Guilty', color: '#C8B8D4' },
  { name: 'Jealous', color: '#B8D4B8' },
  { name: 'Other', color: '#9CA3AF' },
]

const CATEGORIES = [
  'Work/Career',
  'Relationships', 
  'Health',
  'Finances',
  'Social situations',
  'Family',
  'Self-image',
  'Future planning',
  'Daily tasks',
  'Other'
]

const SLEEP_OPTIONS = ['Poor', 'Fair', 'Good', 'Great']

const HEALTH_FACTORS = [
  'Sick/Ill',
  'Pain',
  'Headache',
  'Low energy',
  'Caffeine',
  'Alcohol',
  'Medication',
  'Skipped meals',
  'Exercise',
  'Hungover',
  'Hormonal',
  'None',
  'Other',
]

const BODY_SENSATIONS = [
  'Chest tightness',
  'Stomach knots',
  'Tension in shoulders/neck',
  'Headache/pressure',
  'Racing heart',
  'Shallow breathing',
  'Heaviness',
  'Restlessness',
  'Fatigue',
  'Numbness',
  'Warmth/flushing',
  'Trembling',
  'None',
  'Other',
]

function getCyclePhase(day: number): string {
  if (day >= 1 && day <= 5) return 'Menstrual'
  if (day >= 6 && day <= 14) return 'Follicular'
  if (day >= 15 && day <= 17) return 'Ovulation'
  if (day >= 18 && day <= 28) return 'Luteal'
  if (day > 28) return 'Luteal (extended)'
  return ''
}

export default function JournalClient({ initialEntries, profile, isPremium, userName }: any) {
  const supabase = createClient()
  const [entries, setEntries] = useState(initialEntries || [])
  const [view, setView] = useState<'home' | 'form' | 'saved'>('home')
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    trackCycle: false,
    trackSleep: true,
    trackHealth: true,
  })

  const [event, setEvent] = useState('')
  const [thought, setThought] = useState('')
  const [feelings, setFeelings] = useState<string[]>([])
  const [otherFeeling, setOtherFeeling] = useState('')
  const [category, setCategory] = useState('')
  const [otherCategory, setOtherCategory] = useState('')
  const [intensity, setIntensity] = useState(5)
  const [sleep, setSleep] = useState('')
  const [healthFactors, setHealthFactors] = useState<string[]>([])
  const [otherHealthFactor, setOtherHealthFactor] = useState('')
  const [cycleDay, setCycleDay] = useState('')
  const [cyclePhase, setCyclePhase] = useState('')
  const [bodySensations, setBodySensations] = useState<string[]>([])
  const [otherBodySensation, setOtherBodySensation] = useState('')

  useEffect(() => {
    if (profile?.settings) setSettings(profile.settings)
  }, [profile])

  useEffect(() => {
    if (cycleDay) {
      const day = parseInt(cycleDay)
      if (!isNaN(day)) setCyclePhase(getCyclePhase(day))
    } else {
      setCyclePhase('')
    }
  }, [cycleDay])

  const patterns = detectPatterns(entries)
  const prediction = category ? generatePrediction(patterns, category) : null

  const resetForm = () => {
    setEvent(''); setThought(''); setFeelings([]); setOtherFeeling('')
    setCategory(''); setOtherCategory(''); setIntensity(5); setSleep('')
    setHealthFactors([]); setOtherHealthFactor(''); setCycleDay('')
    setCyclePhase(''); setBodySensations([]); setOtherBodySensation('')
  }

  const saveEntry = async () => {
    setSaving(true)
    try {
      const { data, error } = await supabase
        .from('entries')
        .insert({
          user_id: profile.id, event, thought, feelings,
          other_feeling: otherFeeling,
          category: category === 'Other' ? otherCategory : category,
          intensity,
          health: { sleep, factors: healthFactors, otherFactor: otherHealthFactor,
            cycleDay, cyclePhase, bodySensations, otherBodySensation },
        } as any)
        .select().single()
      if (error) throw error
      setEntries([data, ...entries])
      resetForm()
      setView('saved')
      setTimeout(() => setView('home'), 2000)
    } catch (err) { console.error('Error saving:', err) }
    finally { setSaving(false) }
  }

  const toggleFeeling = (name: string) => {
    setFeelings(prev => prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name])
  }
  const toggleHealthFactor = (name: string) => {
    if (name === 'None') setHealthFactors(['None'])
    else setHealthFactors(prev => {
      const filtered = prev.filter(f => f !== 'None')
      return filtered.includes(name) ? filtered.filter(f => f !== name) : [...filtered, name]
    })
  }
  const toggleBodySensation = (name: string) => {
    if (name === 'None') setBodySensations(['None'])
    else setBodySensations(prev => {
      const filtered = prev.filter(f => f !== 'None')
      return filtered.includes(name) ? filtered.filter(f => f !== name) : [...filtered, name]
    })
  }

  const canSave = feelings.length > 0 && category
  const displayName = userName || 'there'

  if (view === 'home') {
    return (
      <div className="py-8 animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-light mb-2">Hello, {displayName}</h1>
          <p className="text-white/50">Track your patterns. Update your priors.</p>
        </div>
        <button onClick={() => setView('form')} className="btn btn-primary w-full py-4 text-base">
          New Entry
        </button>
        {entries.length > 0 && (
          <div className="card mt-8">
            <div className="text-center mb-4">
              <div className="text-4xl font-light">{entries.length}</div>
              <div className="text-white/50 text-sm">entries recorded</div>
            </div>
            {patterns.categoryPatterns && patterns.categoryPatterns.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <div className="text-xs text-primary-light uppercase tracking-wider mb-3">Your Top Pattern</div>
                <p className="text-sm text-white/80">
                  In <strong>{patterns.categoryPatterns[0].category.toLowerCase()}</strong> situations, 
                  you tend to feel <strong style={{ color: FEELINGS.find(f => f.name === patterns.categoryPatterns![0].dominantFeeling)?.color }}>
                    {patterns.categoryPatterns[0].dominantFeeling?.toLowerCase()}
                  </strong> ({patterns.categoryPatterns[0].frequency}% of the time)
                </p>
                <p className="text-xs text-white/40 mt-2">This is your brain's prediction — your prior.</p>
                {!isPremium && patterns.categoryPatterns.length > 1 && (
                  <div className="mt-4 relative">
                    <div className="blur-sm opacity-50">
                      <p className="text-sm text-white/60">+ {patterns.categoryPatterns.length - 1} more patterns</p>
                    </div>
                    <a href="/settings" className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-primary px-3 py-1 rounded text-sm">Upgrade to see all</span>
                    </a>
                  </div>
                )}
              </div>
            )}
            {!patterns.categoryPatterns && entries.length < 5 && (
              <div className="pt-4 border-t border-white/10 text-center">
                <div className="text-xs text-white/40 mb-2">{5 - entries.length} more entries to reveal patterns</div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-primary-light" style={{ width: `${(entries.length / 5) * 100}%` }} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  if (view === 'saved') {
    return (
      <div className="py-20 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-light mb-2">Entry Saved</h2>
        <p className="text-white/50">Your patterns are updating...</p>
      </div>
    )
  }

  return (
    <div className="py-6 animate-slide-up">
      <button onClick={() => { setView('home'); resetForm() }} className="text-white/50 text-sm mb-6 flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg> Back
      </button>

      <div className="card">
        <div className="text-xs text-primary-light uppercase tracking-wider mb-4">What's this about?</div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${category === cat ? 'bg-primary/30 border border-primary' : 'bg-white/5 border border-white/10'}`}>
              {cat}
            </button>
          ))}
        </div>
        {category === 'Other' && (
          <input type="text" value={otherCategory} onChange={(e) => setOtherCategory(e.target.value)}
            placeholder="Describe..." className="input mt-3" />
        )}
      </div>

      {prediction && (
        <div className="card bg-primary/10 border-primary/30 animate-fade-in">
          <div className="text-xs text-primary-light uppercase tracking-wider mb-2">Your Brain's Prediction</div>
          <p className="text-sm text-white/90">
            In {category.toLowerCase()} situations, you tend to feel{' '}
            <strong style={{ color: FEELINGS.find(f => f.name === prediction.feeling)?.color }}>{prediction.feeling?.toLowerCase()}</strong>{' '}
            {prediction.frequency}% of the time.
          </p>
          <p className="text-xs text-white/50 mt-2">This is your prior. Notice if it holds true this time.</p>
        </div>
      )}

      <div className="card">
        <div className="text-xs text-primary-light uppercase tracking-wider mb-4">What happened?</div>
        <textarea value={event} onChange={(e) => setEvent(e.target.value)}
          placeholder="Describe the situation..." className="input min-h-[100px] resize-none" />
      </div>

      <div className="card">
        <div className="text-xs text-primary-light uppercase tracking-wider mb-4">What thought came up?</div>
        <textarea value={thought} onChange={(e) => setThought(e.target.value)}
          placeholder="What went through your mind?" className="input min-h-[80px] resize-none" />
      </div>

      <div className="card">
        <div className="text-xs text-primary-light uppercase tracking-wider mb-4">How do you feel?</div>
        <div className="flex flex-wrap gap-2">
          {FEELINGS.map(f => (
            <button key={f.name} onClick={() => toggleFeeling(f.name)} className="feeling-chip"
              style={{ borderColor: feelings.includes(f.name) ? f.color : undefined,
                backgroundColor: feelings.includes(f.name) ? `${f.color}20` : undefined,
                color: feelings.includes(f.name) ? f.color : undefined }}>
              {f.name}
            </button>
          ))}
        </div>
        {feelings.includes('Other') && (
          <input type="text" value={otherFeeling} onChange={(e) => setOtherFeeling(e.target.value)}
            placeholder="Describe your feeling..." className="input mt-3" />
        )}
      </div>

      <div className="card">
        <div className="text-xs text-primary-light uppercase tracking-wider mb-2">Where do you feel it in your body?</div>
        <p className="text-xs text-white/40 mb-4">Your body holds important signals about your emotional state.</p>
        <div className="flex flex-wrap gap-2">
          {BODY_SENSATIONS.map(s => (
            <button key={s} onClick={() => toggleBodySensation(s)}
              className={`px-3 py-2 rounded-lg text-sm transition-all ${bodySensations.includes(s) ? 'bg-white/20 border border-white/40' : 'bg-white/5 border border-white/10'}`}>
              {s}
            </button>
          ))}
        </div>
        {bodySensations.includes('Other') && (
          <input type="text" value={otherBodySensation} onChange={(e) => setOtherBodySensation(e.target.value)}
            placeholder="Describe the sensation..." className="input mt-3" />
        )}
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xs text-primary-light uppercase tracking-wider">Intensity</div>
          <div className="text-xl font-light">{intensity}</div>
        </div>
        <input type="range" min="1" max="10" value={intensity} onChange={(e) => setIntensity(parseInt(e.target.value))} className="w-full accent-primary" />
        <div className="flex justify-between text-xs text-white/40 mt-1"><span>Mild</span><span>Intense</span></div>
      </div>

      <div className="text-xs text-white/40 uppercase tracking-wider mt-6 mb-3">Body State</div>

      {settings.trackSleep && (
        <div className="card">
          <div className="text-xs text-primary-light uppercase tracking-wider mb-4">Last night's sleep</div>
          <div className="flex gap-2">
            {SLEEP_OPTIONS.map(opt => (
              <button key={opt} onClick={() => setSleep(opt)}
                className={`flex-1 py-3 rounded-lg text-sm transition-all ${sleep === opt ? 'bg-white/20 border border-white/40' : 'bg-white/5 border border-white/10'}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {settings.trackCycle && (
        <div className="card">
          <div className="text-xs text-primary-light uppercase tracking-wider mb-4">Menstrual Cycle</div>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-xs text-white/50 block mb-2">Cycle day</label>
              <input type="number" value={cycleDay} onChange={(e) => setCycleDay(e.target.value)}
                placeholder="1-28" className="input" min="1" max="35" />
            </div>
            {cyclePhase && (
              <div className="flex-1 py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-center">
                <div className="text-xs text-white/50 mb-1">Phase</div>
                <div className="text-sm font-medium">{cyclePhase}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {settings.trackHealth && (
        <div className="card">
          <div className="text-xs text-primary-light uppercase tracking-wider mb-4">Health factors today</div>
          <div className="flex flex-wrap gap-2">
            {HEALTH_FACTORS.map(factor => (
              <button key={factor} onClick={() => toggleHealthFactor(factor)}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${healthFactors.includes(factor) ? 'bg-white/20 border border-white/40' : 'bg-white/5 border border-white/10'}`}>
                {factor}
              </button>
            ))}
          </div>
          {healthFactors.includes('Other') && (
            <input type="text" value={otherHealthFactor} onChange={(e) => setOtherHealthFactor(e.target.value)}
              placeholder="Describe..." className="input mt-3" />
          )}
        </div>
      )}

      {canSave && (
        <button onClick={saveEntry} disabled={saving} className="btn btn-primary w-full py-4 mt-4">
          {saving ? 'Saving...' : 'Save Entry'}
        </button>
      )}
    </div>
  )
}

function detectPatterns(entries: any[]) {
  if (entries.length < 5) return { categoryPatterns: null }
  const patterns: Record<string, { feelings: Record<string, number>; count: number }> = {}
  entries.forEach(entry => {
    if (!entry.category) return
    if (!patterns[entry.category]) patterns[entry.category] = { feelings: {}, count: 0 }
    patterns[entry.category].count++
    entry.feelings?.forEach((f: string) => {
      patterns[entry.category].feelings[f] = (patterns[entry.category].feelings[f] || 0) + 1
    })
  })
  const categoryPatterns = Object.entries(patterns)
    .filter(([_, data]) => data.count >= 2)
    .map(([category, data]) => {
      const sorted = Object.entries(data.feelings).sort((a, b) => b[1] - a[1])
      const top = sorted[0]
      return { category, dominantFeeling: top?.[0], frequency: top ? Math.round((top[1] / data.count) * 100) : 0, count: data.count }
    })
    .sort((a, b) => b.count - a.count)
  return { categoryPatterns: categoryPatterns.length ? categoryPatterns : null }
}

function generatePrediction(patterns: { categoryPatterns: any[] | null }, category: string) {
  if (!patterns.categoryPatterns) return null
  const match = patterns.categoryPatterns.find(p => p.category === category)
  if (!match) return null
  return { feeling: match.dominantFeeling, frequency: match.frequency, count: match.count }
}
