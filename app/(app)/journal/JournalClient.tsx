'use client'

import { useState, useEffect, useRef } from 'react'

const C = {
  cream: "#f6f4f0", brown: "#69443c", brownLight: "#8a6b5f",
  darkBg: "#111111", darkCard: "#1a1a1a",
  darkBorder: "#ffffff12", darkMuted: "#ffffff80", darkLight: "#ffffff50",
  creamLight: "#d4c4bc",
}

const FEELINGS = [
  'Anxious', 'Sad', 'Angry', 'Frustrated', 'Overwhelmed', 
  'Hopeless', 'Ashamed', 'Lonely', 'Calm', 'Happy', 
  'Irritable', 'Numb', 'Guilty', 'Other'
]

const SENSATIONS = [
  'Chest tightness', 'Stomach knots', 'Shoulder/neck tension', 
  'Headache/pressure', 'Racing heart', 'Shallow breathing', 
  'Heaviness', 'Restlessness', 'Fatigue', 'Numbness', 
  'Warmth/flushing', 'None', 'Other'
]

const CATEGORIES = [
  'Work/Career', 'Relationships', 'Health', 'Social situations', 
  'Family', 'Self-image', 'Future planning', 'Daily tasks', 'Other'
]

const SLEEP_OPTIONS = ['Poor', 'Fair', 'Good', 'Great']

