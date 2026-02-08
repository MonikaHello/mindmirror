'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const C = {
  brown: "#69443c",
  darkBg: "#111111", darkCard: "#1a1a1a",
  darkBorder: "#ffffff12", darkMuted: "#ffffff80", darkLight: "#ffffff50",
  creamLight: "#d4c4bc",
}

export default function SettingsPage() {
  const [cycleTracking, setCycleTracking] = useState(true)
  const [notifications, setNotifications] = useState(false)
  const [importStep, setImportStep] = useState<'idle' | 'upload' | 'processing' | 'review' | 'complete'>('idle')
  const [extractedEntries, setExtractedEntries] = useState<any[]>([])
  const [currentReview, setCurrentReview] = useState(0)
  const [processingStatus, setProcessingStatus] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const toggle = (val: boolean, setVal: any) => (
    <button
      onClick={() => setVal(!val)}
      className="w-12 h-6 rounded-full transition-all"
      style={{ background: val ? C.brown : '#374151' }}
    >
      <div
        className="w-5 h-5 bg-white rounded-full transition-transform"
        style={{ transform: val ? 'translateX(26px)' : 'translateX(2px)' }}
      />
    </button>
  )

  // Convert image file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve((reader.result as string).split(',')[1])
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // Analyze journal image with Claude Vision
  const analyzeJournalImage = async (base64Image: string, mediaType: string) => {
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          messages: [{
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: mediaType, data: base64Image }
              },
              {
                type: "text",
                text: `You are analyzing a handwritten or typed journal page for a mental health tracking app based on predictive processing theory.

Extract ALL journal entries from this image. For each entry, identify:
1. The date (if visible, otherwise use "Unknown")
2. The original text (transcribe what's written)
3. The category: Work/Career, Relationships, Health, Social situations, Family, Self-image, Future planning, Daily tasks, or Other
4. The main thought or cognitive pattern
5. Any prediction the person made (what they expected to happen)
6. Feelings mentioned: Anxious, Sad, Angry, Frustrated, Overwhelmed, Hopeless, Ashamed, Lonely, Calm, Happy, Irritable, Numb, Guilty
7. Body sensations mentioned: Chest tightness, Stomach knots, Shoulder/neck tension, Headache/pressure, Racing heart, Shallow breathing, Heaviness, Restlessness, Fatigue, Numbness, Warmth/flushing
8. Whether the prediction matched reality (true/false/null if unknown)

Respond ONLY with valid JSON array:
[
  {
    "date": "Jan 15, 2025",
    "originalText": "transcribed text here",
    "category": "Social situations",
    "thought": "main cognitive pattern",
    "prediction": "what they expected",
    "feelings": ["Anxious"],
    "sensations": ["Stomach knots"],
    "matched": false
  }
]

If you cannot read the handwriting clearly, do your best. If no entries are visible, return an empty array [].`
              }
            ]
          }]
        })
      })
      
      const data = await response.json()
      const text = data.content?.[0]?.text || '[]'
      const cleaned = text.replace(/```json|```/g, '').trim()
      return JSON.parse(cleaned)
    } catch (err) {
      console.error("Vision API error:", err)
      return []
    }
  }

  // Handle file upload
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    
    setImportStep('processing')
    setProcessingStatus(`Processing ${files.length} image${files.length > 1 ? 's' : ''}...`)
    
    const allEntries: any[] = []
    
    for (let i = 0; i < files.length; i++) {
      setProcessingStatus(`Analyzing page ${i + 1} of ${files.length}...`)
      const file = files[i]
      const base64 = await fileToBase64(file)
      const mediaType = file.type || 'image/jpeg'
      const entries = await analyzeJournalImage(base64, mediaType)
      allEntries.push(...entries)
    }
    
    if (allEntries.length > 0) {
      setExtractedEntries(allEntries)
      setImportStep('review')
    } else {
      setExtractedEntries([{
        date: "Unknown",
        originalText: "Could not extract entries from the uploaded image(s).",
        category: "Other",
        thought: "",
        prediction: "",
        feelings: [],
        sensations: [],
        matched: null,
      }])
      setImportStep('review')
    }
  }

  // Update extracted entry
  const updateEntry = (field: string, value: any) => {
    setExtractedEntries(prev => {
      const updated = [...prev]
      updated[currentReview] = { ...updated[currentReview], [field]: value }
      return updated
    })
  }

  const toggleArrayField = (field: string, value: string) => {
    setExtractedEntries(prev => {
      const updated = [...prev]
      const current = updated[currentReview][field] || []
      updated[currentReview] = {
        ...updated[currentReview],
        [field]: current.includes(value) 
          ? current.filter((x: string) => x !== value)
          : [...current, value]
      }
      return updated
    })
  }

  const chipStyle = (selected: boolean) => ({
    padding: '9px 18px',
    borderRadius: 999,
    fontSize: 13,
    cursor: 'pointer',
    border: selected ? `1.5px solid ${C.brown}` : `1px solid ${C.darkBorder}`,
    background: selected ? `${C.brown}25` : C.darkCard,
    color: selected ? '#e8c4b8' : C.darkMuted,
  })

  // Import Modal - Upload
  if (importStep === 'upload') {
    return (
      <div className="min-h-screen pb-20" style={{ background: C.darkBg, color: 'white', paddingTop: 80 }}>
        <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: `${C.darkBg}ee`, backdropFilter: 'blur(14px)', borderBottom: `1px solid ${C.darkBorder}` }}>
          <div className="max-w-xl mx-auto px-6 py-2.5 flex justify-between items-center">
            <Link href="/"><Image src="/logo.png" alt="MindMirror" width={36} height={36} className="invert" /></Link>
            <div className="flex gap-5 text-sm">
              <Link href="/journal" style={{ color: C.darkLight }}>Journal</Link>
              <Link href="/patterns" style={{ color: C.darkLight }}>Patterns</Link>
              <Link href="/settings" style={{ color: C.creamLight, fontWeight: 600 }}>Settings</Link>
            </div>
          </div>
        </nav>
        
        <div className="max-w-xl mx-auto px-6">
          <button onClick={() => setImportStep('idle')} className="text-sm mb-6 flex items-center gap-1.5" style={{ color: C.darkLight }}>
            ← Back to settings
          </button>
          <h2 className="text-2xl font-light mb-1">Import Journal</h2>
          <p className="text-sm mb-9" style={{ color: C.darkLight }}>
            AI will read your handwriting, extract entries, and find patterns automatically.
          </p>
          
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            multiple 
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer mb-6"
            style={{ borderColor: C.darkBorder }}
          >
            <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ background: `${C.brown}20` }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.creamLight} strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
            </div>
            <p className="font-medium mb-2">Upload journal photos</p>
            <p className="text-sm" style={{ color: C.darkLight }}>Tap to take photos or select from library</p>
          </div>
          
          <div className="p-6 rounded-2xl" style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}` }}>
            <p className="font-medium mb-4">Tips for best results</p>
            <div className="text-sm leading-loose" style={{ color: C.darkMuted }}>
              <p>• Good lighting, minimal shadows</p>
              <p>• Capture full pages, keep text readable</p>
              <p>• Works with handwriting and typed text</p>
              <p>• Date your entries if possible</p>
            </div>
          </div>
          
          <div className="p-4 rounded-xl mt-5" style={{ background: `${C.brown}15`, border: `1px solid ${C.brown}30` }}>
            <p className="text-xs" style={{ color: C.creamLight }}>
              🔒 Your photos are analyzed by AI but never stored.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Import Modal - Processing
  if (importStep === 'processing') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: C.darkBg, color: 'white' }}>
        <div className="text-center p-10">
          <div className="w-20 h-20 rounded-2xl mx-auto mb-7 flex items-center justify-center animate-pulse" style={{ background: `${C.brown}20` }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={C.creamLight} strokeWidth="1.5">
              <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
            </svg>
          </div>
          <h3 className="text-xl font-light mb-3">Analyzing your journal...</h3>
          <p className="text-sm" style={{ color: C.darkLight }}>{processingStatus}</p>
          <p className="text-xs mt-4" style={{ color: C.darkLight }}>AI is reading your handwriting and extracting entries</p>
        </div>
      </div>
    )
  }

  // Import Modal - Review
  if (importStep === 'review') {
    const entry = extractedEntries[currentReview]
    const progress = ((currentReview + 1) / extractedEntries.length) * 100
    
    return (
      <div className="min-h-screen pb-20" style={{ background: C.darkBg, color: 'white', paddingTop: 80 }}>
        <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: `${C.darkBg}ee`, backdropFilter: 'blur(14px)', borderBottom: `1px solid ${C.darkBorder}` }}>
          <div className="max-w-xl mx-auto px-6 py-2.5 flex justify-between items-center">
            <Link href="/"><Image src="/logo.png" alt="MindMirror" width={36} height={36} className="invert" /></Link>
            <div className="flex gap-5 text-sm">
              <Link href="/journal" style={{ color: C.darkLight }}>Journal</Link>
              <Link href="/patterns" style={{ color: C.darkLight }}>Patterns</Link>
              <Link href="/settings" style={{ color: C.creamLight, fontWeight: 600 }}>Settings</Link>
            </div>
          </div>
        </nav>
        
        <div className="max-w-xl mx-auto px-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-light mb-1">Review Entry</h2>
              <p className="text-sm" style={{ color: C.darkLight }}>{currentReview + 1} of {extractedEntries.length} entries</p>
            </div>
            <button onClick={() => setImportStep('idle')} className="text-sm" style={{ color: C.darkLight }}>Skip all</button>
          </div>
          
          <div className="h-1 rounded-full overflow-hidden mb-8" style={{ background: C.darkBg }}>
            <div className="h-full rounded-full transition-all" style={{ background: C.brown, width: `${progress}%` }} />
          </div>
          
          <div className="p-5 rounded-2xl mb-6" style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}` }}>
            <p className="text-xs tracking-wide mb-2" style={{ color: C.darkLight, letterSpacing: '0.1em' }}>ORIGINAL TEXT (EXTRACTED BY AI)</p>
            <p className="text-sm italic leading-relaxed" style={{ color: C.darkMuted }}>"{entry.originalText}"</p>
            <p className="text-xs mt-3" style={{ color: C.darkLight }}>{entry.date}</p>
          </div>
          
          <p className="text-xs tracking-wide mb-4" style={{ color: C.creamLight, letterSpacing: '0.1em' }}>EXTRACTED DATA (EDIT IF NEEDED)</p>
          
          {/* Category */}
          <div className="mb-6">
            <p className="text-xs tracking-wide mb-3" style={{ color: C.creamLight, letterSpacing: '0.12em' }}>CATEGORY</p>
            <div className="flex flex-wrap gap-2">
              {['Work/Career', 'Relationships', 'Social situations', 'Family', 'Health', 'Self-image', 'Future planning', 'Daily tasks', 'Other'].map(c => (
                <button key={c} onClick={() => updateEntry('category', c)} style={chipStyle(entry.category === c)}>{c}</button>
              ))}
            </div>
          </div>
          
          {/* Thought */}
          <div className="mb-6">
            <p className="text-xs tracking-wide mb-3" style={{ color: C.creamLight, letterSpacing: '0.12em' }}>THOUGHT</p>
            <textarea
              value={entry.thought || ''}
              onChange={(e) => updateEntry('thought', e.target.value)}
              className="w-full p-3.5 rounded-xl resize-none outline-none"
              style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, color: 'white', minHeight: 60 }}
            />
          </div>
          
          {/* Prediction */}
          <div className="mb-6">
            <p className="text-xs tracking-wide mb-3" style={{ color: C.creamLight, letterSpacing: '0.12em' }}>PREDICTION</p>
            <textarea
              value={entry.prediction || ''}
              onChange={(e) => updateEntry('prediction', e.target.value)}
              className="w-full p-3.5 rounded-xl resize-none outline-none"
              style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, color: 'white', minHeight: 60 }}
            />
          </div>
          
          {/* Feelings */}
          <div className="mb-6">
            <p className="text-xs tracking-wide mb-3" style={{ color: C.creamLight, letterSpacing: '0.12em' }}>FEELINGS</p>
            <div className="flex flex-wrap gap-1.5">
              {['Anxious', 'Sad', 'Angry', 'Frustrated', 'Overwhelmed', 'Hopeless', 'Ashamed', 'Lonely', 'Calm', 'Happy', 'Irritable', 'Numb', 'Guilty'].map(f => (
                <button key={f} onClick={() => toggleArrayField('feelings', f)} style={chipStyle((entry.feelings || []).includes(f))}>{f}</button>
              ))}
            </div>
          </div>
          
          {/* Sensations */}
          <div className="mb-6">
            <p className="text-xs tracking-wide mb-3" style={{ color: C.creamLight, letterSpacing: '0.12em' }}>BODY SENSATIONS</p>
            <div className="flex flex-wrap gap-1.5">
              {['Chest tightness', 'Stomach knots', 'Racing heart', 'Shoulder/neck tension', 'Headache/pressure', 'Shallow breathing', 'Heaviness', 'Restlessness', 'Fatigue'].map(s => (
                <button key={s} onClick={() => toggleArrayField('sensations', s)} style={chipStyle((entry.sensations || []).includes(s))}>{s}</button>
              ))}
            </div>
          </div>
          
          {/* Matched */}
          <div className="mb-8">
            <p className="text-xs tracking-wide mb-3" style={{ color: C.creamLight, letterSpacing: '0.12em' }}>DID IT MATCH YOUR PREDICTION?</p>
            <div className="flex gap-3">
              {[
                { value: true, label: 'Yes' },
                { value: false, label: 'No' },
                { value: null, label: 'N/A' },
              ].map(opt => (
                <button
                  key={String(opt.value)}
                  onClick={() => updateEntry('matched', opt.value)}
                  className="flex-1 py-3.5 rounded-xl text-sm"
                  style={{
                    border: entry.matched === opt.value ? `1.5px solid ${C.brown}` : `1px solid ${C.darkBorder}`,
                    background: entry.matched === opt.value ? `${C.brown}25` : C.darkCard,
                    color: entry.matched === opt.value ? '#e8c4b8' : C.darkMuted,
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {entry.matched === false && (
              <p className="text-xs mt-3" style={{ color: C.creamLight }}>Prediction error detected. This helps update your priors.</p>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (currentReview < extractedEntries.length - 1) setCurrentReview(currentReview + 1)
                else setImportStep('complete')
              }}
              className="flex-1 py-4 rounded-full text-sm"
              style={{ border: `1px solid ${C.darkBorder}`, color: C.darkMuted }}
            >
              Skip
            </button>
            <button
              onClick={() => {
                if (currentReview < extractedEntries.length - 1) setCurrentReview(currentReview + 1)
                else setImportStep('complete')
              }}
              className="flex-[2] py-4 rounded-full text-sm font-medium"
              style={{ background: C.brown, color: 'white' }}
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Import Modal - Complete
  if (importStep === 'complete') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: C.darkBg, color: 'white' }}>
        <div className="text-center p-10 max-w-sm">
          <div className="w-20 h-20 rounded-full mx-auto mb-7 flex items-center justify-center" style={{ background: `${C.brown}30` }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#81c784" strokeWidth="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h3 className="text-2xl font-light mb-3">Import Complete!</h3>
          <p className="text-sm mb-2"><span className="text-white">{extractedEntries.length} entries</span> added to your journal</p>
          <p className="text-sm mb-9" style={{ color: C.darkLight }}>Your patterns are now being analyzed.</p>
          <Link href="/patterns" className="inline-block py-3.5 px-8 rounded-full text-sm font-medium mb-3" style={{ background: C.brown, color: 'white' }}>
            View Patterns
          </Link>
          <br />
          <button onClick={() => setImportStep('idle')} className="text-sm mt-3" style={{ color: C.creamLight }}>
            Back to Settings
          </button>
        </div>
      </div>
    )
  }

  // Main Settings Page
  return (
    <div className="min-h-screen pb-20" style={{ background: C.darkBg, color: 'white', paddingTop: 80 }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: `${C.darkBg}ee`, backdropFilter: 'blur(14px)', borderBottom: `1px solid ${C.darkBorder}` }}>
        <div className="max-w-xl mx-auto px-6 py-2.5 flex justify-between items-center">
          <Link href="/"><Image src="/logo.png" alt="MindMirror" width={36} height={36} className="invert" /></Link>
          <div className="flex gap-5 text-sm">
            <Link href="/journal" style={{ color: C.darkLight }}>Journal</Link>
            <Link href="/patterns" style={{ color: C.darkLight }}>Patterns</Link>
            <Link href="/settings" style={{ color: C.creamLight, fontWeight: 600 }}>Settings</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-6">
        <h2 className="text-2xl font-light mb-9">Settings</h2>

        {/* Account */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl" style={{ background: `${C.brown}30`, color: C.creamLight }}>
            M
          </div>
          <div>
            <p>monika@example.com</p>
            <p className="text-xs mt-0.5" style={{ color: C.darkLight }}>Free plan</p>
          </div>
        </div>

        {/* Import */}
        <div className="mb-8">
          <p className="text-xs tracking-wide mb-4" style={{ color: C.darkLight, letterSpacing: '0.1em' }}>IMPORT</p>
          <div className="rounded-xl overflow-hidden" style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}` }}>
            <button
              onClick={() => setImportStep('upload')}
              className="w-full p-5 text-left flex justify-between items-center"
            >
              <div>
                <p>Import from paper journal</p>
                <p className="text-xs mt-0.5" style={{ color: C.darkLight }}>Photograph pages to extract entries & patterns</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.darkLight} strokeWidth="1.5">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Tracking */}
        <div className="mb-8">
          <p className="text-xs tracking-wide mb-4" style={{ color: C.darkLight, letterSpacing: '0.1em' }}>TRACKING</p>
          <div className="rounded-xl overflow-hidden" style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}` }}>
            <div className="p-5 flex justify-between items-center" style={{ borderBottom: `1px solid ${C.darkBorder}` }}>
              <div>
                <p>Cycle tracking</p>
                <p className="text-xs mt-0.5" style={{ color: C.darkLight }}>Track menstrual cycle phases</p>
              </div>
              {toggle(cycleTracking, setCycleTracking)}
            </div>
            <div className="p-5 flex justify-between items-center">
              <div>
                <p>Daily reminders</p>
                <p className="text-xs mt-0.5" style={{ color: C.darkLight }}>Get notified to log entries</p>
              </div>
              {toggle(notifications, setNotifications)}
            </div>
          </div>
        </div>

        {/* Data */}
        <div className="mb-8">
          <p className="text-xs tracking-wide mb-4" style={{ color: C.darkLight, letterSpacing: '0.1em' }}>DATA</p>
          <div className="rounded-xl overflow-hidden" style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}` }}>
            <button className="w-full p-5 text-left" style={{ borderBottom: `1px solid ${C.darkBorder}` }}>
              <p>Export data</p>
              <p className="text-xs mt-0.5" style={{ color: C.darkLight }}>Download all your entries as CSV</p>
            </button>
            <button className="w-full p-5 text-left">
              <p style={{ color: '#e57373' }}>Delete all data</p>
              <p className="text-xs mt-0.5" style={{ color: C.darkLight }}>Permanently remove all entries</p>
            </button>
          </div>
        </div>

        {/* Log out */}
        <Link
          href="/"
          className="block w-full py-4 rounded-full text-center text-sm"
          style={{ border: `1px solid ${C.darkBorder}`, color: C.darkMuted }}
        >
          Log out
        </Link>
      </div>
    </div>
  )
}
