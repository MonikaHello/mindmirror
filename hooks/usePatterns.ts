'use client'

import { useMemo } from 'react'
import { Entry } from '@/types/database'
import { 
  PATTERN_THRESHOLDS, 
  FEELINGS, 
  CYCLE_PHASES, 
  SLEEP_OPTIONS, 
  HEALTH_FACTORS,
  Patterns,
  CategoryPattern,
  HealthPattern,
  Prediction 
} from '@/types'

function getPhaseFromDay(day: number): string | null {
  if (!day || day < 1) return null
  for (const phase of CYCLE_PHASES) {
    if (day >= phase.dayRange[0] && day <= phase.dayRange[1]) {
      return phase.name
    }
  }
  return day > 35 ? 'Extended' : null
}

export function usePatterns(entries: Entry[]): Patterns {
  return useMemo(() => {
    if (entries.length < PATTERN_THRESHOLDS.EMERGING) {
      return {
        categoryPatterns: null,
        healthPatterns: null,
        totalEntries: entries.length,
        threshold: PATTERN_THRESHOLDS.EMERGING,
      }
    }

    // Category patterns
    const categoryData: Record<string, {
      category: string
      thoughts: string[]
      feelings: Record<string, number>
      count: number
      intensities: number[]
    }> = {}

    // Health correlations
    const healthData = {
      cyclePhase: {} as Record<string, { feelings: Record<string, number>; count: number; intensities: number[] }>,
      sleep: {} as Record<string, { feelings: Record<string, number>; count: number; intensities: number[] }>,
      factors: {} as Record<string, { feelings: Record<string, number>; count: number; intensities: number[] }>,
    }

    entries.forEach(entry => {
      // Category patterns
      if (entry.category) {
        if (!categoryData[entry.category]) {
          categoryData[entry.category] = {
            category: entry.category,
            thoughts: [],
            feelings: {},
            count: 0,
            intensities: [],
          }
        }
        
        const cat = categoryData[entry.category]
        cat.count++
        if (entry.thought) cat.thoughts.push(entry.thought)
        if (entry.intensity) cat.intensities.push(entry.intensity)
        
        entry.feelings?.forEach(feeling => {
          cat.feelings[feeling] = (cat.feelings[feeling] || 0) + 1
        })
      }

      // Health patterns
      const health = entry.health as any
      if (health) {
        // Cycle phase
        if (health.cyclePhase && health.cyclePhase !== 'Not tracking') {
          if (!healthData.cyclePhase[health.cyclePhase]) {
            healthData.cyclePhase[health.cyclePhase] = { feelings: {}, count: 0, intensities: [] }
          }
          const phase = healthData.cyclePhase[health.cyclePhase]
          phase.count++
          if (entry.intensity) phase.intensities.push(entry.intensity)
          entry.feelings?.forEach(f => {
            phase.feelings[f] = (phase.feelings[f] || 0) + 1
          })
        }

        // Sleep
        if (health.sleep) {
          if (!healthData.sleep[health.sleep]) {
            healthData.sleep[health.sleep] = { feelings: {}, count: 0, intensities: [] }
          }
          const sleep = healthData.sleep[health.sleep]
          sleep.count++
          if (entry.intensity) sleep.intensities.push(entry.intensity)
          entry.feelings?.forEach(f => {
            sleep.feelings[f] = (sleep.feelings[f] || 0) + 1
          })
        }

        // Health factors
        health.factors?.forEach((factor: string) => {
          if (factor === 'None of these') return
          if (!healthData.factors[factor]) {
            healthData.factors[factor] = { feelings: {}, count: 0, intensities: [] }
          }
          const fac = healthData.factors[factor]
          fac.count++
          if (entry.intensity) fac.intensities.push(entry.intensity)
          entry.feelings?.forEach(f => {
            fac.feelings[f] = (fac.feelings[f] || 0) + 1
          })
        })
      }
    })

    // Process category patterns
    const categoryPatterns: CategoryPattern[] = Object.values(categoryData)
      .filter(p => p.count >= PATTERN_THRESHOLDS.CATEGORY_MIN)
      .map(p => {
        const sortedFeelings = Object.entries(p.feelings)
          .sort((a, b) => b[1] - a[1])
        
        const topFeelings = sortedFeelings.slice(0, 2).map(([feeling, count]) => ({
          feeling,
          frequency: Math.round((count / p.count) * 100),
        }))

        const avgIntensity = p.intensities.length > 0
          ? (p.intensities.reduce((a, b) => a + b, 0) / p.intensities.length).toFixed(1)
          : '0'

        // Extract thought themes (simple word frequency)
        const words = p.thoughts.join(' ').toLowerCase().split(/\W+/)
        const wordCounts: Record<string, number> = {}
        words.forEach(word => {
          if (word.length > 4) wordCounts[word] = (wordCounts[word] || 0) + 1
        })
        const thoughtThemes = Object.entries(wordCounts)
          .filter(([, count]) => count >= 2)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([word]) => word)

        return {
          category: p.category,
          dominantFeeling: sortedFeelings[0]?.[0] || '',
          feelingFrequency: sortedFeelings[0] ? Math.round((sortedFeelings[0][1] / p.count) * 100) : 0,
          topFeelings,
          thoughtThemes,
          avgIntensity,
          occurrences: p.count,
          isEstablished: p.count >= PATTERN_THRESHOLDS.ESTABLISHED,
        }
      })
      .sort((a, b) => b.occurrences - a.occurrences)

    // Process health patterns
    const healthPatterns: HealthPattern[] = []

    // Cycle patterns
    Object.entries(healthData.cyclePhase).forEach(([phase, data]) => {
      if (data.count >= PATTERN_THRESHOLDS.HEALTH_MIN) {
        const top = Object.entries(data.feelings).sort((a, b) => b[1] - a[1])[0]
        const avgIntensity = data.intensities.length > 0
          ? (data.intensities.reduce((a, b) => a + b, 0) / data.intensities.length).toFixed(1)
          : '0'
        
        healthPatterns.push({
          subtype: 'cycle',
          factor: phase,
          icon: CYCLE_PHASES.find(c => c.name === phase)?.icon || 'menstrual',
          dominantFeeling: top?.[0] || '',
          feelingFrequency: top ? Math.round((top[1] / data.count) * 100) : 0,
          avgIntensity,
          occurrences: data.count,
          isEstablished: data.count >= PATTERN_THRESHOLDS.ESTABLISHED,
        })
      }
    })

    // Sleep patterns
    Object.entries(healthData.sleep).forEach(([sleep, data]) => {
      if (data.count >= PATTERN_THRESHOLDS.HEALTH_MIN) {
        const top = Object.entries(data.feelings).sort((a, b) => b[1] - a[1])[0]
        const avgIntensity = data.intensities.length > 0
          ? (data.intensities.reduce((a, b) => a + b, 0) / data.intensities.length).toFixed(1)
          : '0'
        
        healthPatterns.push({
          subtype: 'sleep',
          factor: sleep,
          icon: SLEEP_OPTIONS.find(s => s.name === sleep)?.icon || 'sleepFair',
          dominantFeeling: top?.[0] || '',
          feelingFrequency: top ? Math.round((top[1] / data.count) * 100) : 0,
          avgIntensity,
          occurrences: data.count,
          isEstablished: data.count >= PATTERN_THRESHOLDS.ESTABLISHED,
        })
      }
    })

    // Factor patterns
    Object.entries(healthData.factors).forEach(([factor, data]) => {
      if (data.count >= PATTERN_THRESHOLDS.HEALTH_MIN) {
        const top = Object.entries(data.feelings).sort((a, b) => b[1] - a[1])[0]
        const avgIntensity = data.intensities.length > 0
          ? (data.intensities.reduce((a, b) => a + b, 0) / data.intensities.length).toFixed(1)
          : '0'
        
        healthPatterns.push({
          subtype: 'factor',
          factor,
          icon: HEALTH_FACTORS.find(h => h.name === factor)?.icon || 'other',
          dominantFeeling: top?.[0] || '',
          feelingFrequency: top ? Math.round((top[1] / data.count) * 100) : 0,
          avgIntensity,
          occurrences: data.count,
          isEstablished: data.count >= PATTERN_THRESHOLDS.ESTABLISHED,
        })
      }
    })

    return {
      categoryPatterns: categoryPatterns.length > 0 ? categoryPatterns : null,
      healthPatterns: healthPatterns.length > 0 ? healthPatterns : null,
      totalEntries: entries.length,
      threshold: PATTERN_THRESHOLDS.EMERGING,
    }
  }, [entries])
}

