'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const router = useRouter()
  
  // For now, just skip onboarding and go to journal
  const handleSkip = () => {
    router.push('/journal')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-light mb-4">Welcome to MindMirror</h1>
        <p className="text-white/60 mb-8">
          Let's get started with understanding your patterns.
        </p>
        <button 
          onClick={handleSkip}
          className="btn btn-primary w-full py-4"
        >
          Continue to Journal
        </button>
      </div>
    </div>
  )
}
