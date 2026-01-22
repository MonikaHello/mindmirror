'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const QUESTIONS = [
  {
    id: 'conflict',
    question: 'How do you typically react to conflict?',
    options: [
      { value: 'avoid', label: 'I tend to avoid it' },
      { value: 'confront', label: 'I confront it directly' },
      { value: 'anxious', label: 'I feel anxious and overthink' },
      { value: 'shutdown', label: 'I shut down emotionally' },
      { value: 'other', label: 'Other' },
    ]
  },
  {
    id: 'stress_body',
    question: 'Where do you feel stress in your body?',
    options: [
      { value: 'chest', label: 'Chest tightness' },
      { value: 'stomach', label: 'Stomach/gut' },
      { value: 'shoulders', label: 'Shoulders and neck' },
      { value: 'headache', label: 'Head/headaches' },
      { value: 'all_over', label: 'All over tension' },
      { value: 'other', label: 'Other' },
    ]
  },
  {
    id: 'anxiety_triggers',
    question: 'What situations make you most anxious?',
    options: [
      { value: 'social', label: 'Social situations' },
      { value: 'work', label: 'Work pressure' },
      { value: 'uncertainty', label: 'Uncertainty about the future' },
      { value: 'relationships', label: 'Relationship issues' },
      { value: 'health', label: 'Health concerns' },
      { value: 'other', label: 'Other' },
    ]
  },
  {
    id: 'coping',
    question: 'What helps you calm down when upset?',
    options: [
      { value: 'alone_time', label: 'Time alone' },
      { value: 'talking', label: 'Talking to someone' },
      { value: 'exercise', label: 'Physical activity' },
      { value: 'distraction', label: 'Distraction (TV, phone, etc.)' },
      { value: 'sleep', label: 'Sleep' },
      { value: 'other', label: 'Other' },
    ]
  },
  {
    id: 'mood_pattern',
    question: 'When do you typically feel your best?',
    options: [
      { value: 'morning', label: 'Morning' },
      { value: 'afternoon', label: 'Afternoon' },
      { value: 'evening', label: 'Evening' },
      { value: 'varies', label: 'It varies a lot' },
      { value: 'rarely', label: 'I rarely feel my best' },
      { value: 'other', label: 'Other' },
    ]
  },
]

export default function OnboardingPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [otherText, setOtherText] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  
  const supabase = createClient()
  const router = useRouter()

  const question = QUESTIONS[currentQuestion]
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100

  const selectAnswer = (value: string) => {
    setAnswers({ ...answers, [question.id]: value })
  }

  const handleNext = async () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Save and finish
      setSaving(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        await (supabase
  .from('profiles') as any)
  .update({
    onboarding_answers: answers,
    onboarding_other_text: otherText,
    onboarding_complete: true,
  })
  .eq('id', user.id)
      }
      
      router.push('/journal')
    }
  }

  const canContinue = answers[question.id] && 
    (answers[question.id] !== 'other' || otherText[question.id])

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-right text-xs text-white/40 mt-2">
          {currentQuestion + 1} of {QUESTIONS.length}
        </div>
      </div>

      {/* Question */}
      <div className="flex-1">
        <h1 className="text-2xl font-light mb-8">{question.question}</h1>
        
        <div className="space-y-3">
          {question.options.map(option => (
            <button
              key={option.value}
              onClick={() => selectAnswer(option.value)}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                answers[question.id] === option.value
                  ? 'bg-primary/20 border-2 border-primary'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {answers[question.id] === 'other' && (
          <input
            type="text"
            value={otherText[question.id] || ''}
            onChange={(e) => setOtherText({ ...otherText, [question.id]: e.target.value })}
            placeholder="Please describe..."
            className="input mt-4"
            autoFocus
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {currentQuestion > 0 && (
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="btn flex-1"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canContinue || saving}
          className={`btn btn-primary flex-1 ${!canContinue ? 'opacity-50' : ''}`}
        >
          {saving ? 'Saving...' : currentQuestion === QUESTIONS.length - 1 ? 'Finish' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
