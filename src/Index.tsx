import { useRef, useCallback } from 'react'
import { Globe, ArrowRight, Send, Share2 } from 'lucide-react'

function Index() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const animateOpacity = (
    el: HTMLElement,
    from: number,
    to: number,
    duration: number
  ) => {
    const start = performance.now()
    el.style.opacity = String(from)
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      el.style.opacity = String(from + (to - from) * t)
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  const handleCanPlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.play()
    animateOpacity(video, 0, 1, 500)
  }, [])

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current
    if (!video || video.duration === 0) return
    const remaining = video.duration - video.currentTime
    if (remaining <= 0.55 && parseFloat(video.style.opacity || '1') > 0.1) {
      animateOpacity(video, parseFloat(video.style.opacity || '1'), 0, 500)
    }
  }, [])

  const handleEnded = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.style.opacity = '0'
    setTimeout(() => {
      video.currentTime = 0
      video.play()
      animateOpacity(video, 0, 1, 500)
    }, 100)
  }, [])

  return (
    <section className="min-h-screen overflow-hidden relative flex flex-col bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-bottom"
        style={{ opacity: 0 }}
        muted
        autoPlay
        playsInline
        preload="auto"
        onCanPlay={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
          type="video/mp4"
        />
      </video>

      {/* Navbar */}
      <nav className="relative z-20 px-6 py-6">
        <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Globe size={24} className="text-white" />
            <span className="text-white font-semibold text-lg ml-2">Asme</span>
            <div className="hidden md:flex items-center gap-8 ml-8">
              <a href="#" className="text-white/80 hover:text-white text-sm font-medium">
                Features
              </a>
              <a href="#" className="text-white/80 hover:text-white text-sm font-medium">
                Pricing
              </a>
              <a href="#" className="text-white/80 hover:text-white text-sm font-medium">
                About
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white text-sm font-medium">Sign Up</button>
            <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
        <h1
          className="text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Know it then <em className="italic">all</em>.
        </h1>

        <div className="max-w-xl w-full mt-8">
          <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/40 text-sm"
            />
            <button className="bg-white rounded-full p-3 text-black flex-shrink-0">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <p className="text-white text-sm leading-relaxed px-4 mt-6 max-w-xl">
          Stay updated with the latest news and insights. Subscribe to our newsletter today and
          never miss out on exciting updates.
        </p>

        <button className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors mt-6">
          Manifesto
        </button>
      </div>

      {/* Social Icons Footer */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
          <Send size={20} />
        </button>
        <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
          <Share2 size={20} />
        </button>
        <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
          <Globe size={20} />
        </button>
      </div>
    </section>
  )
}

export default Index
