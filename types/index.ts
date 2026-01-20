// Feelings configuration
export interface Feeling {
  name: string
  color: string
}

export const FEELINGS: Feeling[] = [
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
  { name: 'Grateful', color: '#C8D8B8' },
  { name: 'Other', color: '#9CA3AF' },
]

// Categories
export const EVENT_CATEGORIES = [
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
] as const

export type EventCategory = typeof EVENT_CATEGORIES[number]

// Cycle phases
export interface CyclePhase {
  name: string
  icon: string
  dayRange: [number, number]
  description: string
}

export const CYCLE_PHASES: CyclePhase[] = [
  { name: 'Menstrual', icon: 'menstrual', dayRange: [1, 5], description: 'Period days' },
  { name: 'Follicular', icon: 'follicular', dayRange: [6, 13], description: 'Post-period, pre-ovulation' },
  { name: 'Ovulation', icon: 'ovulation', dayRange: [14, 16], description: 'Peak fertility window' },
  { name: 'Luteal', icon: 'luteal', dayRange: [17, 28], description: 'Pre-period / PMS window' },
  { name: 'Extended', icon: 'extendedLuteal', dayRange: [29, 35], description: 'Late cycle' },
]

// Sleep options
export interface SleepOption {
  name: string
  icon: string
  hours: string
}

export const SLEEP_OPTIONS: SleepOption[] = [
  { name: 'Poor', icon: 'sleepPoor', hours: '<5h' },
  { name: 'Fair', icon: 'sleepFair', hours: '5-6h' },
  { name: 'Good', icon: 'sleepGood', hours: '7-8h' },
  { name: 'Great', icon: 'sleepGreat', hours: '8+h' },
]

// Health factors
export interface HealthFactor {
  name: string
  icon: string
}

export const HEALTH_FACTORS: HealthFactor[] = [
  { name: 'Feeling sick', icon: 'sick' },
  { name: 'Chronic pain flare', icon: 'pain' },
  { name: 'Headache/migraine', icon: 'headache' },
  { name: 'Low energy', icon: 'lowEnergy' },
  { name: 'Caffeine/stimulants', icon: 'caffeine' },
  { name: 'Alcohol (recent)', icon: 'alcohol' },
  { name: 'Medication change', icon: 'medication' },
  { name: 'Skipped meals', icon: 'skippedMeals' },
  { name: 'Exercised today', icon: 'exercise' },
  { name: 'Hungover', icon: 'hungover' },
  { name: 'Hormonal contraceptive', icon: 'hormonal' },
  { name: 'Other', icon: 'other' },
  { name: 'None of these', icon: 'none' },
]

// Pattern thresholds
export const PATTERN_THRESHOLDS = {
  EMERGING: 5,
  ESTABLISHED: 15,
  HEALTH_MIN: 3,
  CATEGORY_MIN: 2,
} as const

// Pattern types
export interface CategoryPattern {
  category: string
  dominantFeeling: string
  feelingFrequency: number
  topFeelings: { feeling: string; frequency: number }[]
  thoughtThemes: string[]
  avgIntensity: string
  occurrences: number
  isEstablished: boolean
}

export interface HealthPattern {
  subtype: 'cycle' | 'sleep' | 'factor'
  factor: string
  icon: string
  dominantFeeling: string
  feelingFrequency: number
  avgIntensity: string
  occurrences: number
  isEstablished: boolean
}

export interface Patterns {
  categoryPatterns: CategoryPattern[] | null
  healthPatterns: HealthPattern[] | null
  totalEntries: number
  threshold: number
}

export interface Prediction {
  type: 'category' | 'health'
  subtype?: 'cycle' | 'sleep' | 'factor'
  feeling: string
  confidence: number
  themes?: string[]
  avgIntensity?: string
  basedOn: number
  icon?: string
  text: string
}
