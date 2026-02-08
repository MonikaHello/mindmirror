'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const C = {
  brown: "#69443c",
  darkBg: "#111111", darkCard: "#1a1a1a",
  darkBorder: "#ffffff12", darkMuted: "#ffffff80", darkLight: "#ffffff50",
  creamLight: "#d4c4bc",
}

export default function PatternsPage() {
  const emotionPatterns = [
    { category: "Social situations", feeling: "Anxious", pct: 72, entries: 18 },
    { category: "Work/Career", feeling: "Overwhelmed", pct: 65, entries: 23 },
    { category: "Relationships", feeling: "Anxious", pct: 58, entries: 12 },
  ]

  const bodyPatterns = [
    { sensation: "Chest tightness", pct: 68, feeling: "Anxious" },
    { sensation: "Stomach knots", pct: 54, feeling: "Anxious" },
    { sensation: "Shoulder tension", pct: 47, feeling: "Overwhelmed" },
  ]

  const sleepCorrelations = [
    { sleep: "Poor", feeling: "Anxious", pct: 78 },
    { sleep: "Good", feeling: "Calm", pct: 62 },
  ]

  const predictionData = {
    accuracy: 34,
    mostCommon: [
      { prediction: "It will go badly", pct: 42 },
      { prediction: "They'll judge me", pct: 28 },
      { prediction: "I'll mess up", pct: 18 },
    ]
  }

  const sectionLabel = (t: string) => (
    <p className="text-xs tracking-wide font-medium mb-4 mt-8" style={{ color: C.darkLight, letterSpacing: '0.1em' }}>{t.toUpperCase()}</p>
  )

  return (
    <div className="min-h-screen pb-20" style={{ background: C.darkBg, color: 'white', paddingTop: 80 }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: `${C.darkBg}ee`, backdropFilter: 'blur(14px)', borderBottom: `1px solid ${C.darkBorder}` }}>
        <div className="max-w-xl mx-auto px-6 py-2.5 flex justify-between items-center">
          <Link href="/"><Image src="/logo.png" alt="MindMirror" width={36} height={36} className="invert" /></Link>
          <div className="flex gap-5 text-sm">
            <Link href="/journal" style={{ color: C.darkLight }}>Journal</Link>
            <Link href="/patterns" style={{ color: C.creamLight, fontWeight: 600 }}>Patterns</Link>
            <Link href="/settings" style={{ color: C.darkLight }}>Settings</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-6">
        <h2 className="text-2xl font-light mb-1">Your Patterns</h2>
        <p className="text-sm mb-6" style={{ color: C.darkLight }}>Insights from your journal entries</p>

        {/* Emotion Patterns */}
        {sectionLabel("Emotions by category")}
        {emotionPatterns.map((p, i) => (
          <div key={i} className="p-5 rounded-2xl mb-3" style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}` }}>
            <div className="flex justify-between items-center mb-2.5">
              <div>
                <p className="font-medium">{p.category}</p>
                <p className="text-xs mt-0.5" style={{ color: C.darkLight }}>You feel {p.feeling.toLowerCase()} · {p.entries} entries</p>
              </div>
              <span className="text-3xl font-extralight" style={{ color: C.creamLight }}>{p.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.darkBg }}>
              <div className="h-full rounded-full" style={{ background: C.brown, width: `${p.pct}%` }} />
            </div>
          </div>
        ))}

        {/* Body Patterns */}
        {sectionLabel("Body sensations")}
        {bodyPatterns.map((p, i) => (
          <div key={i} className="p-5 rounded-2xl mb-3" style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}` }}>
            <div className="flex justify-between items-center mb-2.5">
              <div>
                <p className="font-medium">{p.sensation}</p>
                <p className="text-xs mt-0.5" style={{ color: C.darkLight }}>Usually when feeling {p.feeling.toLowerCase()}</p>
              </div>
              <span className="text-3xl font-extralight" style={{ color: C.creamLight }}>{p.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.darkBg }}>
              <div className="h-full rounded-full" style={{ background: C.brown, width: `${p.pct}%` }} />
            </div>
          </div>
        ))}

        {/* Sleep Correlations */}
        {sectionLabel("Sleep & emotions")}
        {sleepCorrelations.map((p, i) => (
          <div key={i} className="p-5 rounded-2xl mb-3" style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}` }}>
            <div className="flex justify-between items-center mb-2.5">
              <div>
                <p className="font-medium">
                  <span style={{ color: p.sleep === "Poor" ? "#e57373" : "#81c784" }}>{p.sleep}</span> sleep → {p.feeling.toLowerCase()}
                </p>
              </div>
              <span className="text-3xl font-extralight" style={{ color: C.creamLight }}>{p.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.darkBg }}>
              <div className="h-full rounded-full" style={{ background: p.sleep === "Poor" ? "#e57373" : "#81c784", width: `${p.pct}%` }} />
            </div>
          </div>
        ))}

        {/* Prediction Accuracy */}
        {sectionLabel("Your predictions")}
        <div className="p-5 rounded-2xl mb-3" style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}` }}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-medium">Prediction accuracy</p>
              <p className="text-xs mt-0.5" style={{ color: C.darkLight }}>How often reality matched what you expected</p>
            </div>
            <span className="text-3xl font-extralight" style={{ color: C.creamLight }}>{predictionData.accuracy}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden mb-4" style={{ background: C.darkBg }}>
            <div className="h-full rounded-full" style={{ background: C.brown, width: `${predictionData.accuracy}%` }} />
          </div>
          <p className="text-xs" style={{ color: C.creamLight }}>
            Your negative predictions were wrong {100 - predictionData.accuracy}% of the time. These mismatches are prediction errors that help update your priors.
          </p>
        </div>

        <div className="p-5 rounded-2xl" style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}` }}>
          <p className="font-medium mb-4">Most common predictions</p>
          {predictionData.mostCommon.map((p, i) => (
            <div key={i} className="flex justify-between items-center py-2.5" style={{ borderTop: i > 0 ? `1px solid ${C.darkBorder}` : 'none' }}>
              <p className="text-sm" style={{ color: C.darkMuted }}>"{p.prediction}"</p>
              <p className="text-sm" style={{ color: C.creamLight }}>{p.pct}%</p>
            </div>
          ))}
        </div>

        {/* Insight Box */}
        <div className="p-6 rounded-2xl mt-8" style={{ background: `${C.brown}15`, border: `1px solid ${C.brown}30` }}>
          <p className="text-sm leading-relaxed" style={{ color: C.darkMuted }}>
            Your anxiety is strongly linked to poor sleep and shows up as chest tightness. On days with good sleep, you feel calm 62% of the time. Consider prioritizing sleep before high-stakes situations.
          </p>
        </div>
      </div>
    </div>
  )
}