export default function JournalClient({ initialEntries = [], profile, isPremium }: any) {
  const [entries, setEntries] = useState(initialEntries)
  const [category, setCategory] = useState('')
  const [situation, setSituation] = useState('')
  const [thought, setThought] = useState('')
  const [feelings, setFeelings] = useState<string[]>([])
  const [sensations, setSensations] = useState<string[]>([])
  const [sleep, setSleep] = useState('')
  const [intensity, setIntensity] = useState(5)
  const [matchedPrediction, setMatchedPrediction] = useState<boolean | null>(null)
  
  // AI Prediction state
  const [aiPrediction, setAiPrediction] = useState<any>(null)
  const [loadingPrediction, setLoadingPrediction] = useState(false)

  const toggle = (arr: string[], setArr: any, value: string) => {
    setArr(arr.includes(value) ? arr.filter(x => x !== value) : [...arr, value])
  }

  // AI-powered prediction generation
  const generatePrediction = async (cat: string, pastEntries: any[]) => {
    setLoadingPrediction(true)
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          messages: [{
            role: "user",
            content: `You are a predictive processing assistant for a mental health journaling app. Based on the user's past journal entries, generate a personalized prediction about how they typically feel in ${cat} situations.

Past entries in this category:
${pastEntries.length > 0 ? pastEntries.map(e => `- Felt: ${e.feelings?.join(', ') || 'unknown'}. Body: ${e.sensations?.join(', ') || 'unknown'}. Sleep: ${e.sleep || 'unknown'}`).join('\n') : 'No previous entries in this category yet.'}

Respond in JSON format only:
{
  "prediction": "brief prediction about how they'll likely feel",
  "confidence": number between 50-95,
  "dominantEmotion": "most likely emotion",
  "bodySensation": "most likely body sensation or 'varies'"
}

If no past entries, make a gentle, general prediction based on common patterns for this category. Keep the tone warm and non-judgmental.`
          }]
        })
      })
      const data = await response.json()
      const text = data.content?.[0]?.text || ''
      const cleaned = text.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(cleaned)
      setAiPrediction(parsed)
    } catch (err) {
      // Fallback to pattern-based prediction
      const fallbacks: Record<string, any> = {
        "Work/Career": { prediction: "You may feel pressure to perform", confidence: 65, dominantEmotion: "anxious", bodySensation: "shoulder tension" },
        "Relationships": { prediction: "You might anticipate conflict or disconnection", confidence: 60, dominantEmotion: "anxious", bodySensation: "chest tightness" },
        "Social situations": { prediction: "You tend to expect judgment from others", confidence: 70, dominantEmotion: "anxious", bodySensation: "stomach knots" },
        "Family": { prediction: "Old patterns may resurface", confidence: 62, dominantEmotion: "frustrated", bodySensation: "tension" },
        "Health": { prediction: "You might worry about worst-case scenarios", confidence: 58, dominantEmotion: "anxious", bodySensation: "racing heart" },
        "Self-image": { prediction: "Critical self-talk may arise", confidence: 68, dominantEmotion: "ashamed", bodySensation: "heaviness" },
        "Future planning": { prediction: "Uncertainty may feel overwhelming", confidence: 64, dominantEmotion: "overwhelmed", bodySensation: "shallow breathing" },
        "Daily tasks": { prediction: "Small things might feel bigger than they are", confidence: 55, dominantEmotion: "overwhelmed", bodySensation: "fatigue" },
        "Other": { prediction: "Notice what emotions arise", confidence: 50, dominantEmotion: "varies", bodySensation: "varies" },
      }
      setAiPrediction(fallbacks[cat] || fallbacks["Other"])
    }
    setLoadingPrediction(false)
  }

  useEffect(() => {
    if (category) {
      const categoryEntries = entries.filter((e: any) => e.category === category)
      generatePrediction(category, categoryEntries)
    } else {
      setAiPrediction(null)
    }
  }, [category])

  const chipStyle = (selected: boolean) => ({
    padding: '9px 18px',
    borderRadius: 999,
    fontSize: 13,
    cursor: 'pointer',
    border: selected ? `1.5px solid ${C.brown}` : `1px solid ${C.darkBorder}`,
    background: selected ? `${C.brown}25` : C.darkCard,
    color: selected ? '#e8c4b8' : C.darkMuted,
    transition: 'all 0.2s',
  })

  const labelStyle = {
    fontSize: 11,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: C.creamLight,
    fontWeight: 600,
    marginBottom: 12,
  }

  return (
    <div className="min-h-screen pb-20" style={{ background: C.darkBg, color: 'white', paddingTop: 80 }}>
      <div className="max-w-xl mx-auto px-6">
        <h2 className="text-2xl font-light mb-1">New Entry</h2>
        <p className="text-sm mb-9" style={{ color: C.darkLight }}>Track your patterns. Update your priors.</p>

        {/* Category */}
        <div className="mb-8">
          <p style={labelStyle}>What was this about?</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)} style={chipStyle(category === c)}>{c}</button>
            ))}
          </div>
        </div>

        {/* AI Prediction Box */}
        {category && (
          <div className="p-5 rounded-2xl mb-8" style={{ background: `${C.brown}15`, border: `1px solid ${C.brown}30` }}>
            <p className="text-xs tracking-wide mb-1.5" style={{ color: C.creamLight, letterSpacing: '0.1em' }}>
              {loadingPrediction ? "GENERATING PREDICTION..." : "YOUR BRAIN'S PREDICTION"}
            </p>
            {loadingPrediction ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: C.brown, borderTopColor: 'transparent' }} />
                <p className="text-sm" style={{ color: C.darkMuted }}>Analyzing your patterns...</p>
              </div>
            ) : aiPrediction ? (
              <>
                <p className="text-sm" style={{ color: C.darkMuted }}>
                  In <span style={{ color: '#e8c4b8' }}>{category.toLowerCase()}</span> situations, {aiPrediction.prediction.toLowerCase()}. 
                  You tend to feel <span style={{ color: '#e8c4b8' }}>{aiPrediction.dominantEmotion}</span> ({aiPrediction.confidence}% of the time).
                </p>
                {aiPrediction.bodySensation !== "varies" && (
                  <p className="text-xs mt-2" style={{ color: C.darkLight }}>
                    Often accompanied by: {aiPrediction.bodySensation}
                  </p>
                )}
              </>
            ) : null}
            <p className="text-xs mt-2" style={{ color: C.darkLight }}>This is your prior. Notice if it holds true this time.</p>
          </div>
        )}

        {/* Situation */}
        <div className="mb-8">
          <p style={labelStyle}>What happened?</p>
          <textarea
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="Describe the situation..."
            className="w-full p-3.5 rounded-xl resize-none outline-none"
            style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, color: 'white', minHeight: 90 }}
          />
        </div>

        {/* Thought */}
        <div className="mb-8">
          <p style={labelStyle}>What thought came up?</p>
          <textarea
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            placeholder="What went through your mind?"
            className="w-full p-3.5 rounded-xl resize-none outline-none"
            style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, color: 'white', minHeight: 70 }}
          />
        </div>

        {/* Did it match */}
        <div className="mb-8">
          <p style={labelStyle}>Did it match what actually happened?</p>
          <div className="flex gap-3">
            {[
              { value: true, label: 'Yes' },
              { value: false, label: 'No' },
              { value: null, label: 'N/A' },
            ].map(opt => (
              <button
                key={String(opt.value)}
                onClick={() => setMatchedPrediction(opt.value)}
                className="flex-1 py-3.5 rounded-xl text-sm"
                style={{
                  border: matchedPrediction === opt.value ? `1.5px solid ${C.brown}` : `1px solid ${C.darkBorder}`,
                  background: matchedPrediction === opt.value ? `${C.brown}25` : C.darkCard,
                  color: matchedPrediction === opt.value ? '#e8c4b8' : C.darkMuted,
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {matchedPrediction === false && (
            <p className="text-xs mt-3" style={{ color: C.creamLight }}>
              This is a prediction error. Your brain can use this to update your prior.
            </p>
          )}
        </div>

        {/* Feelings */}
        <div className="mb-8">
          <p style={labelStyle}>How did you feel?</p>
          <div className="flex flex-wrap gap-1.5">
            {FEELINGS.map(f => (
              <button key={f} onClick={() => toggle(feelings, setFeelings, f)} style={chipStyle(feelings.includes(f))}>{f}</button>
            ))}
          </div>
        </div>

        {/* Body Sensations */}
        <div className="mb-8">
          <p style={labelStyle}>Where did you feel it in your body?</p>
          <p className="text-xs mb-2.5" style={{ color: C.darkLight, marginTop: -4 }}>Your body holds important signals about your emotional state.</p>
          <div className="flex flex-wrap gap-1.5">
            {SENSATIONS.map(s => (
              <button key={s} onClick={() => toggle(sensations, setSensations, s)} style={chipStyle(sensations.includes(s))}>{s}</button>
            ))}
          </div>
        </div>

        {/* Intensity */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2.5">
            <p style={labelStyle}>Intensity</p>
            <span className="text-xl font-extralight">{intensity}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: C.brown }}
          />
          <div className="flex justify-between text-xs mt-1" style={{ color: C.darkLight }}>
            <span>Mild</span>
            <span>Intense</span>
          </div>
        </div>

        {/* Sleep */}
        <div className="pt-7 mb-8" style={{ borderTop: `1px solid ${C.darkBorder}` }}>
          <p className="text-xs tracking-wide mb-4" style={{ color: C.darkLight, letterSpacing: '0.1em' }}>BODY STATE</p>
          <p style={labelStyle}>Last night's sleep</p>
          <div className="flex gap-2">
            {SLEEP_OPTIONS.map(o => (
              <button
                key={o}
                onClick={() => setSleep(o)}
                className="flex-1 py-3 rounded-xl text-sm"
                style={{
                  border: sleep === o ? `1.5px solid ${C.brown}` : `1px solid ${C.darkBorder}`,
                  background: sleep === o ? `${C.brown}25` : C.darkCard,
                  color: sleep === o ? '#e8c4b8' : C.darkMuted,
                }}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          className="w-full py-4 rounded-full text-sm font-medium"
          style={{ background: C.brown, color: 'white' }}
        >
          Save Entry
        </button>
      </div>
    </div>
  )
}
