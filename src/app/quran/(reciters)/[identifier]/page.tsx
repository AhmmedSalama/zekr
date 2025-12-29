'use client'


import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"


type ApiSurah = {
  number: number
  name: string
  englishName: string
  numberOfAyahs: number
}


type Surah = {
  id: number
  name: string
  ayahs: number
  reader: string
  audio: string
}


function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}


const recitersData: { [key: string]: { name: string; image: string; country: string; audioIdentifier: string } } = {
  'ahmed-alajmi': {
    name: 'الشيخ أحمد بن علي العجمي',
    image: '/ahmed-alajmi.webp',
    country: 'السعودية',
    audioIdentifier: 'ar.ahmedalajmi'
  },
  'mishary-alafasy': {
    name: 'الشيخ مشاري راشد العفاسي',
    image: '/mishary-alafasy.webp',
    country: 'الكويت',
    audioIdentifier: 'ar.alafasy'
  },
  'abdulbasit': {
    name: 'الشيخ عبد الباسط عبد الصمد',
    image: '/abdulbasit.webp',
    country: 'مصر',
    audioIdentifier: 'ar.abdulbasitmurattal'
  },
  'saad-alghamdi': {
    name: 'الشيخ سعد الغامدي',
    image: '/saad-alghamdi.webp',
    country: 'السعودية',
    audioIdentifier: 'ar.saadalghamdi'
  },
  'maher-almuaiqly': {
    name: 'الشيخ ماهر المعيقلي',
    image: '/maher-almuaiqly.webp',
    country: 'السعودية',
    audioIdentifier: 'ar.maheralmuaiqly'
  },
  'yasser-dossary': {
    name: 'الشيخ ياسر الدوسري',
    image: '/yasser-dossary.webp',
    country: 'السعودية',
    audioIdentifier: 'ar.yasserdossary'
  },
  'abdullah-basfar': {
    name: 'الشيخ عبدالله بصفر',
    image: '/abdullah-basfar.webp',
    country: 'السعودية',
    audioIdentifier: 'ar.abdullahbasfar'
  },
  'mohamed-minshawi': {
    name: 'الشيخ محمد صديق المنشاوي',
    image: '/mohamed-minshawi.webp',
    country: 'مصر',
    audioIdentifier: 'ar.muhammadayyoubmurattal'
  },
  'khalid-jalil': {
    name: 'الشيخ خالد الجليل',
    image: '/khalid-jalil.webp',
    country: 'السعودية',
    audioIdentifier: 'ar.khalidabdulkafy'
  }
}





