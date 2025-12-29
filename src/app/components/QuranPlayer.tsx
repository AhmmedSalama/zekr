'use client'

import Image from "next/image"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import BestreadersSlider from "./BestreadersSlider"

type Surah = { id: number; name: string; audio: string; reader: string }
type Moshaf = { id: number; name: string; server: string; surah_list: string }
type Reciter = { id: number; name: string; moshaf: Moshaf[] }
type Reader = { identifier: number; name: string }

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

const surahNames = [
  "سُورَةُ ٱلْفَاتِحَةِ", "سُورَةُ البَقَرَةِ", "سُورَةُ آلِ عِمۡرَانَ", "سُورَةُ النِّسَاءِ", "سُورَةُ المَائـِدَةِ", 
  "سُورَةُ الأَنۡعَامِ", "سُورَةُ الأَعۡرَافِ", "سُورَةُ الأَنفَالِ", "سُورَةُ التَّوۡبَةِ", "سُورَةُ يُونُسَ",
  "سُورَةُ هُودٍ", "سُورَةُ يُوسُفَ", "سُورَةُ الرَّعۡدِ", "سُورَةُ إِبۡرَاهِيمَ", "سُورَةُ الحِجۡرِ", 
  "سُورَةُ النَّحۡلِ", "سُورَةُ الإِسۡرَاءِ", "سُورَةُ الكَهۡفِ", "سُورَةُ مَرۡيَمَ", "سُورَةُ طه",
  "سُورَةُ الأَنبِيَاءِ", "سُورَةُ الحَجِّ", "سُورَةُ المُؤۡمِنُونَ", "سُورَةُ النُّورِ", "سُورَةُ الفُرۡقَانِ", 
  "سُورَةُ الشُّعَرَاءِ", "سُورَةُ النَّمۡلِ", "سُورَةُ القَصَصِ", "سُورَةُ العَنكَبُوتِ", "سُورَةُ الرُّومِ",
  "سُورَةُ لُقۡمَانَ", "سُورَةُ السَّجۡدَةِ", "سُورَةُ الأَحۡزَابِ", "سُورَةُ سَبَإٍ", "سُورَةُ فَاطِرٍ", 
  "سُورَةُ يسٓ", "سُورَةُ الصَّافَّاتِ", "سُورَةُ صٓ", "سُورَةُ الزُّمَرِ", "سُورَةُ غَافِرٍ",
  "سُورَةُ فُصِّلَتۡ", "سُورَةُ الشُّورَىٰ", "سُورَةُ الزُّخۡرُفِ", "سُورَةُ الدُّخَانِ", "سُورَةُ الجَاثِيَةِ", 
  "سُورَةُ الأَحۡقَافِ", "سُورَةُ مُحَمَّدٍ", "سُورَةُ الفَتۡحِ", "سُورَةُ الحُجُرَاتِ", "سُورَةُ قٓ",
  "سُورَةُ الذَّارِيَاتِ", "سُورَةُ الطُّورِ", "سُورَةُ النَّجۡمِ", "سُورَةُ القَمَرِ", "سُورَةُ الرَّحۡمَٰن", 
  "سُورَةُ الوَاقِعَةِ", "سُورَةُ الحَدِيدِ", "سُورَةُ المُجَادلَةِ", "سُورَةُ الحَشۡرِ", "سُورَةُ المُمۡتَحنَةِ",
  "سُورَةُ الصَّفِّ", "سُورَةُ الجُمُعَةِ", "سُورَةُ المُنَافِقُونَ", "سُورَةُ التَّغَابُنِ", "سُورَةُ الطَّلَاقِ", 
  "سُورَةُ التَّحۡرِيمِ", "سُورَةُ المُلۡكِ", "سُورَةُ القَلَمِ", "سُورَةُ الحَاقَّةِ", "سُورَةُ المَعَارِجِ",
  "سُورَةُ نُوحٍ", "سُورَةُ الجِنِّ", "سُورَةُ المُزَّمِّلِ", "سُورَةُ المُدَّثِّرِ", "سُورَةُ القِيَامَةِ", 
  "سُورَةُ الإِنسَانِ", "سُورَةُ المُرۡسَلَاتِ", "سُورَةُ النَّبَإِ", "سُورَةُ النَّازِعَاتِ", "سُورَةُ عَبَسَ",
  "سُورَةُ التَّكۡوِيرِ", "سُورَةُ الانفِطَارِ", "سُورَةُ المُطَفِّفِينَ", "سُورَةُ الانشِقَاقِ", "سُورَةُ البُرُوجِ", 
  "سُورَةُ الطَّارِقِ", "سُورَةُ الأَعۡلَىٰ", "سُورَةُ الغَاشِيَةِ", "سُورَةُ الفَجۡرِ", "سُورَةُ البَلَدِ",
  "سُورَةُ الشَّمۡسِ", "سُورَةُ اللَّيۡلِ", "سُورَةُ الضُّحَىٰ", "سُورَةُ الشَّرۡحِ", "سُورَةُ التِّينِ", 
  "سُورَةُ العَلَقِ", "سُورَةُ القَدۡرِ", "سُورَةُ البَيِّنَةِ", "سُورَةُ الزَّلۡزَلَةِ", "سُورَةُ العَادِيَاتِ",
  "سُورَةُ القَارِعَةِ", "سُورَةُ التَّكَاثُرِ", "سُورَةُ العَصۡرِ", "سُورَةُ الهُمَزَةِ", "سُورَةُ الفِيلِ", 
  "سُورَةُ قُرَيۡشٍ", "سُورَةُ المَاعُونِ", "سُورَةُ الكَوۡثَرِ", "سُورَةُ الكَافِرُونَ", "سُورَةُ النَّصۡرِ",
  "سُورَةُ المَسَدِ", "سُورَةُ الإِخۡلَاصِ", "سُورَةُ الفَلَقِ", "سُورَةُ النَّاسِ"
]

