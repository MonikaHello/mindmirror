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

const SLEEP_OPTIONS = [
  { name: 'Poor', icon: '😫' },
  { name: 'Fair', icon: '😐' },
  { name: 'Good', icon: '🙂' },
  { name: 'Great', icon: '😴' },
]

const HEALTH_FACTORS = [
  { name: 'Sick/Ill', icon: '🤒' },
  { name: 'Pain', icon: '⚡' },
  { name: 'Headache', icon: '🤕' },
  { name: 'Low energy', icon: '🔋' },
  { name: 'Caffeine', icon: '☕' },
  { name: 'Alcohol', icon: '🍷' },
  { name: 'Medication', icon: '💊' },
  { name: 'Skipped meals', icon: '🍽️' },
  { name: 'Exercise', icon: '🏃' },
  { name: 'Hungover', icon: '😵' },
  { name: 'Hormonal', icon: '🌀' },
  { name: 'None', icon: '✓' },
  { name: 'Other', icon: '...' },
]

const CYCLE_PHASES = [
  { name: 'Menstrual', days: '1-5', icon: '🔴' },
  { name: 'Follicular', days: '6-14', icon: '🌱' },
  { name: 'Ovulation', days: '14-16', icon: '☀️' },
  { name: 'Luteal', days: '17-28', icon: '🌙' },
]

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

  // Form state
  const [event, setEvent] = useState('')
  const [thought, setThought] = useState('')
  const [feelings, setFeelings] = useState<string[]>([])
  const [otherFeeling, setOtherFeeling] = useState('')
  const [category, setCategory] = useState('')
  const [otherCategory, setOtherCategory] = useState('')
  const [intensity, setIntensity] = useState(5)
  
  // Somatic markers
  const [sleep, setSleep] = useState('')
  const [healthFactors, setHealthFactors] = useState<string[]>([])
  const [otherHealthFactor, setOtherHealthFactor] = useState('')
  const [cyclePhase, setCyclePhase] = useState('')
  const [cycleDay, setCycleDay] = useState('')

  // Load settings
  useEffect(() => {
    if (profile?.settings) {
      setSettings(profile.settings)
    }
  }, [profile])

  // Pattern detection
  const patterns = detectPatterns(entries)
  const prediction = category ? generatePrediction(patterns, category) : null

  const resetForm = () => {
    setEvent('')
    setThought('')
    setFeelings([])
    setOtherFeeling('')
    setCategory('')
    setOtherCategory('')
    setIntensity(5)
    setSleep('')
    setHealthFactors([])
    setOtherHealthFactor('')
    setCyclePhase('')
    setCycleDay('')
  }

  const saveEntry = async () => {
    setSaving(true)
    try {
      const { data, error } = await supabase
        .from('entries')
        .insert({
          user_id: profile.id,
          event,
          thought,
          feelings,
          other_feeling: otherFeeling,
          category: category === 'Other' ? otherCategory : category,
          intensity,
          health: {
            sleep,
            factors: healthFactors,
            otherFactor: otherHealthFactor,
            cyclePhase,
            cycleDay,
          },
        } as any)
        .select()
        .single()
      if (error) throw error
      setEntries([data, ...entries])
      resetForm()
      setView('saved')
      setTimeout(() => setView('home'), 2000)
    } catch (err) {
      console.error('Error saving:', err)
    } finally {
      setSaving(false)
    }
  }

  const toggleFeeling = (name: string) => {
    setFeelings(prev => prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name])
  }

  const toggleHealthFactor = (name: string) => {
    if (name === 'None') {
      setHealthFactors(['None'])
    } else {
      setHealthFactors(prev => {
        const filtered = prev.filter(f => f !== 'None')
        return filtered.includes(name) ? filtered.filter(f => f !== name) : [...filtered, name]
      })
    }
  }

  const canSave = feelings.length > 0 && category

  const displayName = userName || 'there'

  // HOME VIEW
  if (view === 'home') {
    return (
      <div className="py-8 animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-light mb-2">Hello, {displayName}</h1>
          <p className="text-white/50">How are you feeling today?</p>
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
                  you tend to feel{' '}
                  <strong style={{ color: FEELINGS.find(f => f.name === patterns.categoryPatterns![0].dominantFeeling)?.color }}>
                    {patterns.categoryPatterns[0].dominantFeeling?.toLowerCase()}
                  </strong> ({patterns.categoryPatterns[0].frequency}% of the time)
                </p>
                
                {/* Blurred patterns for free users */}
                {!isPremium && patterns.categoryPatterns.length > 1 && (
                  <div className="mt-4 relative">
                    <div className="blur-sm opacity-50">
                      <p className="text-sm text-white/60">
                        + {patterns.categoryPatterns.length - 1} more patterns discovered
                      </p>
                    </div>
                    <a href="/settings" className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-primary px-3 py-1 rounded text-sm">Upgrade to see more</span>
                    </a>
                  </div>
                )}
              </div>
            )}

            {!patterns.categoryPatterns && entries.length < 5 && (
              <div className="pt-4 border-t border-white/10 text-center">
                <div className="text-xs text-white/40 mb-2">
                  {5 - entries.length} more entries to unlock patterns
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary-light"
                    style={{ width: `${(entries.length / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // SAVED VIEW
  if (view === 'saved') {
    return (
      <div className="py-20 text-center animate-fade-in">
        <div className="text-5xl mb-4">✓</div>
        <h2 className="text-2xl font-light mb-2">Entry Saved</h2>
        <p className="text-white/50">Your patterns are updating...</p>
      </div>
    )
  }

  // FORM VIEW
  return (
    <div className="py-6 animate-slide-up">
      <button onClick={() => { setView('home'); resetForm() }} className="text-white/50 text-sm mb-6">
        ← Back
      </button>

      {/* Category */}
      <div className="card">
        <div className="text-xs text-primary-light uppercase tracking-wider mb-4">What's this about?</div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                category === cat ? 'bg-primary/30 border-primary' : 'bg-white/5 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {category === 'Other' && (
          <input
            type="text"
            value={otherCategory}
            onChange={(e) => setOtherCategory(e.target.value)}
            placeholder="Describe the category..."
            className="input mt-3"
          />
        )}
      </div>

      {/* Prediction */}
      {prediction && (
        <div className="card bg-primary/10 border-primary/30 animate-fade-in">
          <div className="text-xs text-primary-light uppercase tracking-wider mb-2">Pattern Prediction</div>
          <p className="text-sm text-white/90">
            In {category.toLowerCase()} situations, you tend to feel{' '}
            <strong style={{ color: FEELINGS.find(f => f.name === prediction.feeling)?.color }}>
              {prediction.feeling?.toLowerCase()}
            </strong>{' '}
            {prediction.frequency}% of the time.
          </p>
          {!isPremium && (
            <p className="text-xs text-white/50 mt-2">Upgrade for deeper insights →</p>
          )}
        </div>
      )}

      {/* Event */}
      <div className="card">
        <div className="text-xs text-primary-light uppercase tracking-wider mb-4">What happened?</div>
        <textarea
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          placeholder="Describe the situation..."
          className="input min-h-[100px]"
        />
      </div>

      {/* Thought */}
      <div className="card">
        <div className="text-xs text-primary-light uppercase tracking-wider mb-4">Your thought</div>
        <textarea
          value={thought}
          onChange={(e) => setThought(e.target.value)}
          placeholder="What went through your mind?"
          className="input min-h-[80px]"
        />
      </div>

      {/* Feelings */}
      <div className="card">
        <div className="text-xs text-primary-light uppercase tracking-wider mb-4">How do you feel?</div>
        <div className="flex flex-wrap gap-2">
          {FEELINGS.map(f => (
            <button
              key={f.name}
              onClick={() => toggleFeeling(f.name)}
              className="feeling-chip"
              style={{
                borderColor: feelings.includes(f.name) ? f.color : undefined,
                backgroundColor: feelings.includes(f.name) ? `${f.color}20` : undefined,
                color: feelings.includes(f.name) ? f.color : undefined,
              }}
            >
              {f.name}
            </button>
          ))}
        </div>
        {feelings.includes('Other') && (
          <input
            type="text"
            value={otherFeeling}
            onChange={(e) => setOtherFeeling(e.target.value)}
            placeholder="Describe your feeling..."
            className="input mt-3"
          />
        )}
      </div>

      {/* Intensity */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xs text-primary-light uppercase tracking-wider">Intensity</div>
          <div className="text-xl font-light">{intensity}</div>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={intensity}
          onChange={(e) => setIntensity(parseInt(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-white/40 mt-1">
          <span>Mild</span>
          <span>Intense</span>
        </div>
      </div>

      {/* SOMATIC MARKERS */}
      <div className="text-xs text-accent uppercase tracking-wider mt-6 mb-3 flex items-center gap-2">
        <span>🧠</span> Body-Mind Connection
      </div>

      {/* Sleep */}
      {settings.trackSleep && (
        <div className="card">
          <div className="text-xs text-primary-light uppercase tracking-wider mb-4">Last night's sleep</div>
          <div className="flex gap-2">
            {SLEEP_OPTIONS.map(opt => (
              <button
                key={opt.name}
                onClick={() => setSleep(opt.name)}
                className={`flex-1 py-3 rounded-lg text-sm transition-all flex flex-col items-center gap-1 ${
                  sleep === opt.name ? 'bg-accent/20 border border-accent/40' : 'bg-white/5 border border-white/10'
                }`}
              >
                <span className="text-lg">{opt.icon}</span>
                <span>{opt.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cycle Phase */}
      {settings.trackCycle && (
        <div className="card">
          <div className="text-xs text-primary-light uppercase tracking-wider mb-4">Menstrual Cycle</div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {CYCLE_PHASES.map(phase => (
              <button
                key={phase.name}
                onClick={() => setCyclePhase(phase.name)}
                className={`py-3 rounded-lg text-sm transition-all flex items-center justify-center gap-2 ${
                  cyclePhase === phase.name ? 'bg-accent/20 border border-accent/40' : 'bg-white/5 border border-white/10'
                }`}
              >
                <span>{phase.icon}</span>
                <span>{phase.name}</span>
              </button>
            ))}
          </div>
          <input
            type="number"
            value={cycleDay}
            onChange={(e) => setCycleDay(e.target.value)}
            placeholder="Cycle day (1-28)"
            className="input"
            min="1"
            max="35"
          />
        </div>
      )}

      {/* Health Factors */}
      {settings.trackHealth && (
        <div className="card">
          <div className="text-xs text-primary-light uppercase tracking-wider mb-4">Health factors today</div>
          <div className="flex flex-wrap gap-2">
            {HEALTH_FACTORS.map(factor => (
              <button
                key={factor.name}
                onClick={() => toggleHealthFactor(factor.name)}
                className={`px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                  healthFactors.includes(factor.name) ? 'bg-accent/20 border border-accent/40' : 'bg-white/5 border border-white/10'
                }`}
              >
                <span>{factor.icon}</span>
                <span>{factor.name}</span>
              </button>
            ))}
          </div>
          {healthFactors.includes('Other') && (
            <input
              type="text"
              value={otherHealthFactor}
              onChange={(e) => setOtherHealthFactor(e.target.value)}
              placeholder="Describe other factor..."
              className="input mt-3"
            />
          )}
        </div>
      )}

      {/* Save Button */}
      {canSave && (
        <button onClick={saveEntry} disabled={saving} className="btn btn-primary w-full py-4 mt-4">
          {saving ? 'Saving...' : 'Save Entry'}
        </button>
      )}
    </div>
  )
}

// Pattern detection
function detectPatterns(entries: any[]) {
  if (entries.length < 5) return { categoryPatterns: null }

  const patterns: Record<string, { feelings: Record<string, number>; count: number }> = {}

  entries.forEach(entry => {
    if (!entry.category) return
    if (!patterns[entry.category]) {
      patterns[entry.category] = { feelings: {}, count: 0 }
    }
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
      return {
        category,
        dominantFeeling: top?.[0],
        frequency: top ? Math.round((top[1] / data.count) * 100) : 0,
        count: data.count,
      }
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
