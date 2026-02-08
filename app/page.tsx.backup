import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: '#f6f4f0', color: '#0a0a0a', fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: '#f6f4f0ee', backdropFilter: 'blur(14px)', borderColor: 'rgba(0,0,0,0.05)' }}>
        <div className="max-w-6xl mx-auto px-10 py-3 flex justify-between items-center">
          <Link href="/"><Image src="/logo.png" alt="MindMirror" width={44} height={44} /></Link>
          <div className="flex items-center gap-7">
            <a href="#the-science" className="text-sm" style={{ color: '#6b6b6b' }}>The Science</a>
            <a href="#import" className="text-sm" style={{ color: '#6b6b6b' }}>Import</a>
            <a href="#research" className="text-sm" style={{ color: '#6b6b6b' }}>Research</a>
            <a href="#the-model" className="text-sm" style={{ color: '#6b6b6b' }}>The Model</a>
            <Link href="/login" className="btn text-sm py-2 px-5">Log in</Link>
            <Link href="/signup" className="btn btn-primary text-sm py-2 px-5">Start Free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen px-10 pt-32 pb-20 max-w-6xl mx-auto flex items-center gap-16">
        <div className="flex-1">
          <Image src="/logo.png" alt="MindMirror" width={160} height={160} className="mb-7" />
          <p className="text-xl leading-relaxed mb-4 max-w-lg" style={{ color: '#6b6b6b' }}>
            Your brain predicts your reality before you experience it.
            MindMirror reveals those predictions, your <em style={{ color: '#69443c' }}>priors</em>, so you can
            update the patterns that keep you stuck.
          </p>
          <p className="text-base leading-relaxed mb-9 max-w-md" style={{ color: '#999' }}>
            Track thoughts, feelings, and body states. Receive increasingly personalized
            predictions and recommendations based on your unique patterns.
          </p>
          <div className="flex gap-3.5">
            <Link href="/signup" className="btn btn-primary">Start Free</Link>
            <a href="#the-science" className="btn">Learn More</a>
          </div>
        </div>
        <div className="flex-1">
          <div className="w-full rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '3/4', background: 'linear-gradient(145deg, #f2e6d5, #f8f0e8)' }}>
            <Image src="/hero.svg" alt="MindMirror" width={400} height={533} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Import Feature */}
      <section id="import" className="py-28 px-10" style={{ background: '#f2e6d5' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-xs font-semibold py-1.5 px-4 rounded-full tracking-wide" style={{ background: '#69443c', color: 'white', letterSpacing: '0.1em' }}>NEW</span>
          </div>
          <h2 className="text-4xl font-light text-center mb-4">
            Already journal on paper?<br /><strong className="font-bold">Import it.</strong>
          </h2>
          <p className="text-center max-w-xl mx-auto mb-14 leading-relaxed" style={{ color: '#6b6b6b' }}>
            Do not start from scratch. Photograph your existing journal and get instant insights from months or years of entries you have already written.
          </p>

          <div className="grid grid-cols-4 gap-5 mb-14">
            {[
              { icon: '📸', title: 'Photograph', desc: 'Snap photos of your paper journal pages' },
              { icon: '🔍', title: 'Extract', desc: 'AI reads your handwriting and identifies entries' },
              { icon: '✨', title: 'Analyze', desc: 'Thoughts, feelings, predictions, and body sensations are detected' },
              { icon: '📊', title: 'Discover', desc: 'See patterns from months of journaling instantly' },
            ].map((s, i) => (
              <div key={i} className="card text-center h-full flex flex-col">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{s.title}</h4>
                <p className="text-sm flex-1" style={{ color: '#6b6b6b' }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/signup" className="btn btn-primary py-4 px-11 text-base">Import Your Journal</Link>
            <p className="text-sm mt-4" style={{ color: '#999' }}>
              Works with handwriting and typed text. Your photos are processed securely and never stored.
            </p>
          </div>
        </div>
      </section>

      {/* The Science */}
      <section id="the-science" className="py-28 px-10" style={{ background: 'white' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label">The Science</p>
          <h2 className="text-4xl font-light mb-7">
            Predictive Processing and<br /><strong className="font-bold">Active Inference</strong>
          </h2>
          <p className="text-lg leading-relaxed mb-7" style={{ color: '#6b6b6b' }}>
            Your brain does not wait for things to happen. It predicts them. Every thought,
            feeling, and sensation is shaped by internal models called <em>priors</em>, built
            from a lifetime of experience. This is <strong style={{ color: '#0a0a0a' }}>predictive processing</strong>: perception as prediction. 
            When reality matches, you barely notice. When it does not, you feel surprise, anxiety, or discomfort: a <em>prediction error</em>.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: '#6b6b6b' }}>
            But the brain does not stop at perception. Through <strong style={{ color: '#0a0a0a' }}>active inference</strong>, it also acts to make predictions come true:
            avoiding situations, seeking confirming evidence, behaving in ways that fulfill the prophecy.
            This is why negative priors like I will mess up or People will judge me do not just describe reality. They <em>create</em> it.
          </p>
          <div className="rounded-2xl p-8 mt-11 text-left" style={{ background: '#f6f4f0' }}>
            <p className="leading-relaxed mb-3" style={{ color: '#6b6b6b' }}>
              Active inference unifies perception and action: we either update our internal models to match the world, 
              or we act on the world to match our models. Both minimize surprise.
            </p>
            <p className="text-xs" style={{ color: '#999' }}>
              Friston, K. (2010). The free-energy principle: A unified brain theory? Nature Reviews Neuroscience, 11(2), 127-138.
            </p>
          </div>
        </div>
      </section>

      {/* Why We Ask */}
      <section className="py-28 px-10" style={{ background: '#f6f4f0' }}>
        <div className="max-w-5xl mx-auto">
          <p className="section-label">What We Track and Why</p>
          <h2 className="section-title">
            Why We Ask About <strong>Each Layer</strong>
          </h2>
          <div className="grid grid-cols-2 gap-7">
            <div className="rounded-full p-12 text-center flex flex-col justify-center min-h-72" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 2px 20px rgba(0,0,0,0.03)' }}>
              <p className="text-xs uppercase tracking-widest font-semibold mb-1.5" style={{ color: '#69443c', letterSpacing: '0.14em' }}>Your brains running commentary</p>
              <h3 className="text-2xl font-bold mb-3.5">Thoughts</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6b6b6b' }}>Thoughts reveal your priors in action. I am going to fail is not just a thought. It is a prediction your brain generated based on past experience. By tracking thoughts, you make invisible predictions visible.</p>
              <p className="text-xs" style={{ color: '#999' }}>Clark, A. (2015). Surfing Uncertainty. Oxford University Press.</p>
            </div>
            <div className="rounded-full p-12 text-center flex flex-col justify-center min-h-72" style={{ background: '#f2e6d5' }}>
              <p className="text-xs uppercase tracking-widest font-semibold mb-1.5" style={{ color: '#69443c', letterSpacing: '0.14em' }}>Predictions about your body state</p>
              <h3 className="text-2xl font-bold mb-3.5">Feelings</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6b6b6b' }}>Emotions are not reactions. They are predictions. Your brain constructs feelings by predicting what bodily sensations mean in context. Tracking emotions reveals which predictions your brain defaults to.</p>
              <p className="text-xs" style={{ color: '#999' }}>Barrett, L. F. (2017). How Emotions Are Made. Houghton Mifflin Harcourt.</p>
            </div>
            <div className="rounded-full p-12 text-center flex flex-col justify-center min-h-72" style={{ background: '#f2e6d5' }}>
              <p className="text-xs uppercase tracking-widest font-semibold mb-1.5" style={{ color: '#69443c', letterSpacing: '0.14em' }}>The interoceptive signal</p>
              <h3 className="text-2xl font-bold mb-3.5">Body Sensations</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6b6b6b' }}>Chest tightness, stomach knots, shallow breathing. Your body sends signals that shape emotional predictions. Somatic awareness helps you interrupt automatic patterns.</p>
              <p className="text-xs" style={{ color: '#999' }}>Seth, A. K. and Friston, K. J. (2016). Phil. Trans. R. Soc. B, 371(1708).</p>
            </div>
            <div className="rounded-full p-12 text-center flex flex-col justify-center min-h-72" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 2px 20px rgba(0,0,0,0.03)' }}>
              <p className="text-xs uppercase tracking-widest font-semibold mb-1.5" style={{ color: '#69443c', letterSpacing: '0.14em' }}>Sleep, cycle and health factors</p>
              <h3 className="text-2xl font-bold mb-3.5">Body State</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6b6b6b' }}>When dysregulated (poor sleep, hormonal shifts, illness) your negative priors become rigid and resistant to updating. Tracking physical state reveals when your brain is most open to change.</p>
              <p className="text-xs" style={{ color: '#999' }}>Friston, K. J. et al. (2014). The Lancet Psychiatry, 1(2), 148-158.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Research */}
      <section id="research" className="py-28 px-10" style={{ background: 'white' }}>
        <div className="max-w-5xl mx-auto">
          <p className="section-label">Research</p>
          <h2 className="section-title">
            What the Evidence <strong>Shows</strong>
          </h2>
          <p className="text-center mb-14 max-w-xl mx-auto" style={{ color: '#6b6b6b' }}>
            Grounded in peer-reviewed neuroscience on how the brain predicts, acts, and updates.
          </p>
          <div className="grid grid-cols-2 gap-5">
            <div className="p-7 rounded-2xl h-full" style={{ border: '1px solid rgba(0,0,0,0.04)', background: '#f6f4f0' }}>
              <h4 className="text-lg font-semibold mb-2.5">Predictive Processing and Anxiety</h4>
              <p className="text-sm leading-relaxed mb-3.5" style={{ color: '#6b6b6b' }}>Anxiety involves overly precise negative priors that resist updating. The brain over-weights its predictions, making prediction errors feel more threatening.</p>
              <p className="text-xs italic" style={{ color: '#999' }}>Paulus, M. P. et al. (2019). Biological Psychiatry: CNNI, 4(5), 483-491.</p>
            </div>
            <div className="p-7 rounded-2xl h-full" style={{ border: '1px solid rgba(0,0,0,0.04)', background: '#f8f0e8' }}>
              <h4 className="text-lg font-semibold mb-2.5">The Free Energy Principle</h4>
              <p className="text-sm leading-relaxed mb-3.5" style={{ color: '#6b6b6b' }}>All adaptive systems minimize surprise by updating beliefs or acting to confirm predictions. This unifies predictive processing and active inference under one framework.</p>
              <p className="text-xs italic" style={{ color: '#999' }}>Friston, K. (2010). Nature Reviews Neuroscience, 11(2), 127-138.</p>
            </div>
            <div className="p-7 rounded-2xl h-full" style={{ border: '1px solid rgba(0,0,0,0.04)', background: '#f6f4f0' }}>
              <h4 className="text-lg font-semibold mb-2.5">Emotions as Predictions</h4>
              <p className="text-sm leading-relaxed mb-3.5" style={{ color: '#6b6b6b' }}>Emotions are not hardwired reactions but predictions constructed from past experience. The brain predicts what bodily sensations mean in context.</p>
              <p className="text-xs italic" style={{ color: '#999' }}>Barrett, L. F. (2017). How Emotions Are Made. Houghton Mifflin Harcourt.</p>
            </div>
            <div className="p-7 rounded-2xl h-full" style={{ border: '1px solid rgba(0,0,0,0.04)', background: '#f8f0e8' }}>
              <h4 className="text-lg font-semibold mb-2.5">Surprise and Psychotherapy</h4>
              <p className="text-sm leading-relaxed mb-3.5" style={{ color: '#6b6b6b' }}>Therapeutic change occurs through benign surprises: positive prediction errors that update entrenched negative priors when the nervous system is regulated.</p>
              <p className="text-xs italic" style={{ color: '#999' }}>Holmes, J. and Nolte, T. (2019). Frontiers in Psychology, 10, 592.</p>
            </div>
            <div className="p-7 rounded-2xl h-full" style={{ border: '1px solid rgba(0,0,0,0.04)', background: '#f6f4f0' }}>
              <h4 className="text-lg font-semibold mb-2.5">Interoception and Active Inference</h4>
              <p className="text-sm leading-relaxed mb-3.5" style={{ color: '#6b6b6b' }}>Active interoceptive inference links body states to emotional experience and action. Tracking body signals helps interrupt automatic behavioral responses.</p>
              <p className="text-xs italic" style={{ color: '#999' }}>Seth, A. K. and Friston, K. J. (2016). Phil. Trans. R. Soc. B, 371(1708).</p>
            </div>
            <div className="p-7 rounded-2xl h-full" style={{ border: '1px solid rgba(0,0,0,0.04)', background: '#f8f0e8' }}>
              <h4 className="text-lg font-semibold mb-2.5">Psychedelics and Prior Relaxation</h4>
              <p className="text-sm leading-relaxed mb-3.5" style={{ color: '#6b6b6b' }}>Psychedelics may work by relaxing the precision of rigid priors, allowing the brain to update deep-seated beliefs that normally resist change.</p>
              <p className="text-xs italic" style={{ color: '#999' }}>Carhart-Harris, R. L. and Friston, K. J. (2019). Pharmacological Reviews, 71(3).</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Model */}
      <section id="the-model" className="py-28 px-10" style={{ background: '#f6f4f0' }}>
        <div className="max-w-5xl mx-auto">
          <p className="section-label">The Model</p>
          <h2 className="section-title">
            How MindMirror <strong>Works</strong>
          </h2>
          <div className="grid grid-cols-2 gap-9">
            <div className="flex gap-5">
              <div className="text-5xl font-extralight" style={{ color: '#69443c', minWidth: 56 }}>01</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Track</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6b6b6b' }}>Log situations, thoughts, feelings, body sensations, and physical state. Or import your existing paper journal.</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="text-5xl font-extralight" style={{ color: '#69443c', minWidth: 56 }}>02</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Reveal</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6b6b6b' }}>MindMirror identifies your priors: In social situations, you feel anxious 78% of the time. See the patterns running on autopilot.</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="text-5xl font-extralight" style={{ color: '#69443c', minWidth: 56 }}>03</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Notice</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6b6b6b' }}>With predictions made visible, consciously notice when reality does not match. This creates prediction errors, the brains mechanism for updating beliefs.</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="text-5xl font-extralight" style={{ color: '#69443c', minWidth: 56 }}>04</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Update</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6b6b6b' }}>Repeated awareness of mismatches allows your brain to naturally update its priors. No forcing. Just awareness and a regulated nervous system.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-28 px-10" style={{ background: 'white' }}>
        <div className="max-w-5xl mx-auto">
          <p className="section-label">Who Is This For</p>
          <h2 className="section-title">
            Built for People Who Want to <strong>Understand</strong>
          </h2>
          <div className="grid grid-cols-2 gap-7">
            <div className="p-9 rounded-2xl h-full" style={{ background: '#f6f4f0', border: '1px solid rgba(0,0,0,0.03)' }}>
              <h3 className="text-lg font-bold mb-2.5">People with anxiety or depression</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b6b6b' }}>If negative predictions feel automatic and unchangeable, MindMirror helps you see them for what they are. Predictions, not facts.</p>
            </div>
            <div className="p-9 rounded-2xl h-full" style={{ background: '#f6f4f0', border: '1px solid rgba(0,0,0,0.03)' }}>
              <h3 className="text-lg font-bold mb-2.5">Anyone in therapy</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b6b6b' }}>Track patterns between sessions. Bring your therapist data, not just memories. See what is actually happening over time.</p>
            </div>
            <div className="p-9 rounded-2xl h-full" style={{ background: '#f6f4f0', border: '1px solid rgba(0,0,0,0.03)' }}>
              <h3 className="text-lg font-bold mb-2.5">The self-aware and curious</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b6b6b' }}>You know your patterns exist. Now see them in data. Understand why you react the way you do, and what your body has to do with it.</p>
            </div>
            <div className="p-9 rounded-2xl h-full" style={{ background: '#f6f4f0', border: '1px solid rgba(0,0,0,0.03)' }}>
              <h3 className="text-lg font-bold mb-2.5">Existing journalers</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b6b6b' }}>Already journal on paper? Import your entries and get instant insights from months of writing you have already done.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-28 px-10" style={{ background: '#f6f4f0' }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-14">Pricing</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="card p-10 h-full flex flex-col justify-between text-center">
              <div>
                <p className="text-sm mb-1.5" style={{ color: '#999' }}>Free</p>
                <p className="text-5xl font-extralight mb-5">$0</p>
                <div className="text-sm leading-9" style={{ color: '#6b6b6b' }}>
                  <div>Unlimited entries</div>
                  <div>Import paper journals</div>
                  <div>Body sensation tracking</div>
                  <div>1 pattern insight</div>
                </div>
              </div>
              <Link href="/signup" className="btn w-full mt-7">Get Started</Link>
            </div>
            <div className="p-10 rounded-2xl h-full flex flex-col justify-between text-center" style={{ background: '#f2e6d5' }}>
              <div>
                <p className="text-sm font-semibold mb-1.5" style={{ color: '#69443c' }}>Premium</p>
                <p className="text-5xl font-extralight mb-0.5">$5<span className="text-lg" style={{ color: '#6b6b6b' }}>/mo</span></p>
                <p className="text-xs mb-5" style={{ color: '#999' }}>or $36/year</p>
                <div className="text-sm leading-9" style={{ color: '#6b6b6b' }}>
                  <div>Everything in Free</div>
                  <div>Unlimited patterns</div>
                  <div>Body-state correlations</div>
                  <div>Cycle analysis</div>
                  <div>Export data</div>
                </div>
              </div>
              <Link href="/signup" className="btn btn-primary w-full mt-7">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-10 text-center" style={{ background: '#69443c' }}>
        <Image src="/logo.png" alt="MindMirror" width={60} height={60} className="mx-auto invert" />
        <p className="mt-5 mb-9" style={{ color: '#d4c4bc' }}>
          See your predictions. Update your priors.
        </p>
        <Link href="/signup" className="py-3.5 px-9 rounded-full font-medium text-sm inline-block" style={{ background: '#f6f4f0', color: '#69443c' }}>Start Free</Link>
        <div className="mt-14 pt-8 flex justify-center gap-7 text-xs" style={{ borderTop: '1px solid rgba(212,196,188,0.3)', color: 'rgba(212,196,188,0.7)' }}>
          <span className="cursor-pointer hover:text-white">About</span>
          <span>Privacy</span>
          <span>Terms</span>
          <span>© 2025 MindMirror</span>
        </div>
      </footer>
    </div>
  )
}
