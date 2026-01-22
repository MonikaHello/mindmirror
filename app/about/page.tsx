import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <Image src="/logo.png" alt="MindMirror" width={80} height={40} className="invert" />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-white/60 hover:text-white transition-colors">Log in</Link>
            <Link href="/signup" className="btn btn-primary py-2 px-5 text-sm">Start Free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-light mb-6">The Science Behind MindMirror</h1>
          <p className="text-xl text-white/60">
            How predictive processing explains our emotions, behaviors, and the path to change.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto prose prose-invert">
          
          {/* Intro */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-light mb-4">What is Predictive Processing?</h2>
            <p className="text-white/70 mb-4">
              Predictive processing (PP) is a theory in neuroscience suggesting the brain constantly 
              generates internal models to predict sensory input, rather than passively receiving it. 
              It then updates these models by minimizing "prediction errors" — mismatches between 
              expectation and reality.
            </p>
            <p className="text-white/70">
              Essentially, your brain is a prediction machine, using top-down expectations based on 
              past experience to make sense of noisy, ambiguous sensory data.
            </p>
          </div>

          {/* Free Energy Principle */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-light mb-4">The Free Energy Principle</h2>
            <p className="text-white/70 mb-4">
              Karl Friston's free energy principle proposes that all adaptive systems — including 
              the brain — work to minimize "free energy" or prediction error. The brain achieves 
              this in two ways:
            </p>
            <ul className="text-white/70 mb-4 space-y-2">
              <li><strong>Updating beliefs</strong> — changing your internal model to match reality</li>
              <li><strong>Active inference</strong> — acting on the world to make reality match your predictions</li>
            </ul>
            <p className="text-white/70 mb-4">
              This explains why negative priors can become self-fulfilling. If you predict social 
              rejection, you might act withdrawn, which leads to actual rejection, confirming your 
              prediction and strengthening the prior.
            </p>
            <p className="text-xs text-white/40 mt-4">
              Friston, K. (2010). The free-energy principle: A unified brain theory? 
              <em>Nature Reviews Neuroscience</em>, 11(2), 127–138.
            </p>
          </div>

          {/* Emotions as Predictions */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-light mb-4">Emotions as Predictions</h2>
            <p className="text-white/70 mb-4">
              Lisa Feldman Barrett's research shows that emotions are not hardwired reactions but 
              constructed predictions. Your brain uses past experience to predict what bodily 
              sensations mean in a given context, and that prediction becomes your emotion.
            </p>
            <p className="text-white/70 mb-4">
              This means emotions can be "wrong" — your brain might predict anxiety when the 
              situation doesn't warrant it, based on outdated priors from past experiences.
            </p>
            <p className="text-xs text-white/40 mt-4">
              Barrett, L. F. (2017). <em>How emotions are made: The secret life of the brain</em>. 
              Houghton Mifflin Harcourt.
            </p>
          </div>

          {/* Depression and Anxiety */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-light mb-4">Predictive Processing and Mental Health</h2>
            <p className="text-white/70 mb-4">
              Research indicates that disrupted predictive coding plays a role in depression and 
              anxiety. In depression, negative priors become overly "precise" — the brain weights 
              them too heavily and doesn't update them when positive things happen.
            </p>
            <blockquote className="border-l-2 border-primary/50 pl-6 my-6 text-white/60 italic">
              "Depressed individuals show impaired prediction error signaling, leading to 
              maladaptive interpretations favoring negative outcomes and underweighting 
              positive ones."
            </blockquote>
            <p className="text-white/70 mb-4">
              This explains why positive experiences don't "stick" in depression — the brain 
              dismisses them as anomalies rather than evidence that should update the prior.
            </p>
            <p className="text-xs text-white/40 mt-4">
              Kube, T., et al. (2020). Distorted cognitive processes in major depression: 
              A predictive processing perspective. <em>Neuroscience & Biobehavioral Reviews</em>.
            </p>
          </div>

          {/* The Body Connection */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-light mb-4">The Body-Mind Connection</h2>
            <p className="text-white/70 mb-4">
              Interoception — the perception of internal body states — is central to predictive 
              processing. Your brain is constantly predicting what your body should feel like, 
              and these predictions influence your emotions.
            </p>
            <p className="text-white/70 mb-4">
              When you're in a dysregulated state (poor sleep, stress, hormonal changes), your 
              priors become more rigid. The brain clings to existing predictions as a form of 
              safety, making it harder to update negative beliefs.
            </p>
            <p className="text-white/70 mb-4">
              Conversely, when you're regulated and calm, priors become more malleable and 
              updatable. This is why body-based practices (sleep, exercise, breathing) matter 
              for mental health.
            </p>
            <p className="text-xs text-white/40 mt-4">
              Seth, A. K., & Friston, K. J. (2016). Active interoceptive inference and the 
              emotional brain. <em>Philosophical Transactions of the Royal Society B</em>, 371(1708).
            </p>
          </div>

          {/* How Change Happens */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-light mb-4">How Priors Get Updated</h2>
            <p className="text-white/70 mb-4">
              Priors update through prediction errors — when reality doesn't match expectation. 
              But for this to work:
            </p>
            <ul className="text-white/70 mb-4 space-y-2">
              <li>You need to <strong>notice</strong> the mismatch (awareness)</li>
              <li>Your nervous system needs to be <strong>regulated enough</strong> to process new information</li>
              <li>The new experience needs to <strong>repeat</strong> to form new patterns</li>
            </ul>
            <p className="text-white/70 mb-4">
              This is why simply having positive experiences isn't enough. You need awareness of 
              the prediction, awareness of the outcome, and the capacity to integrate the difference.
            </p>
            <p className="text-xs text-white/40 mt-4">
              Holmes, J., & Nolte, T. (2019). "Surprise" and the Bayesian brain: Implications 
              for psychotherapy theory and practice. <em>Frontiers in Psychology</em>, 10, 592.
            </p>
          </div>

          {/* Why MindMirror */}
          <div className="card p-8 mb-8 bg-primary/5 border-primary/20">
            <h2 className="text-2xl font-light mb-4">Why MindMirror?</h2>
            <p className="text-white/70 mb-4">
              MindMirror is designed around these principles:
            </p>
            <ul className="text-white/70 mb-4 space-y-3">
              <li>
                <strong>Track predictions</strong> — By logging situations and feelings, you build 
                a dataset of your own priors.
              </li>
              <li>
                <strong>See patterns</strong> — MindMirror shows you your predictions: "In work 
                situations, you tend to feel anxious 75% of the time."
              </li>
              <li>
                <strong>Notice mismatches</strong> — When you see the prediction, you can consciously 
                notice whether it matches reality this time.
              </li>
              <li>
                <strong>Track body states</strong> — Understanding your physiological state helps 
                you know when you're capable of updating priors vs. when you're too dysregulated.
              </li>
            </ul>
            <p className="text-white/70">
              The goal is not to force positive thinking, but to create the conditions for 
              natural prior updating through awareness and prediction error.
            </p>
          </div>

          {/* References */}
          <div className="card p-8">
            <h2 className="text-2xl font-light mb-4">References</h2>
            <div className="text-sm text-white/60 space-y-4">
              <p>
                Barrett, L. F. (2017). <em>How emotions are made: The secret life of the brain</em>. 
                Houghton Mifflin Harcourt.
              </p>
              <p>
                Clark, A. (2015). <em>Surfing uncertainty: Prediction, action, and the embodied mind</em>. 
                Oxford University Press.
              </p>
              <p>
                Friston, K. (2010). The free-energy principle: A unified brain theory? 
                <em>Nature Reviews Neuroscience</em>, 11(2), 127–138.
              </p>
              <p>
                Friston, K. J., Stephan, K. E., Montague, R., & Dolan, R. J. (2014). 
                Computational psychiatry: The brain as a phantastic organ. 
                <em>The Lancet Psychiatry</em>, 1(2), 148-158.
              </p>
              <p>
                Holmes, J., & Nolte, T. (2019). "Surprise" and the Bayesian brain: 
                Implications for psychotherapy theory and practice. 
                <em>Frontiers in Psychology</em>, 10, 592.
              </p>
              <p>
                Kube, T., et al. (2020). Distorted cognitive processes in major depression: 
                A predictive processing perspective. 
                <em>Neuroscience & Biobehavioral Reviews</em>.
              </p>
              <p>
                Seth, A. K., & Friston, K. J. (2016). Active interoceptive inference 
                and the emotional brain. 
                <em>Philosophical Transactions of the Royal Society B</em>, 371(1708).
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-light mb-4">Ready to see your patterns?</h2>
          <Link href="/signup" className="btn btn-primary py-3 px-8">Start Free</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/40 text-sm">© 2025 MindMirror</div>
          <div className="flex gap-6 text-white/40 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
