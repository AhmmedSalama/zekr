'use client'

import { useEffect, useRef, useState } from 'react'
import { Download, Monitor, Smartphone } from 'lucide-react'

export default function QuranHeartTracker() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [customWidth, setCustomWidth] = useState(1920)
  const [customHeight, setCustomHeight] = useState(1080)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCustomWidth(window.screen.width)
      setCustomHeight(window.screen.height)
    }
  }, [])

  useEffect(() => {
    const loadSVG = async () => {
      try {
        const response = await fetch('/heart.svg')
        const svgText = await response.text()
        
        if (containerRef.current) {
          containerRef.current.innerHTML = svgText
          const groups = containerRef.current.querySelectorAll<HTMLElement>('.section-group')
          loadActiveSections()
          
          groups.forEach(group => {
            group.addEventListener('click', () => {
              const paths = group.querySelectorAll<HTMLElement>('.section')
              const isActive = paths[0]?.classList.contains('active')
              paths.forEach(p => p.classList.toggle('active', !isActive))
              saveActiveSections()
            })
          })
        }
      } catch (error) {
        console.error('Error loading SVG:', error)
      }
    }
    loadSVG()
  }, [])

  const saveActiveSections = () => {
    if (!containerRef.current) return
    const activeIds: string[] = []
    containerRef.current.querySelectorAll<HTMLElement>('.section.active').forEach(p => {
      if (p.id) activeIds.push(p.id)
    })
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeSections', JSON.stringify(activeIds))
    }
  }

  const loadActiveSections = () => {
    if (typeof window === 'undefined' || !containerRef.current) return
    const activeIds: string[] = JSON.parse(localStorage.getItem('activeSections') || '[]')
    activeIds.forEach((id: string) => {
      const elem = document.getElementById(id)
      if (elem) elem.classList.add('active')
    })
  }

  const downloadSVG = (width: number, height: number) => {
    if (!containerRef.current) return
    const svgElement = containerRef.current.querySelector<SVGSVGElement>('svg')
    if (!svgElement) return

    const clonedSVG = svgElement.cloneNode(true) as SVGSVGElement
    const bbox = svgElement.getBBox()
    const svgWidth = bbox.width
    const svgHeight = bbox.height
    const svgAspectRatio = svgWidth / svgHeight
    const targetAspectRatio = width / height

    let scaledWidth, scaledHeight
    if (svgAspectRatio > targetAspectRatio) {
      scaledWidth = width * 0.8
      scaledHeight = scaledWidth / svgAspectRatio
    } else {
      scaledHeight = height * 0.8
      scaledWidth = scaledHeight * svgAspectRatio
    }

    const x = (width - scaledWidth) / 2
    const y = (height - scaledHeight) / 2

    clonedSVG.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`)
    clonedSVG.setAttribute('width', scaledWidth.toString())
    clonedSVG.setAttribute('height', scaledHeight.toString())

    const styleElement = document.createElementNS('http://www.w3.org/2000/svg', 'style')
    styleElement.textContent = `
      .section { fill: #ffffff; transition: fill 0.25s ease; }
      .section.active { fill: #E5BC69; }
      .section-text { fill: #000000; font-size: 14px; font-weight: bold; pointer-events: none; user-select: none; transition: fill 0.25s ease; }
      .section.active + .section-text { fill: #ffffff; }
    `
    clonedSVG.insertBefore(styleElement, clonedSVG.firstChild)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#222831'
    ctx.fillRect(0, 0, width, height)

    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(clonedSVG)
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const img = new Image()
    img.onload = function () {
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight)

      canvas.toBlob(function (blob) {
        if (!blob) return
        const link = document.createElement('a')
        link.download = `quran-heart-${width}x${height}.png`
        link.href = URL.createObjectURL(blob)
        link.click()
        URL.revokeObjectURL(link.href)
      }, 'image/png', 1.0)

      URL.revokeObjectURL(url)
    }
    img.src = url
  }

  const handleCustomDownload = () => {
    if (customWidth >= 100 && customWidth <= 10000 && customHeight >= 100 && customHeight <= 10000) {
      downloadSVG(customWidth, customHeight)
      setShowModal(false)
    } else {
      alert('Please enter valid dimensions between 100 and 10000 pixels')
    }
  }

  return (
    <div dir="ltr" className="w-full min-h-screen flex flex-col items-center justify-center ">
      <style jsx global>{`
        .section {
          fill: #ffffff;
          cursor: pointer;
          transition: fill 0.25s ease;
        }
        .section.active {
          fill: #E5BC69;
        }
        .section-text {
          fill: #000000;
          font-size: 14px;
          font-weight: bold;
          pointer-events: none;
          user-select: none;
          transition: fill 0.25s ease;
        }
        .section.active + .section-text {
          fill: #ffffff;
        }
      `}</style>

      <div ref={containerRef} id="svg-container" className="w-full max-w-[500px] md:max-w-[600px] lg:max-w-[650px] h-auto"></div>

      <div className="w-full max-w-[600px] bg-[#222831]/95 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-[10px] border border-white/10 p-6 md:p-5 sm:p-4">
        <div className="text-white text-lg font-semibold text-center mb-5 md:mb-4 md:text-base sm:text-[15px]">Download Options</div>

        <div className="hidden md:flex flex-col gap-3">
          <button onClick={() => downloadSVG(1920, 1080)} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#E5BC69]/10 border border-[#E5BC69]/30 hover:bg-[#E5BC69]/20 hover:border-[#E5BC69] transition-all duration-300">
            <Monitor size={24} className="text-[#E5BC69]" />
            <span className="text-white font-medium">Desktop (1920x1080)</span>
          </button>

          <button onClick={() => downloadSVG(1080, 1920)} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#E5BC69]/10 border border-[#E5BC69]/30 hover:bg-[#E5BC69]/20 hover:border-[#E5BC69] transition-all duration-300">
            <Smartphone size={24} className="text-[#E5BC69]" />
            <span className="text-white font-medium">Mobile (1080x1920)</span>
          </button>

          <button onClick={() => setShowModal(true)} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#E5BC69]/10 border border-[#E5BC69]/30 hover:bg-[#E5BC69]/20 hover:border-[#E5BC69] transition-all duration-300">
            <Download size={24} className="text-[#E5BC69]" />
            <span className="text-white font-medium">Custom Size</span>
          </button>
        </div>

        <div className="flex md:hidden justify-center gap-4">
          <button onClick={() => downloadSVG(1920, 1080)} className="w-14 h-14 rounded-xl bg-[#E5BC69]/10 border-2 border-[#E5BC69]/30 flex items-center justify-center hover:bg-[#E5BC69]/20 hover:border-[#E5BC69] transition-all duration-300 active:scale-95">
            <Monitor size={24} className="text-[#E5BC69]" />
          </button>
          <button onClick={() => downloadSVG(1080, 1920)} className="w-14 h-14 rounded-xl bg-[#E5BC69]/10 border-2 border-[#E5BC69]/30 flex items-center justify-center hover:bg-[#E5BC69]/20 hover:border-[#E5BC69] transition-all duration-300 active:scale-95">
            <Smartphone size={24} className="text-[#E5BC69]" />
          </button>
          <button onClick={() => setShowModal(true)} className="w-14 h-14 rounded-xl bg-[#E5BC69]/10 border-2 border-[#E5BC69]/30 flex items-center justify-center hover:bg-[#E5BC69]/20 hover:border-[#E5BC69] transition-all duration-300 active:scale-95">
            <Download size={24} className="text-[#E5BC69]" />
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/70 z-[1000] flex justify-center items-center backdrop-blur-[5px] p-5 animate-fadeIn" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false) }}>
          <div className="bg-[#2d3440] rounded-2xl p-8 w-full max-w-[400px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 md:p-6 md:w-[95%] sm:p-5 animate-scaleIn">
            <h2 className="text-white mb-6 text-2xl font-semibold text-center md:text-xl md:mb-5 sm:text-lg">Custom Size</h2>
            <div className="mb-5 sm:mb-4">
              <label htmlFor="custom-width" className="block text-white mb-2 text-sm font-medium">Width (pixels)</label>
              <input type="number" id="custom-width" value={customWidth} onChange={(e) => setCustomWidth(parseInt(e.target.value) || 0)} min={100} max={10000} className="w-full px-4 py-3 rounded-lg border border-white/20 bg-[#222831]/60 text-white text-base transition-all duration-300 focus:outline-none focus:border-[#E5BC69] focus:bg-[#222831]/80 sm:px-3 sm:py-2.5 sm:text-sm" />
            </div>
            <div className="mb-5 sm:mb-4">
              <label htmlFor="custom-height" className="block text-white mb-2 text-sm font-medium">Height (pixels)</label>
              <input type="number" id="custom-height" value={customHeight} onChange={(e) => setCustomHeight(parseInt(e.target.value) || 0)} min={100} max={10000} className="w-full px-4 py-3 rounded-lg border border-white/20 bg-[#222831]/60 text-white text-base transition-all duration-300 focus:outline-none focus:border-[#E5BC69] focus:bg-[#222831]/80 sm:px-3 sm:py-2.5 sm:text-sm" />
            </div>
            <div className="flex gap-3 mt-7">
              <button className="flex-1 px-6 py-3 rounded-lg border-none text-base font-semibold cursor-pointer transition-all duration-300 bg-white/10 text-white border border-white/20 hover:bg-white/[0.15] sm:px-4 sm:py-2.5 sm:text-sm" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="flex-1 px-6 py-3 rounded-lg border-none text-base font-semibold cursor-pointer transition-all duration-300 bg-[#E5BC69] text-[#222831] hover:bg-[#d6ae5e] hover:shadow-[0_4px_12px_rgba(229,188,105,0.4)] sm:px-4 sm:py-2.5 sm:text-sm" onClick={handleCustomDownload}>Download</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
      `}</style>
    </div>
  )
}