export default function ReciterPage() {
  const params = useParams()
  const router = useRouter()
  const identifier = params.identifier as string


  const [surahs, setSurahs] = useState<Surah[]>([])
  const [activeSurah, setActiveSurah] = useState<Surah | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")


  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [loop, setLoop] = useState(false)


  const audioRef = useRef<HTMLAudioElement | null>(null)
  const reciter = recitersData[identifier]


  useEffect(() => {
    if (!reciter) return


    const fetchSurahs = async () => {
      try {
        setLoading(true)
        const res = await fetch("https://api.alquran.cloud/v1/surah", { cache: "no-store" })
        if (!res.ok) throw new Error("API error")


        const json = await res.json()
        const apiSurahs: ApiSurah[] = json.data


        const mapped: Surah[] = apiSurahs.map((s) => ({
          id: s.number,
          name: s.name,
          ayahs: s.numberOfAyahs,
          reader: `بصوت ${reciter.name}`,
          audio: `https://cdn.islamic.network/quran/audio-surah/128/${reciter.audioIdentifier}/${s.number}.mp3`,
        }))


        setSurahs(mapped)


        const fatiha = mapped.find((s) => s.id === 1) ?? mapped[0]
        if (fatiha) {
          setActiveSurah({ ...fatiha, name: fatiha.name })
          const audio = new Audio(fatiha.audio)
          audio.volume = volume
          audioRef.current = audio
        }
      } catch (e: any) {
        setError(e.message || "خطأ في الاتصال")
      } finally {
        setLoading(false)
      }
    }


    fetchSurahs()
  }, [identifier, reciter])


  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(searchTerm), 300)
    return () => clearTimeout(id)
  }, [searchTerm])


  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return


    const handleLoaded = () => setDuration(audio.duration)
    const handleTime = () => setCurrentTime(audio.currentTime)
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
  }, [activeSurah, loop])


  const filteredSurahs = surahs.filter((s) => s.name.toLowerCase().includes(debouncedSearch.toLowerCase()))


  const ensureAudio = (surah: Surah) => {
    let audio = audioRef.current
    if (!audio) {
      audio = new Audio(surah.audio)
      audioRef.current = audio
    } else if (audio.src !== surah.audio) {
      audio.pause()
      audio.currentTime = 0
      audio.src = surah.audio
    }
    audio.volume = muted ? 0 : volume
    return audio
  }


  const loadAndPlay = async (surah: Surah) => {
    const audio = ensureAudio(surah)
    try {
      await audio.play()
      setIsPlaying(true)
      setActiveSurah({ ...surah, reader: `بصوت ${reciter.name}` })
    } catch {
      setIsPlaying(false)
    }
  }


  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) {
      if (activeSurah) await loadAndPlay(activeSurah)
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
  }


  const handleNext = () => {
    if (!activeSurah || surahs.length === 0) return
    const idx = surahs.findIndex((s) => s.id === activeSurah.id)
    const next = surahs[(idx + 1) % surahs.length]
    loadAndPlay(next)
  }


  const handlePrev = () => {
    if (!activeSurah || surahs.length === 0) return
    const idx = surahs.findIndex((s) => s.id === activeSurah.id)
    const prev = surahs[(idx - 1 + surahs.length) % surahs.length]
    loadAndPlay(prev)
  }


  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    const newMuted = !muted
    setMuted(newMuted)
    audio.volume = newMuted ? 0 : volume
  }


  const toggleLoop = () => {
    setLoop((prev) => !prev)
  }


  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio || duration === 0) return
    const value = Number(e.target.value)
    audio.currentTime = (value / 100) * duration
    setCurrentTime(audio.currentTime)
  }


  const progressPercent = duration ? (currentTime / duration) * 100 : 0


  if (!reciter) {
    return (
      <div className="min-h-screen bg-[#00133F] flex items-center justify-center">
        <p className="text-white text-xl">القارئ غير موجود</p>
      </div>
    )
  }


  return (
    <div className="min-h-screen  py-10 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        <button
          onClick={() => router.back()}
          className="mb-6 px-6 py-3 bg-[#E7D7A0] text-[#00133F] rounded-[12px] cursor-pointer font-bold hover:bg-[#d4b870] transition-colors flex items-center gap-2"
        >
          <span>←</span> العودة للخلف
        </button>


        <div className="flex flex-col items-center md:items-start md:flex-row gap-4">
          
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


            <div className="mt-6 h-[440px] overflow-y-auto pr-1">
              {loading && <p className="text-center text-[13px] text-[#FAFAFAB2]">جاري تحميل السور...</p>}
              {error && !loading && <p className="text-center text-[13px] text-red-400">{error}</p>}


              {!loading && !error && activeSurah && filteredSurahs.map((surah) => {
                const isActive = activeSurah.id === surah.id
                return (
                  <div
                    key={surah.id}
                    onClick={() => loadAndPlay(surah)}
                    className={`flex items-center justify-between p-3 mb-2 rounded-[12px] cursor-pointer transition-all ${
                      isActive
                        ? "border-[0.5px] border-[#E7D7A0] bg-[linear-gradient(90deg,rgba(231,215,160,0.25)_0%,rgba(16,24,53,0.25)_86.06%)]"
                        : "bg-transparent hover:bg-[#FFFFFF0D] border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-lg text-[14px] font-bold ${
                          isActive ? "bg-[#2D3B58] text-[#E7D7A0]" : "bg-[#101B38] text-[#FFFFFF66]"
                        }`}
                      >
                        {surah.id}
                      </div>
                      <div>
                        <h3 className="text-[16px] text-[#FFFEEE] font-bold">{surah.name}</h3>
                        <p className="text-[12px] text-[#B7B7B7] font-bold">{surah.ayahs} آية</p>
                      </div>
                    </div>
                    <div className="ml-2">
                      <Image src={isActive && isPlaying ? "/pause.webp" : "/play.webp"} alt="status" width={24} height={24} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>


          <div className="p-8 w-full md:w-[843px] h-[389px] bg-[#092147] rounded-[20px] flex flex-col justify-between relative overflow-hidden">
            <div className="flex gap-6 items-start">
              <div className="relative w-[180px] h-[180px] rounded-[20px] overflow-hidden border-2 border-[#E7D7A0]">
                <Image src={reciter.image} alt={reciter.name} fill className="object-cover" />
              </div>
              <div className="text-right mt-5">
                <p className="text-[#FBF9EF] text-[12px] font-normal mb-2">يتم الآن الاستماع إلى</p>
                <h1 className="text-[#FFFEEE] text-[32px] font-bold mb-1">
                  {activeSurah ? activeSurah.name : "جاري التحميل"}
                </h1>
                <p className="text-[#E7D7A0] text-[18px] font-normal">{activeSurah?.reader}</p>
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
                  className="quran-range cursor-pointer"
                  style={{ ["--progress" as any]: `${progressPercent}%` }}
                />
              </div>


              <div className="flex items-center justify-center gap-8 mt-6">
                <button onClick={toggleMute} className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                  <Image src={muted || volume === 0 ? "/mute.webp" : "/volume-high.webp"} alt="volume" width={24} height={24} />
                </button>


                <button onClick={handleNext} className="hover:scale-110 cursor-pointer transition-transform">
                  <Image src="/next.webp" alt="next" width={32} height={32} />
                </button>


                <button onClick={togglePlay} className="w-[64px] h-[64px] cursor-pointer flex items-center justify-center border-2 border-[#E7D7A0] rounded-full hover:bg-[#E7D7A01A] transition-colors">
                  <Image src={isPlaying ? "/pause.webp" : "/play.webp"} alt="status" width={24} height={24} />
                </button>


                <button onClick={handlePrev} className="hover:scale-110 cursor-pointer transition-transform">
                  <Image src="/previous.webp" alt="prev" width={32} height={32} />
                </button>


                <button onClick={toggleLoop} className={`transition-opacity ${loop ? "opacity-100" : "opacity-60 hover:opacity-100"}  cursor-pointer`}>
                  <Image src="/repeat.webp" alt="repeat" width={24} height={24} />
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
