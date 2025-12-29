'use client'
import Image from "next/image"
import { useEffect, useState } from "react"

export default function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      setScrollProgress(scrollPercent)
      setShowScrollTop(scrollTop > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!showScrollTop) return null


  const radius = 22
  const circumference = 2 * Math.PI * radius
  const clampedProgress = Math.min(Math.max(scrollProgress, 0), 100)
  const offset = circumference - (clampedProgress / 100) * circumference

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 cursor-pointer w-12 h-12 flex items-center justify-center bg-[#101B38] rounded-full hover:bg-[#1a2b5a] transition-all"
    >
      {/* البوردر الدائري المتحرك */}
      <svg
        className="absolute top-0 left-0 w-12 h-12 -rotate-90 pointer-events-none"
        viewBox="0 0 48 48"
      >

        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="rgba(231, 215, 160, 0.25)"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#E7D7A0"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      {/* صورة السهم اللي انت حاططها */}
      <Image
        src="/arrowtop.webp"
        alt="Back to top"
        width={10}
        height={20}
        className="relative"
      />
    </button>
  )
}
