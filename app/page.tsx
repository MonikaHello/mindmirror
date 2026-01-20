import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-semibold">MindMirror</div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-white/60 hover:text-white transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="btn btn-primary py-2 px-5 text-sm">
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
            Understand your mind<br />
            <span className="text-gradient">before it reacts</span>
          </h1>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            MindMirror learns your emotional patterns and predicts how you'll feel 
            in different situations — so you can respond, not just react.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup" className="btn btn-primary py-4 px-8 text-lg">
              Start Free
            </Link>
            <Link href="#how-it-works" className="btn py-4 px-8 text-lg">
              How It Works
            </Link>
          </div>
          <p className="text-sm text-white/40 mt-4">
            Free forever for basic journaling. Premium for pattern insights.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-16">
            Most journaling apps are <span className="text-white/50">reactive</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card p-8">
              <div className="text-white/40 text-sm uppercase tracking-wider mb-4">Traditional Apps</div>
              <ul className="space-y-3 text-white/70">
                <li>✗ Write after you're already upset</li>
                <li>✗ Data sits unused in your phone</li>
                <li>✗ No insight into why you feel this way</li>
                <li>✗ Same patterns repeat endlessly</li>
              </ul>
            </div>
            <div className="card p-8 border-primary/30 bg-primary/5">
              <div className="text-primary-light text-sm uppercase tracking-wider mb-4">MindMirror</div>
              <ul className="space-y-3 text-white/90">
                <li>✓ Predicts emotions before they peak</li>
                <li>✓ Connects body states to feelings</li>
                <li>✓ Shows patterns you can't see alone</li>
                <li>✓ Breaks cycles with awareness</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-lg font-medium mb-3">Journal Your Day</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Record what happened, how you feel, and your body state. 
                Use voice notes or type — whatever feels natural.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-lg font-medium mb-3">Patterns Emerge</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                MindMirror finds connections: "After poor sleep, you feel anxious 80% of the time" 
                or "Work situations trigger overwhelm."
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-lg font-medium mb-3">Predict & Prepare</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                When you start a new entry, MindMirror shows what you're likely to feel — 
                giving you a chance to respond differently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-16">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-medium mb-2">🎤 Voice Notes</h3>
              <p className="text-white/60 text-sm">
                Speak your thoughts when typing feels like too much. 
                Capture emotion in your voice.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-medium mb-2">🔮 Pattern Prediction</h3>
              <p className="text-white/60 text-sm">
                "In work situations, you tend to feel anxious 75% of the time." 
                See it coming, change your response.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-medium mb-2">🩺 Body-Mind Tracking</h3>
              <p className="text-white/60 text-sm">
                Track sleep, cycle, health factors. Discover how your body 
                influences your emotions.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-medium mb-2">🔒 Private & Secure</h3>
              <p className="text-white/60 text-sm">
                Your data is encrypted and never sold. Export or delete 
                everything anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-16">Simple Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="card p-8">
              <div className="text-sm text-white/40 uppercase tracking-wider mb-2">Free</div>
              <div className="text-4xl font-light mb-4">$0</div>
              <ul className="space-y-3 text-white/70 text-sm mb-8">
                <li>✓ Unlimited journal entries</li>
                <li>✓ Basic history view</li>
                <li>✓ Text entries</li>
                <li className="text-white/40">✗ Pattern detection</li>
                <li className="text-white/40">✗ Voice notes</li>
                <li className="text-white/40">✗ Body-mind insights</li>
              </ul>
              <Link href="/signup" className="btn w-full text-center block">
                Get Started
              </Link>
            </div>
            <div className="card p-8 border-primary/30 bg-primary/5">
              <div className="text-sm text-primary-light uppercase tracking-wider mb-2">Premium</div>
              <div className="text-4xl font-light mb-1">$7.99<span className="text-lg text-white/50">/mo</span></div>
              <div className="text-sm text-white/50 mb-4">or $59.99/year (save 37%)</div>
              <ul className="space-y-3 text-white/90 text-sm mb-8">
                <li>✓ Everything in Free</li>
                <li>✓ Pattern detection</li>
                <li>✓ Voice notes</li>
                <li>✓ Body-mind insights</li>
                <li>✓ Cycle tracking</li>
                <li>✓ Export your data</li>
              </ul>
              <Link href="/signup?plan=premium" className="btn btn-primary w-full text-center block">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-6">
            Start understanding your patterns today
          </h2>
          <p className="text-white/60 mb-8">
            Free to start. No credit card required.
          </p>
          <Link href="/signup" className="btn btn-primary py-4 px-10 text-lg">
            Create Your Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/40 text-sm">
            © 2024 MindMirror. All rights reserved.
          </div>
          <div className="flex gap-6 text-white/40 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="mailto:hello@mindmirror.app" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
