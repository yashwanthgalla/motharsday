import { useState, useEffect, useCallback } from 'react'
import SplitText from './SplitText'
import './App.css'

/* ───── Data ───── */
const FLOWERS = [
  {
    emoji: '🌸',
    title: 'for your patience',
    note: 'For every time you waited, listened, and never gave up on me — even when I made it hard. Your patience shaped who I am.',
  },
  {
    emoji: '🌻',
    title: 'for your warmth',
    note: 'For the warm meals, the warm hugs, and the warm words that made even the hardest days feel okay. You are my sunshine.',
  },
  {
    emoji: '🌷',
    title: 'for your love',
    note: 'For a love so constant, so unconditional, that I sometimes forget how rare and beautiful it is. I never will again.',
  },
]

/* ───── Floating Particles ───── */
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => {
    const size = Math.random() * 8 + 4
    const colors = ['#c4647a', '#e8a0b0', '#d4a76a', '#b89cdb', '#f0b8c8']
    return (
      <div
        key={i}
        className="particle"
        style={{
          width: size,
          height: size,
          left: `${Math.random() * 100}%`,
          background: colors[i % colors.length],
          animationDuration: `${Math.random() * 8 + 8}s`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    )
  })
  return <div className="floating-particles">{particles}</div>
}

/* ───── Envelope Component ───── */
function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false)

  const handleClick = () => {
    setOpening(true)
    setTimeout(onOpen, 800)
  }

  return (
    <section className="section" id="envelope-section">
      <div className="envelope-wrapper fade-in">
        <div className="tag fade-in-up">💕 FOR MUM</div>
        <h2 className="title-main fade-in-up delay-1">a little something for you</h2>
        <p className="title-sub fade-in-up delay-2">happy mother's day ♡</p>

        <div className={`envelope ${opening ? 'opening' : ''}`} onClick={handleClick}>
          <div className="envelope-body-shape">
            <div className="envelope-lines" />
            <div className="seal">M</div>
          </div>
          <div className="envelope-flap" />
        </div>

        <p className="tap-hint">TAP THE SEAL TO OPEN 🌸</p>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem' }}>🌿</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--rose-primary)' }}>💕</span>
          <span style={{ fontSize: '1.2rem' }}>🌿</span>
        </div>
      </div>
    </section>
  )
}

/* ───── Intro Card ───── */
function IntroCard({ onNext }: { onNext: () => void }) {
  return (
    <section className="section" id="intro-section">
      <div style={{ position: 'relative', paddingTop: '3rem' }}>
        {/* Decorative flowers */}
        <div className="deco-flower" style={{ top: '-20px', left: '-30px' }}>🌸</div>
        <div className="deco-flower" style={{ top: '-30px', right: '-40px', animationDelay: '1s' }}>🌻</div>

        <div className="card slide-up">
          <div className="card-avatar">
            <span role="img" aria-label="mom and baby">👩‍👦</span>
          </div>

          <div className="tag delay-1">💕 FOR THE ONE WHO MADE EVERYTHING</div>

          <SplitText
            text="Happy mother Day Mom!!"
            tag="h1"
            delay={50}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="center"
          />
          <p className="for-line fade-in-up delay-2">for Mum ♡</p>

          <div className="divider fade-in-up delay-3">
            <span>✿</span>
          </div>

          <p className="fade-in-up delay-3">
            Today is yours. A whole little garden of gratitude —
            for every meal, every late-night talk, and every quiet
            way you held us together. Take a moment, and let
            me say it properly.
          </p>

          <div className="leaf-left">🌿</div>
          <div className="leaf-right">🌿</div>
        </div>

        <button className="cta-btn slide-up delay-4" onClick={onNext}>
          PICK A FLOWER FOR MUM →
        </button>
      </div>
    </section>
  )
}

