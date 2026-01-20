'use client'

import { useState, useRef, useCallback } from 'react'

interface VoiceRecorderState {
  isRecording: boolean
  audioBlob: Blob | null
  audioUrl: string | null
  duration: number
  error: string | null
}

export function useVoiceRecorder() {
  const [state, setState] = useState<VoiceRecorderState>({
    isRecording: false,
    audioBlob: null,
    audioUrl: null,
    duration: 0,
    error: null,
  })

  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startRecording = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, error: null }))
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorder.current = new MediaRecorder(stream)
      chunks.current = []

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data)
        }
      }

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setState(prev => ({ 
          ...prev, 
          audioBlob: blob, 
          audioUrl: url,
          isRecording: false 
        }))
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.current.start()
      setState(prev => ({ ...prev, isRecording: true, duration: 0 }))

      timerRef.current = setInterval(() => {
        setState(prev => ({ ...prev, duration: prev.duration + 1 }))
      }, 1000)

    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        error: 'Microphone access denied. Please allow microphone access to record.',
        isRecording: false 
      }))
      console.error('Recording error:', err)
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorder.current && state.isRecording) {
      mediaRecorder.current.stop()
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [state.isRecording])

  const clearRecording = useCallback(() => {
    if (state.audioUrl) {
      URL.revokeObjectURL(state.audioUrl)
    }
    setState({
      isRecording: false,
      audioBlob: null,
      audioUrl: null,
      duration: 0,
      error: null,
    })
  }, [state.audioUrl])

  return {
    ...state,
    startRecording,
    stopRecording,
    clearRecording,
  }
}
