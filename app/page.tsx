import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight">MIND<span className="block text-sm">MIRROR</span></div>
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
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            MIND<br/>MIRROR
          </h1>
          <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto leading-relaxed">
            Understand your mind <em>before</em> it reacts.
          </p>
          <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Track how your body affects your emotions. Discover the somatic patterns 
            that drive your feelings — from sleep and cycles to stress and energy.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup" className="btn btn-primary py-4 px-8 text-lg">
              Start Free
            </Link>
            <Link href="#how-it-works" className="btn py-4 px-8 text-lg">
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* What is Somatic Tracking */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-6">
            What is <span className="font-bold">Somatic Tracking</span>?
          </h2>
          <p className="text-center text-white/60 max-w-2xl mx-auto mb-12">
            "Somatic" means relating to the body. Your emotions don't just happen in your mind — 
            they're deeply connected to your physical state. Poor sleep, hormonal changes, caffeine, 
            pain, and stress all shape how you feel and react.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="font-medium mb-2">Body-Mind Connection</h3>
              <p className="text-sm text-white/50">
                Track sleep, cycles, energy, and health factors alongside your emotions.
              </p>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl mb-3">🔮</div>
              <h3 className="font-medium mb-2">Predictive Insights</h3>
              <p className="text-sm text-white/50">
                See how your body state predicts your emotional reactions.
              </p>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-medium mb-2">Break Patterns</h3>
              <p className="text-sm text-white/50">
                Awareness is the first step. Know your triggers before they hit.
              </p>
            </div>
          </div>
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
                <li>✗ Ignore your body's signals</li>
                <li>✗ No insight into why you feel this way</li>
                <li>✗ Same patterns repeat endlessly</li>
              </ul>
            </div>
            <div className="card p-8 border-primary/30 bg-primary/5">
              <div className="text-primary-light text-sm uppercase tracking-wider mb-4">MindMirror</div>
              <ul className="space-y-3 text-white/90">
                <li>✓ Predicts emotions before they peak</li>
                <li>✓ Tracks somatic markers (sleep, cycles, health)</li>
                <li>✓ Shows body-mind patterns you can't see alone</li>
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
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-medium mb-3">Journal + Track</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Log what happened, how you feel, and your body state — 
                sleep quality, cycle phase, energy levels.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-medium mb-3">Patterns Emerge</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                MindMirror finds connections: "After poor sleep, you feel anxious 80% of the time."
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-medium mb-3">Predict & Prepare</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Know what's coming. When you start an entry, see your likely emotional state.
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
              <h3 className="text-lg font-medium mb-2">🩺 Somatic Tracking</h3>
              <p className="text-white/60 text-sm">
                Track sleep, menstrual cycle, energy, pain, caffeine, and more. 
                See how your body affects your mind.
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
              <h3 className="text-lg font-medium mb-2">🌙 Cycle Awareness</h3>
              <p className="text-white/60 text-sm">
                Track your menstrual cycle and discover how hormonal changes 
                influence your emotional patterns.
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
                <li>✓ Basic somatic tracking</li>
                <li>✓ 1 pattern insight</li>
                <li className="text-white/40">✗ Full pattern detection</li>
                <li className="text-white/40">✗ Body-mind insights</li>
                <li className="text-white/40">✗ Cycle correlations</li>
              </ul>
              <Link href="/signup" className="btn w-full text-center block">
                Get Started
              </Link>
            </div>
            <div className="card p-8 border-primary/30 bg-primary/5">
              <div className="text-sm text-primary-light uppercase tracking-wider mb-2">Premium</div>
              <div className="text-4xl font-light mb-1">$5<span className="text-lg text-white/50">/mo</span></div>
              <div className="text-sm text-white/50 mb-4">or $36/year (save 40%)</div>
              <ul className="space-y-3 text-white/90 text-sm mb-8">
                <li>✓ Everything in Free</li>
                <li>✓ Unlimited pattern insights</li>
                <li>✓ Body-mind correlations</li>
                <li>✓ Cycle phase tracking</li>
                <li>✓ Health factor analysis</li>
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
            Start understanding your body-mind patterns
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
            © 2025 MindMirror. All rights reserved.
          </div>
          <div className="flex gap-6 text-white/40 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="mailto:hello@mindmirrorapp.io" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
