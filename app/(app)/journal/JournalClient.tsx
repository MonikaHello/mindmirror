'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

const FEELINGS = [
  { name: 'Anxious', color: '#E8B4B8' },
  { name: 'Sad', color: '#A8C5DA' },
  { name: 'Angry', color: '#D4A5A5' },
  { name: 'Frustrated', color: '#C9B1D4' },
  { name: 'Overwhelmed', color: '#B8C5B8' },
  { name: 'Calm', color: '#B8D4C8' },
  { name: 'Happy', color: '#D4D8A8' },
  { name: 'Irritable', color: '#D4B8B8' },
  { name: 'Other', color: '#9CA3AF' },
]

const CATEGORIES = [
  'Work/Career', 'Relationships', 'Health', 'Finances',
  'Social', 'Family', 'Self', 'Future', 'Other'
]

export default function JournalClient({ initialEntries, profile, isPremium 
}: any) {
  const supabase = createClient()
  const [entries, setEntries] = useState(initialEntries || [])
  const [view, setView] = useState<'home' | 'form' | 'saved'>('home')
  const [saving, setSaving] = useState(false)

  const [event, setEvent] = useState('')
  const [thought, setThought] = useState('')
  const [feelings, setFeelings] = useState<string[]>([])
  const [category, setCategory] = useState('')
  const [intensity, setIntensity] = useState(5)

  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [duration, setDuration] = useState(0)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: 
true })
      mediaRecorder.current = new MediaRecorder(stream)
      chunks.current = []
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data)
      }
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm' })
        setAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach(track => track.stop())
      }
      mediaRecorder.current.start()
      setIsRecording(true)
      setDuration(0)
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000)
    } catch (err) {
      alert('Microphone access denied')
    }
  }

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop()
      setIsRecording(false)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }

  const clearRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setAudioUrl(null)
    setDuration(0)
  }

  const resetForm = () => {
    setEvent('')
    setThought('')
    setFeelings([])
    setCategory('')
    setIntensity(5)
    clearRecording()
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
          category,
          intensity,
          voice_note_duration: audioUrl ? duration : null,
        }as any )
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
    setFeelings(prev => prev.includes(name) ? prev.filter(f => f !== name) 
: [...prev, name])
  }

  const formatDuration = (s: number) => `${Math.floor(s / 60)}:${(s % 
60).toString().padStart(2, '0')}`

  if (view === 'home') {
    return (
      <div className="py-8 animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-light mb-3">How are you 
feeling?</h1>
          <p className="text-white/50">Capture what's on your mind.</p>
        </div>
        <button onClick={() => setView('form')} className="btn btn-primary 
w-full py-4">
          New Entry
        </button>
        {entries.length > 0 && (
          <div className="card mt-8 text-center">
            <div className="text-4xl font-light">{entries.length}</div>
            <div className="text-white/50 text-sm">entries recorded</div>
          </div>
        )}
      </div>
    )
  }

  if (view === 'saved') {
    return (
      <div className="py-20 text-center animate-fade-in">
        <div className="text-4xl mb-4">✓</div>
        <h2 className="text-2xl font-light">Entry Saved</h2>
      </div>
    )
  }

  return (
    <div className="py-6 animate-slide-up">
      <button onClick={() => { setView('home'); clearRecording() }} 
className="text-white/50 text-sm mb-6">
        ← Back
      </button>

      <div className="card mb-4">
        <div className="text-xs text-primary-light uppercase 
tracking-wider mb-4">🎤 Voice Note (optional)</div>
        {!audioUrl ? (
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-16 h-16 rounded-full flex items-center 
justify-center ${isRecording ? 'bg-red-500' : 'bg-primary'}`}
          >
            {isRecording ? '⏹' : '🎤'}
          </button>
        ) : (
          <div>
            <audio src={audioUrl} controls className="w-full" />
            <button onClick={clearRecording} className="text-red-400 
text-sm mt-2">Delete</button>
          </div>
        )}
        {isRecording && <div 
className="mt-2">{formatDuration(duration)}</div>}
      </div>

      <div className="card">
        <div className="text-xs text-primary-light uppercase 
tracking-wider mb-4">Category</div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm ${category === cat 
? 'bg-primary/30' : 'bg-white/5'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="text-xs text-primary-light uppercase 
tracking-wider mb-4">What happened?</div>
        <textarea
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          placeholder="Describe the situation..."
          className="input min-h-[100px]"
        />
      </div>

      <div className="card">
        <div className="text-xs text-primary-light uppercase 
tracking-wider mb-4">Your thought</div>
        <textarea
          value={thought}
          onChange={(e) => setThought(e.target.value)}
          placeholder="What went through your mind?"
          className="input min-h-[80px]"
        />
      </div>

      <div className="card">
        <div className="text-xs text-primary-light uppercase 
tracking-wider mb-4">How do you feel?</div>
        <div className="flex flex-wrap gap-2">
          {FEELINGS.map(f => (
            <button
              key={f.name}
              onClick={() => toggleFeeling(f.name)}
              className="feeling-chip"
              style={{
                borderColor: feelings.includes(f.name) ? f.color : 
undefined,
                backgroundColor: feelings.includes(f.name) ? 
`${f.color}20` : undefined,
              }}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="text-xs text-primary-light uppercase 
tracking-wider mb-4">Intensity: {intensity}</div>
        <input
          type="range"
          min="1"
          max="10"
          value={intensity}
          onChange={(e) => setIntensity(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {(feelings.length > 0 || audioUrl) && (
        <button onClick={saveEntry} disabled={saving} className="btn 
btn-primary w-full py-4 mt-4">
          {saving ? 'Saving...' : 'Save Entry'}
        </button>
      )}
    </div>
  )
}