function QuranPlayer() {
  const [reciters, setReciters] = useState<Reader[]>([])
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [activeSurah, setActiveSurah] = useState<Surah | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  
  const [readerSearch, setReaderSearch] = useState("")
  const [debouncedReaderSearch, setDebouncedReaderSearch] = useState("")
  
  const [selectedReader, setSelectedReader] = useState<Reader | null>(null)
  const [currentMoshaf, setCurrentMoshaf] = useState<Moshaf | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [loop, setLoop] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // جلب جميع القراء
  useEffect(() => {
    const fetchReciters = async () => {
      try {
        setLoading(true)
        const res = await fetch('https://mp3quran.net/api/v3/reciters?language=ar')
        const data = await res.json()
        const mappedReciters: Reader[] = data.reciters.map((r: any) => ({
          identifier: r.id,
          name: r.name
        }))
        setReciters(mappedReciters)
        if (mappedReciters.length > 0) {
          const firstReader = mappedReciters[0]
          setSelectedReader(firstReader)
          loadReciterMoshafInternal(firstReader.identifier, false)
        }
      } catch (e: any) {
        setError(e.message || "خطأ في الاتصال")
      } finally {
        setLoading(false)
      }
    }
    fetchReciters()
  }, [])

  const loadReciterMoshafInternal = useCallback(async (reciterId: number, autoPlay: boolean = false) => {
    try {
      const res = await fetch(`https://mp3quran.net/api/v3/reciters?language=ar&reciter=${reciterId}`)
      const data = await res.json()
      
      if (data.reciters?.[0]?.moshaf?.[0]) {
        const moshaf = data.reciters[0].moshaf[0]
        setCurrentMoshaf(moshaf)

        const surahList = moshaf.surah_list
          .split(',')
          .map((n: string) => Number(n.trim()))
          .filter((n: number) => !isNaN(n))

        const mapped: Surah[] = surahList.map((surahId: number) => {
          const paddedId = surahId.toString().padStart(3, '0')
          return {
            id: surahId,
            name: surahNames[surahId - 1] || `سورة ${surahId}`,
            audio: `${moshaf.server}${paddedId}.mp3`,
            reader: selectedReader?.name || ''
          }
        })

        setSurahs(mapped)

        if (mapped.length > 0) {
          const firstSurah = mapped[0]
          setActiveSurah(firstSurah)

          if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
            audioRef.current.src = ''
          }

          const audio = new Audio(firstSurah.audio)
          audio.volume = muted ? 0 : volume
          audioRef.current = audio

          if (autoPlay) {
            audio.play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false))
          } else {
            setIsPlaying(false)
          }
        }
      }
    } catch (e) {
      console.error('Error loading moshaf:', e)
      setError("حدث خطأ أثناء تحميل المصحف")
    }
  }, [muted, volume, selectedReader?.name])

  const handleReaderChange = useCallback(async (reader: Reader) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current.src = ''
      audioRef.current = null
    }

    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    setSelectedReader(reader)
    await loadReciterMoshafInternal(reader.identifier, true)
  }, [loadReciterMoshafInternal])

  // Debounce للبحث في السور
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Debounce للبحث في القراء
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedReaderSearch(readerSearch), 300)
    return () => clearTimeout(timer)
  }, [readerSearch])

  const filteredSurahs = useMemo(() => 
    surahs.filter(s => s.name.toLowerCase().includes(debouncedSearch.toLowerCase())),
    [surahs, debouncedSearch]
  )

  const filteredReaders = useMemo(() => 
    reciters.filter(r => r.name.toLowerCase().includes(debouncedReaderSearch.toLowerCase())),
    [reciters, debouncedReaderSearch]
  )

  const ensureAudio = useCallback((surah: Surah) => {
    let audio = audioRef.current
    if (!audio) {
      audio = new Audio(surah.audio)
      audioRef.current = audio
    } else if (audio.src !== surah.audio) {
      audio.pause()
      audio.currentTime = 0
      audio.src = surah.audio
      audio.load()
    }
    audio.volume = muted ? 0 : volume
    return audio
  }, [muted, volume])

  const loadAndPlay = useCallback(async (surah: Surah) => {
    const audio = ensureAudio(surah)
    try {
      await audio.play()
      setIsPlaying(true)
      setActiveSurah(surah)
    } catch {
      setIsPlaying(false)
    }
  }, [ensureAudio])

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) {
      if (activeSurah) loadAndPlay(activeSurah)
      return
    }
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    }
  }, [activeSurah, isPlaying, loadAndPlay])

  const handleNext = useCallback(() => {
    if (!activeSurah || surahs.length === 0) return
    const idx = surahs.findIndex(s => s.id === activeSurah.id)
    loadAndPlay(surahs[(idx + 1) % surahs.length])
  }, [activeSurah, surahs, loadAndPlay])

  const handlePrev = useCallback(() => {
    if (!activeSurah || surahs.length === 0) return
    const idx = surahs.findIndex(s => s.id === activeSurah.id)
    loadAndPlay(surahs[(idx - 1 + surahs.length) % surahs.length])
  }, [activeSurah, surahs, loadAndPlay])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    const newMuted = !muted
    setMuted(newMuted)
    audio.volume = newMuted ? 0 : volume
  }, [muted, volume])

  const toggleLoop = useCallback(() => setLoop(prev => !prev), [])

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio || duration === 0) return
    const value = Number(e.target.value)
    audio.currentTime = (value / 100) * duration
    setCurrentTime(audio.currentTime)
  }, [duration])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoaded = () => setDuration(audio.duration || 0)
    const handleTime = () => setCurrentTime(audio.currentTime || 0)
    const handleEnded = () => {
      if (loop) {
        audio.currentTime = 0
        audio.play()
      } else {
        handleNext()
      }
    }

    audio.addEventListener("loadedmetadata", handleLoaded)
    audio.addEventListener("timeupdate", handleTime)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded)
      audio.removeEventListener("timeupdate", handleTime)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [activeSurah, loop, handleNext])

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="mt-[100px]" dir="rtl">
      <div className="flex flex-col items-center md:items-start md:flex-row gap-4 mb-[100px]">
        
        {/* قائمة السور */}
        <div className="p-4 w-full md:w-[405px] h-[606px] bg-[#092147] rounded-[20px]">
          <h2 className="text-[24px] text-[#FFFEEE] font-bold mb-6">فهرس السور</h2>
          
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <Image src="/search-02.webp" alt="search" width={20} height={20} />
            </div>
            <input
              type="text"
              placeholder="ابحث عن سورة"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0A102A] text-[#FAFAFAB2] text-[12px] font-normal rounded-[12px] border-[0.5px] border-[#B7B7B7B2] py-3 pr-11 pl-4 focus:outline-none focus:border-[#E7D7A0] transition-colors placeholder-[#FAFAFAB2]"
            />
          </div>

          <div className="mt-6 h-[440px] overflow-y-auto pr-1 ">
            {loading && (
              <p className="text-center text-[13px] text-[#FAFAFAB2]">جاري تحميل السور...</p>
            )}
            {error && !loading && (
              <p className="text-center text-[13px] text-red-400">{error}</p>
            )}

            {!loading && !error && activeSurah && filteredSurahs.map((surah, index) => {
              const isActive = activeSurah.id === surah.id
              return (
                <div
                  key={`${surah.id}-${index}`}
                  onClick={() => loadAndPlay(surah)}
                  className={`flex items-center justify-between p-3 mb-2 rounded-[12px] cursor-pointer transition-all ${
                    isActive
                      ? "border-[0.5px] border-[#E7D7A0] bg-[linear-gradient(90deg,rgba(231,215,160,0.25)_0%,rgba(16,24,53,0.25)_86.06%)]"
                      : "bg-transparent hover:bg-[#FFFFFF0D] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-[14px] font-bold ${
                        isActive ? "bg-[#2D3B58] text-[#E7D7A0]" : "bg-[#101B38] text-[#FFFFFF66]"
                      }`}
                    >
                      {surah.id}
                    </div>
                    <div>
                      <h3 className="text-[16px] text-[#FFFEEE] font-bold">{surah.name}</h3>
                    </div>
                  </div>
                  <div className="ml-2">
                    <Image
                      src={isActive && isPlaying ? "/pause.webp" : "/play.webp"}
                      alt="status"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* مشغل القرآن */}
        <div className="p-8 w-full md:w-[843px] bg-[#092147] rounded-[20px] flex flex-col justify-between relative overflow-hidden">
          <div className="relative w-full mb-4">
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <Image src="/search-02.webp" alt="search" width={20} height={20} />
            </div>
            <input
              type="text"
              placeholder="ابحث عن قارئ..."
              value={readerSearch}
              onChange={(e) => setReaderSearch(e.target.value)}
              className="w-full bg-[#0A102A] text-[#FAFAFAB2] text-[12px] font-normal rounded-[12px] border-[0.5px] border-[#B7B7B7B2] py-3 pr-11 pl-4 focus:outline-none focus:border-[#E7D7A0] transition-colors placeholder-[#FAFAFAB2]"
            />
          </div>

          <div className="max-h-[120px] overflow-y-auto mb-6 space-y-2 scrollbar-thin">
            {filteredReaders.map((reader) => (
              <label
                key={reader.identifier}
                onClick={() => handleReaderChange(reader)}
                className={`flex items-center gap-3 p-2 rounded-[12px] cursor-pointer transition-all ${
                  selectedReader?.identifier === reader.identifier
                    ? "bg-[#E7D7A01A] border border-[#E7D7A0]"
                    : "bg-[#101B38] hover:bg-[#1a2b5a]"
                }`}
              >
                <input
                  type="radio"
                  name="reader"
                  checked={selectedReader?.identifier === reader.identifier}
                  onChange={() => {}}
                  className="w-3 h-3 accent-[#E7D7A0]"
                />
                <span className="text-[13px] text-[#FFFEEE]">{reader.name}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-6 items-start">
            <div className="relative w-[180px] h-[180px] rounded-[20px] overflow-hidden border-2 border-[#E7D7A0]">
              <Image src="/quran-cover.webp" alt="cover" fill className="object-cover" />
            </div>
            <div className="text-right mt-5">
              <p className="text-[#FBF9EF] text-[12px] font-normal mb-2">يتم الآن الاستماع إلى</p>
              <h1 className="text-[#FFFEEE] text-[32px] font-bold mb-1">
                {activeSurah ? activeSurah.name : "جاري التحميل"}
              </h1>
              <p className="text-[#E7D7A0] text-[18px] font-normal">{selectedReader?.name || "—"}</p>
            </div>
          </div>

          <div className="w-full mt-auto">
            <div className="flex justify-between text-[12px] text-[#FAFAFAB2] mb-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="relative w-full cursor-pointer">
              <input
                type="range"
                min={0}
                max={100}
                value={progressPercent}
                onChange={handleSeek}
                className="quran-range w-full cursor-pointer"
                style={{ ["--progress" as any]: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-center gap-8 mt-6">
              <button onClick={toggleMute} className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <Image
                  src={muted || volume === 0 ? "/mute.webp" : "/volume-high.webp"}
                  alt="volume"
                  width={24}
                  height={24}
                />
              </button>

              <button onClick={handleNext} className="hover:scale-110 cursor-pointer transition-transform">
                <Image src="/next.webp" alt="next" width={32} height={32} />
              </button>

              <button
                onClick={togglePlay}
                className="w-[64px] h-[64px] cursor-pointer flex items-center justify-center border-2 border-[#E7D7A0] rounded-full hover:bg-[#E7D7A01A] transition-colors"
              >
                <Image src={isPlaying ? "/pause.webp" : "/play.webp"} alt="status" width={24} height={24} />
              </button>



               <button onClick={handlePrev} className="hover:scale-110 cursor-pointer transition-transform">
                <Image src="/previous.webp" alt="prev" width={32} height={32} />
              </button>

              <button
                onClick={toggleLoop}
                className={`transition-opacity ${loop ? "opacity-100" : "opacity-60 hover:opacity-100"}  cursor-pointer`}
              >
                <Image src="/repeat.webp" alt="repeat" width={24} height={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <BestreadersSlider />

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #101B38;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #E7D7A0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}

export default QuranPlayer