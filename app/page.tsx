import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Image src="/logo.png" alt="MindMirror" width={80} height={40} className="invert" />
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-white/60 hover:text-white transition-colors">Log in</Link>
            <Link href="/signup" className="btn btn-primary py-2 px-5 text-sm">Start Free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Image src="/logo.png" alt="MindMirror" width={180} height={90} className="mx-auto mb-8 invert" />
          <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">
            Your brain is a prediction machine.
          </p>
          <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed">
            MindMirror helps you see your mental predictions — your priors — and gives you 
            the awareness to update them. Track thoughts, feelings, and body states. 
            Discover patterns. Change outcomes.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup" className="btn btn-primary py-4 px-8 text-lg">Start Free</Link>
            <Link href="#science" className="btn py-4 px-8 text-lg">The Science</Link>
          </div>
        </div>
      </section>

      {/* The Science Section */}
      <section id="science" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-6">
            The Science of <span className="font-bold">Predictive Processing</span>
          </h2>
          <p className="text-center text-white/60 max-w-3xl mx-auto mb-8">
            Your brain doesn't passively receive information — it actively predicts what will happen next. 
            These predictions, called "priors," shape your perception, emotions, and behavior. 
            When predictions don't match reality, you experience a "prediction error."
          </p>
          <blockquote className="border-l-2 border-primary/50 pl-6 my-8 text-white/70 italic">
            "The brain is fundamentally an inference machine, constantly generating predictions 
            about the causes of its sensory inputs."
          </blockquote>
          <p className="text-sm text-white/40 text-right mb-12">
            — Friston, K. (2010). The free-energy principle: A unified brain theory? Nature Reviews Neuroscience
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-6">
              <h3 className="font-medium mb-3">How Negative Priors Form</h3>
              <p className="text-sm text-white/60 mb-4">
                If social situations have gone poorly in the past, your brain forms a prior: 
                "social interactions will be negative." This prediction then guides your behavior 
                (active inference), often creating a self-fulfilling prophecy.
              </p>
              <p className="text-xs text-white/40">
                Clark, A. (2015). Surfing uncertainty: Prediction, action, and the embodied mind
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-medium mb-3">How to Update Them</h3>
              <p className="text-sm text-white/60 mb-4">
                Awareness is the first step. By tracking your predictions and comparing them to 
                actual outcomes, you create opportunities for prediction errors — the mechanism 
                by which priors get updated.
              </p>
              <p className="text-xs text-white/40">
                Barrett, L. F. (2017). How emotions are made: The secret life of the brain
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/about" className="text-primary-light hover:underline text-sm">
              Read more about the research →
            </Link>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-6">
            Your Body Affects Your Predictions
          </h2>
          <p className="text-center text-white/60 max-w-2xl mx-auto mb-12">
            Research shows that your physiological state — sleep, hormones, stress — directly 
            influences how rigid or flexible your priors are. When you're dysregulated, 
            negative priors become more entrenched.
          </p>
          
          <div className="card p-6 bg-primary/5 border-primary/20 mb-8">
            <h3 className="font-medium mb-3">The Depression Connection</h3>
            <p className="text-sm text-white/70 mb-4">
              Research indicates that disrupted predictive coding in depression involves overly 
              precise negative priors and impaired prediction error signaling. This leads to 
              maladaptive interpretations favoring negative outcomes and underweighting positive ones.
            </p>
            <p className="text-xs text-white/40">
              Kube, T. et al. (2020). Distorted cognitive processes in major depression: A predictive processing perspective
            </p>
          </div>
          
          <p className="text-center text-white/50 text-sm">
            MindMirror tracks both your mental patterns AND body states to give you a complete picture.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-medium mb-3">Track</h3>
              <p className="text-white/60 text-sm">
                Log situations, thoughts, feelings, body sensations, and physical state.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-medium mb-3">Reveal</h3>
              <p className="text-white/60 text-sm">
                MindMirror identifies your priors: "In work situations, you predict anxiety 75% of the time."
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-medium mb-3">Update</h3>
              <p className="text-white/60 text-sm">
                Notice when predictions don't match reality — creating opportunities to update your priors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-16">Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="card p-8">
              <div className="text-sm text-white/40 uppercase tracking-wider mb-2">Free</div>
              <div className="text-4xl font-light mb-4">$0</div>
              <ul className="space-y-3 text-white/70 text-sm mb-8">
                <li>Unlimited entries</li>
                <li>Body sensation tracking</li>
                <li>1 pattern insight</li>
                <li className="text-white/40">Full pattern analysis</li>
                <li className="text-white/40">Body-state correlations</li>
              </ul>
              <Link href="/signup" className="btn w-full text-center block">Get Started</Link>
            </div>
            <div className="card p-8 border-primary/30 bg-primary/5">
              <div className="text-sm text-primary-light uppercase tracking-wider mb-2">Premium</div>
              <div className="text-4xl font-light mb-1">$5<span className="text-lg text-white/50">/mo</span></div>
              <div className="text-sm text-white/50 mb-4">or $36/year</div>
              <ul className="space-y-3 text-white/90 text-sm mb-8">
                <li>Everything in Free</li>
                <li>Unlimited patterns</li>
                <li>Body-state correlations</li>
                <li>Cycle analysis</li>
                <li>Export data</li>
              </ul>
              <Link href="/signup?plan=premium" className="btn btn-primary w-full text-center block">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-6">See your predictions. Update your priors.</h2>
          <p className="text-white/60 mb-8">Free to start. No credit card required.</p>
          <Link href="/signup" className="btn btn-primary py-4 px-10 text-lg">Create Your Account</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/40 text-sm">© 2025 MindMirror</div>
          <div className="flex gap-6 text-white/40 text-sm">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
