'use client'

import Image from "next/image"
import { useState, useEffect, useMemo, useCallback } from "react"

type Surah = {
  number: number
  name: string
  englishName: string
  numberOfAyahs: number
  revelationType: string
}

type Ayah = {
  number: number
  text: string
  numberInSurah: number
}

type SurahData = {
  number: number
  name: string
  ayahs: Ayah[]
}

function MushafViewer() {
  const [surahList, setSurahList] = useState<Surah[]>([])
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null)
  const [surahData, setSurahData] = useState<SurahData | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // Debounce للبحث
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    const fetchSurahList = async () => {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah')
        const data = await response.json()
        if (data.code === 200) {
          setSurahList(data.data)
          if (data.data.length > 0) setSelectedSurah(data.data[0])
        }
      } catch (error) {
        console.error('Error fetching surah list:', error)
      }
    }
    fetchSurahList()
  }, [])

  useEffect(() => {
    if (!selectedSurah) return
    const fetchSurahData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah.number}/ar.alafasy`)
        const data = await response.json()
        if (data.code === 200) setSurahData(data.data)
      } catch (error) {
        console.error('Error fetching surah data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSurahData()
  }, [selectedSurah])

  const handleSurahSelect = useCallback((surah: Surah) => {
    setSelectedSurah(surah)
    setCurrentPage(1)
    setShowDropdown(false)
    setSearchTerm("")
  }, [])

  const filteredSurahList = useMemo(() => {
    if (!debouncedSearch.trim()) return surahList
    return surahList.filter(surah => 
      surah.name.includes(debouncedSearch) || 
      surah.englishName.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
  }, [surahList, debouncedSearch])

  const totalPages = selectedSurah ? Math.ceil(selectedSurah.numberOfAyahs / 10) : 1
  const startAyah = (currentPage - 1) * 10
  const endAyah = startAyah + 10
  const currentAyahs = useMemo(() => 
    surahData?.ayahs.slice(startAyah, endAyah) || [], 
    [surahData, startAyah, endAyah]
  )

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
  }, [currentPage, totalPages])

  const prevPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1)
  }, [currentPage])

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  // Generate page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages)
      }
    }
    return pages
  }

  if (surahList.length === 0) {
    return (
      <div className="mt-[80px] md:mt-[100px] flex items-center justify-center min-h-[500px] md:min-h-[600px] px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-[#E7D7A0] mb-4"></div>
          <p className="text-[#FFFEEE] text-[16px] md:text-[18px]">جاري تحميل المصحف الشريف...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-[80px] md:mt-[100px] px-3 md:px-4 mb-12 max-w-[1200px] mx-auto" dir="rtl">
      <div className="flex flex-col items-center gap-4 md:gap-6">
        
        {/* التحكم العلوي */}
        <div className="w-full bg-[#092147] rounded-[16px] md:rounded-[24px] border border-[#B7B7B733] p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              <h1 className="text-[24px] md:text-[32px] text-[#FFFEEE] font-bold">الْمُصْحَفُ الشَّرِيفُ </h1>
              {selectedSurah && (
                <>
                  <p className="text-[16px] md:text-[18px] text-[#E7D7A0] mt-1">{selectedSurah.name}</p>
                  <p className="text-[12px] md:text-[14px] text-[#FAFAFAB2] mt-1">
                    {selectedSurah.numberOfAyahs} آية - {selectedSurah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
                  </p>
                </>
              )}
            </div>

            {/* قائمة السور */}
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center justify-center gap-3 px-4 md:px-5 py-2.5 md:py-3 bg-[#0A102A] text-[#FFFEEE] rounded-[12px] border border-[#E7D7A0] hover:bg-[#101B38] transition-colors w-full sm:w-auto"
              >
                <Image src="/book-open-01.webp" alt="سورة" width={18} height={18} className="md:w-5 md:h-5" />
                <span className="text-[14px] md:text-[15px] font-medium">اختر سورة</span>
                <Image 
                  src="/arrowtop.webp" 
                  alt="arrow" 
                  width={14} 
                  height={14}
                  className={`md:w-4 md:h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                />
              </button>

              {showDropdown && (
                <>
                  <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="fixed md:absolute left-0 right-0 md:right-auto top-1/2 md:top-full -translate-y-1/2 md:translate-y-0 md:mt-2 mx-3 md:mx-0 md:w-[340px] max-h-[70vh] md:max-h-[500px] bg-[#0A102A] border border-[#E7D7A0] rounded-[16px] shadow-2xl z-50 overflow-hidden">
                    <div className="sticky top-0 bg-[#0A102A] p-3 border-b border-[#FFFFFF0D] z-10">
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <Image src="/search-02.webp" alt="search" width={16} height={16} />
                        </div>
                        <input
                          type="text"
                          placeholder="ابحث عن سورة..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-[#101B38] text-[#FAFAFAB2] text-[13px] rounded-[10px] border border-[#B7B7B7B2] py-2 pr-10 pl-3 focus:outline-none focus:border-[#E7D7A0] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="overflow-y-auto max-h-[calc(70vh-60px)] md:max-h-[440px] ">
                      {filteredSurahList.length > 0 ? (
                        filteredSurahList.map((surah) => (
                          <button
                            key={surah.number}
                            onClick={() => handleSurahSelect(surah)}
                            className={`w-full flex items-center justify-between px-4 md:px-5 py-3 text-right hover:bg-[#101B38] transition-colors border-b border-[#FFFFFF0D] last:border-0 ${
                              selectedSurah?.number === surah.number ? 'bg-[#E7D7A01A]' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-[#E7D7A01A] rounded-lg flex-shrink-0">
                                <span className="text-[11px] md:text-[12px] font-bold text-[#E7D7A0]">{surah.number}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-[14px] md:text-[15px] text-[#FFFEEE] block">{surah.name}</span>
                                <span className="text-[10px] md:text-[11px] text-[#FAFAFAB2]">{surah.englishName}</span>
                              </div>
                            </div>
                            <span className="text-[11px] md:text-[12px] text-[#E7D7A0] flex-shrink-0">{surah.numberOfAyahs} آية</span>
                          </button>
                        ))
                      ) : (
                        <div className="p-6 text-center">
                          <p className="text-[#FAFAFAB2] text-[14px]">لا توجد نتائج</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* صفحة المصحف - ألوان مريحة للعين */}
        <div className="relative w-full">
          <div className="relative w-full min-h-[500px] md:min-h-[700px] rounded-xl md:rounded-2xl overflow-hidden border-2 md:border-4 border-[#C4A962] shadow-2xl bg-gradient-to-br from-[#F5F1E8] to-[#EDE7D9]">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#F5F1E8] bg-opacity-95 z-10">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-[#C4A962] mb-4"></div>
                  <p className="text-[#2C2416] text-[13px] md:text-[14px]">جاري تحميل السورة...</p>
                </div>
              </div>
            )}

            <div className="absolute top-0 left-0 right-0 h-12 md:h-16 bg-gradient-to-b from-[#C4A962] to-transparent opacity-15"></div>
            <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 bg-gradient-to-t from-[#C4A962] to-transparent opacity-15"></div>

            {selectedSurah && (
              <div className="relative pt-6 md:pt-8 pb-4 md:pb-6 text-center border-b-2 border-[#C4A96233]">
                <div className="inline-block px-6 md:px-8 py-2 md:py-3 bg-[#C4A96215] rounded-full border border-[#C4A962]">
                  <h2 className="text-[22px] md:text-[28px] font-bold text-[#2C2416]" style={{ fontFamily: 'Amiri, serif' }}>
                    ﴿  {selectedSurah.name} ﴾
                  </h2>
                </div>
                <p className="text-[12px] md:text-[14px] text-[#5A4A2F] mt-2 md:mt-3">
                  {selectedSurah.revelationType === 'Meccan' ? '﴿ مَكِّيَّة ﴾' : '﴿ مَدَنِيَّة ﴾'}
                </p>
              </div>
            )}

            <div className="p-4 md:p-8 pb-16 md:pb-20">
              {selectedSurah && currentAyahs.length > 0 && (
                <div className="space-y-1">
                  {currentPage === 1 && selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
                    <p className="text-[24px] md:text-[32px] text-[#2C2416] mb-6 md:mb-8 text-center leading-loose" style={{ fontFamily: 'Amiri, serif' }}>
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </p>
                  )}

                  <p className="text-[20px] md:text-[26px] text-[#3A3020] leading-[2.5] md:leading-[2.8] text-justify" style={{ fontFamily: 'Amiri, serif' }}>
                    {currentAyahs.map((ayah) => (
                      <span key={ayah.number}>
                        {ayah.text}{' '}
                        <span className="inline-flex items-center justify-center min-w-[28px] md:min-w-[32px] h-7 md:h-8 rounded-full bg-[#C4A96220] border border-[#C4A962] text-[12px] md:text-[14px] text-[#2C2416] font-bold px-1.5 md:px-2 mx-0.5 md:mx-1">
                          ۝ {ayah.numberInSurah}
                        </span>
                        {' '}
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </div>

            {/* رقم الصفحة */}
            {selectedSurah && (
              <div className="absolute bottom-4 md:bottom-6 left-0 right-0 text-center">
                <div className="inline-block px-4 md:px-6 py-1.5 md:py-2 bg-[#C4A96220] rounded-full border border-[#C4A962]">
                  <span className="text-[14px] md:text-[16px] font-bold text-[#2C2416]">{currentPage}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {selectedSurah && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="flex items-center cursor-pointer gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-[#092147] text-[#FFFEEE] rounded-[10px] border border-[#E7D7A0] hover:bg-[#0a2855] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <Image src="/next.webp" alt="السابق" width={18} height={18} className="md:w-5 md:h-5" />
              <span className="text-[13px] md:text-[14px] font-medium hidden sm:inline">السابق</span>
            </button>

            <div className="flex items-center gap-1 md:gap-2">
              {getPageNumbers().map((page, index) => (
                typeof page === 'number' ? (
                  <button
                    key={index}
                    onClick={() => goToPage(page)}
                    className={`min-w-[32px] md:min-w-[36px] h-[32px] md:h-[36px] flex items-center justify-center rounded-[8px] text-[13px] md:text-[14px] font-medium transition-all ${
                      currentPage === page
                        ? 'bg-[#E7D7A0] text-[#092147] border-2 border-[#E7D7A0]'
                        : 'bg-[#092147] text-[#FFFEEE] border border-[#E7D7A066] hover:border-[#E7D7A0]'
                    }`}
                  >
                    {page}
                  </button>
                ) : (
                  <span key={index} className="px-1 md:px-2 text-[#FAFAFAB2] text-[14px]">...</span>
                )
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-[#092147] text-[#FFFEEE] rounded-[10px] border border-[#E7D7A0] hover:bg-[#0a2855] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <span className="text-[13px] cursor-pointer md:text-[14px] font-medium hidden sm:inline">التالي</span>
              <Image src="/previous.webp" alt="التالي" width={18} height={18} className="md:w-5 md:h-5" />
            </button>
          </div>
        )}

        {/* معلومات */}
        <div className="w-full bg-[#0F172F] rounded-[16px] md:rounded-[20px] border border-[#B7B7B733] p-4 md:p-6 text-center">
          <p className="text-[13px] md:text-[14px] text-[#FAFAFAB2] leading-relaxed">
             المصحف الشريف برواية حفص عن عاصم - {surahList.length} سورة
          </p>
          <p className="text-[11px] md:text-[12px] text-[#E7D7A0] mt-2">
            يمكنك التنقل بين الصفحات أو اختيار سورة محددة من القائمة
          </p>
        </div>
      </div>

      
    </div>
  )
}

export default MushafViewer