export function usePredictions(
  patterns: Patterns | null,
  category: string | null,
  health: any
): Prediction[] | null {
  return useMemo(() => {
    if (!patterns) return null
    
    const predictions: Prediction[] = []

    // Category prediction
    if (category && patterns.categoryPatterns) {
      const pattern = patterns.categoryPatterns.find(p => p.category === category)
      if (pattern) {
        predictions.push({
          type: 'category',
          feeling: pattern.dominantFeeling,
          confidence: pattern.feelingFrequency,
          themes: pattern.thoughtThemes,
          basedOn: pattern.occurrences,
          text: `In ${category.toLowerCase()} situations, you tend to feel`,
        })
      }
    }

    // Health predictions
    if (patterns.healthPatterns && health) {
      // Cycle phase
      if (health.cyclePhase && health.cyclePhase !== 'Not tracking') {
        const cyclePattern = patterns.healthPatterns.find(
          p => p.subtype === 'cycle' && p.factor === health.cyclePhase
        )
        if (cyclePattern) {
          predictions.push({
            type: 'health',
            subtype: 'cycle',
            feeling: cyclePattern.dominantFeeling,
            confidence: cyclePattern.feelingFrequency,
            avgIntensity: cyclePattern.avgIntensity,
            basedOn: cyclePattern.occurrences,
            icon: cyclePattern.icon,
            text: `During your ${health.cyclePhase.toLowerCase()} phase, you tend to feel`,
          })
        }
      }

      // Sleep
      if (health.sleep) {
        const sleepPattern = patterns.healthPatterns.find(
          p => p.subtype === 'sleep' && p.factor === health.sleep
        )
        if (sleepPattern) {
          predictions.push({
            type: 'health',
            subtype: 'sleep',
            feeling: sleepPattern.dominantFeeling,
            confidence: sleepPattern.feelingFrequency,
            avgIntensity: sleepPattern.avgIntensity,
            basedOn: sleepPattern.occurrences,
            icon: sleepPattern.icon,
            text: `After ${health.sleep.toLowerCase()} sleep, you tend to feel`,
          })
        }
      }
    }

    return predictions.length > 0 ? predictions : null
  }, [patterns, category, health])
}