/* ───── Flower Garden ───── */
function FlowerGarden({ onComplete }: { onComplete: () => void }) {
  const [picked, setPicked] = useState<boolean[]>([false, false, false])
  const [activeNote, setActiveNote] = useState<number | null>(null)
  const [collectedFlowers, setCollectedFlowers] = useState<string[]>([])

  const pickFlower = (index: number) => {
    if (!picked[index]) {
      const newPicked = [...picked]
      newPicked[index] = true
      setPicked(newPicked)
      setCollectedFlowers(prev => [...prev, FLOWERS[index].emoji])
    }
    setActiveNote(index)
  }

  const closeNote = useCallback(() => {
    setActiveNote(null)
    if (picked.every(Boolean)) {
      setTimeout(onComplete, 500)
    }
  }, [picked, onComplete])

  const allPicked = picked.every(Boolean)

  return (
    <section className="section" id="garden-section">
      <h2 className="garden-title fade-in-up">a tiny bouquet of gratitude</h2>
      <p className="garden-sub fade-in-up delay-1">pick each flower — there's a little note inside ♡</p>

      <div className="flower-cards fade-in-up delay-2">
        {FLOWERS.map((flower, i) => (
          <div
            key={i}
            className={`flower-card ${picked[i] ? 'picked' : ''}`}
            onClick={() => pickFlower(i)}
          >
            <span className="flower-emoji">{flower.emoji}</span>
            <span className="pick-label">{picked[i] ? '✓ PICKED' : 'PICK ME'}</span>
          </div>
        ))}
      </div>

      {/* Vase */}
      <div className="vase fade-in-up delay-3">
        <div className="vase-flowers">
          {collectedFlowers.map((f, i) => (
            <span key={i} className="fade-in" style={{ animationDelay: `${i * 0.2}s` }}>{f}</span>
          ))}
        </div>
        <div className="vase-rim" />
        <div className="vase-body" />
      </div>

      <div className="progress-dots fade-in delay-3">
        {picked.map((p, i) => (
          <div key={i} className={`dot ${p ? 'active' : ''}`} />
        ))}
      </div>

      {allPicked && picked.every(Boolean) && (
        <button className="cta-btn slide-up" onClick={onComplete} style={{ marginTop: '1.5rem' }}>
          CONTINUE →
        </button>
      )}

      {/* Flower Note Overlay */}
      {activeNote !== null && (
        <div className="flower-note-overlay" onClick={closeNote}>
          <div className="flower-note" onClick={e => e.stopPropagation()}>
            <button className="close-note" onClick={closeNote}>✕</button>
            <div className="note-flower">{FLOWERS[activeNote].emoji}</div>
            <h3>{FLOWERS[activeNote].title}</h3>
            <p>{FLOWERS[activeNote].note}</p>
          </div>
        </div>
      )}
    </section>
  )
}

/* ───── Photo Gallery ───── */
function PhotoGallery({ onNext }: { onNext: () => void }) {
  const photos = [
    { src: '/pics/1.jpeg', caption: 'Always Together', position: '50% 20%' },
    { src: '/pics/2.jpeg', caption: 'Beautiful Moments', position: '50% 20%' },
    { src: '/pics/3.jpeg', caption: 'Sweet Memories', position: '50% 40%' },
  ];

  return (
    <section className="section gallery-section" id="gallery-section">
      <h2 className="garden-title fade-in-up">Precious Memories</h2>
      <p className="garden-sub fade-in-up delay-1">Just a few of my favorite moments with you ♡</p>

      <div className="gallery-grid fade-in-up delay-2">
        {photos.map((img, i) => (
          <div key={i} className={`polaroid polaroid-${i + 1}`}>
            <div className="polaroid-img-wrapper">
              <img src={img.src} alt={img.caption} style={{ objectPosition: img.position }} />
            </div>
            <div className="polaroid-caption">{img.caption}</div>
          </div>
        ))}
      </div>

      <button className="cta-btn slide-up delay-3" onClick={onNext} style={{ marginTop: '3rem' }}>
        CONTINUE →
      </button>
    </section>
  )
}

