import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MindMirror - Understand Your Mind Before It Reacts',
  description: 'A predictive journaling app that helps you understand your emotional patterns and body-mind connections.',
  keywords: ['mental health', 'journaling', 'mood tracking', 'emotional patterns', 'CBT', 'mindfulness'],
  authors: [{ name: 'MindMirror' }],
  openGraph: {
    title: 'MindMirror - Understand Your Mind Before It Reacts',
    description: 'A predictive journaling app that helps you understand your emotional patterns.',
    url: 'https://mindmirror.app',
    siteName: 'MindMirror',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMirror',
    description: 'Understand your emotional patterns before they happen.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