/* ───── Thank You Card ───── */
function ThankYou({ onNext }: { onNext: () => void }) {
  return (
    <section className="section thankyou-section" id="thankyou-section">
      <div style={{ position: 'relative', paddingTop: '3rem' }}>
        <div className="deco-flower" style={{ top: '-10px', left: '-20px' }}>🌸</div>
        <div className="deco-flower" style={{ top: '-20px', right: '-30px', animationDelay: '1.5s' }}>🌻</div>

        <div className="card slide-up">
          <div className="card-avatar">
            <span role="img" aria-label="cats with heart">😻💕</span>
          </div>

          <h1 className="fade-in-up delay-1" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2rem)' }}>
            thank you, mum.
          </h1>

          <p className="fade-in-up delay-2" style={{ marginTop: '1rem' }}>
            for the patience, the lullabies, the second
            helpings. for being the safest place i know. i hope
            today feels as gentle as you've always made my
            days feel.
          </p>

          <div className="leaf-left">🌿</div>
          <div className="leaf-right" style={{ right: '10px', bottom: '8px' }}>🌸</div>
        </div>

        <button className="cta-btn slide-up delay-3" onClick={onNext}>
          READ MY LETTER →
        </button>
      </div>
    </section>
  )
}

/* ───── Final Letter ───── */
function FinalLetter() {
  return (
    <section className="section letter-section" id="letter-section">
      <div className="letter slide-up">
        <p className="letter-date">May 10, 2026</p>
        <p className="letter-greeting">Dear Amma,</p>

        <p className="letter-body">
          I don't say it enough, but you are the reason I am who I am today. Every sacrifice you
          made, every prayer you whispered, every meal you cooked with love — I carry all of it
          with me, everywhere I go.
        </p>
        <p className="letter-body">
          You taught me what strength looks like — not loud, not flashy, but quiet, steady, and
          unwavering. You held our family together in ways I'm only now beginning to understand.
        </p>
        <p className="letter-body">
          Thank you for the late nights, the early mornings, the endless patience, and the love
          that never once felt like it had a condition. I hope I make you proud. And I hope today,
          even just a little, you feel how much you mean to me.
        </p>
        <p className="letter-body">
          I love you more than words on a screen could ever say. But this is my small try. 💕
        </p>

        <p className="letter-closing">
          With all my love,<br />
          Your child ♡
        </p>
        <div className="letter-heart">💐</div>
      </div>

      <div className="final-footer fade-in-up delay-3">
        made with love, for the world's best mum 💕
      </div>
    </section>
  )
}

/* ───── Main App ───── */
type Stage = 'envelope' | 'intro' | 'garden' | 'photos' | 'thankyou' | 'letter'

export default function App() {
  const [stage, setStage] = useState<Stage>('envelope')
  const [transitioning, setTransitioning] = useState(false)

  const goTo = useCallback((next: Stage) => {
    setTransitioning(true)
    setTimeout(() => {
      setStage(next)
      setTransitioning(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 400)
  }, [])

  useEffect(() => {
    // Preload fonts
    document.fonts.ready.then(() => {
      document.body.classList.add('fonts-loaded')
    })
  }, [])

  return (
    <>
      <FloatingParticles />
      <main style={{ opacity: transitioning ? 0 : 1, transition: 'opacity 0.4s ease' }}>
        {stage === 'envelope' && <Envelope onOpen={() => goTo('intro')} />}
        {stage === 'intro' && <IntroCard onNext={() => goTo('garden')} />}
        {stage === 'garden' && <FlowerGarden onComplete={() => goTo('photos')} />}
        {stage === 'photos' && <PhotoGallery onNext={() => goTo('thankyou')} />}
        {stage === 'thankyou' && <ThankYou onNext={() => goTo('letter')} />}
        {stage === 'letter' && <FinalLetter />}
      </main>
    </>
  )
}
