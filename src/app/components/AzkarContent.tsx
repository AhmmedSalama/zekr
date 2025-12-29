'use client'
import Image from "next/image"
import { useEffect, useState } from "react"


type Zikr = {
  id: number
  title: string
  text: string
  repeat: string
  reference: string
}


type Category = {
  id: number
  name: string
  img: string
  description: string  
  azkar: Zikr[]
}


type AzkarData = {
  categories: Category[]
}


function AzkarContent() {
  const [azkarData, setAzkarData] = useState<AzkarData | null>(null)
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedZikr, setExpandedZikr] = useState<number | null>(null)


  useEffect(() => {
    const fetchAzkar = async () => {
      try {
        const res = await fetch('/data/azkar.json')
        const data: AzkarData = await res.json()
        setAzkarData(data)
        setActiveCategory(data.categories[0])
      } catch (error) {
        console.error('خطأ في تحميل الأذكار:', error)
      } finally {
        setLoading(false)
      }
    }


    fetchAzkar()
  }, [])


  if (loading) {
    return (
      <div className="mt-[80px] text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E7D7A0]"></div>
        <p className="text-[#FFFEEE] text-xl mt-4">جاري تحميل الأذكار والأدعية...</p>
      </div>
    )
  }


  if (!azkarData || !activeCategory) {
    return (
      <div className="mt-[80px] text-center py-20">
        <p className="text-red-400 text-xl">⚠️ خطأ في تحميل الأذكار والأدعية</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-6 py-2 bg-[#092147] text-[#FFFEEE] rounded-lg hover:bg-[#0a2855] transition"
        >
          إعادة المحاولة
        </button>
      </div>
    )
  }


  return (
    <div className="mt-[80px] px-4 lg:px-0 mb-12" dir="rtl">
      <div className="flex flex-col lg:flex-row gap-8">


        {/* القائمة الجانبية */}
        <aside className="w-full lg:w-[340px] lg:sticky lg:top-0 lg:h-fit bg-[#092147] rounded-[24px] border border-[#B7B7B733] py-6 px-5">
          <h2 className="text-[22px] text-[#FFFEEE] font-bold mb-6">
          أقسام الأذكار والأدعية
          </h2>


          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1 ">
            {azkarData.categories.map((category) => {
              const isActive = category.id === activeCategory.id
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category)
                    setExpandedZikr(null)
                  }}
                  className={`w-full flex items-center justify-between rounded-[16px] py-3 px-4 transition-all cursor-pointer
                    ${isActive
                      ? "border border-[#E7D7A0] bg-[linear-gradient(90deg,rgba(231,215,160,0.25)_0%,rgba(16,24,53,0.25)_86.06%)]"
                      : "bg-transparent hover:bg-[#FFFFFF0D] border border-transparent"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-xl">
                      <Image 
                        src={category.img} 
                        alt={category.name} 
                        width={20} 
                        height={20}
                      />
                    </div>
                    <span className="text-[15px] text-[#FFFEEE]">
                      {category.name}
                    </span>
                  </div>
                  <span className="text-[12px] text-[#E7D7A0] bg-[#FFFFFF1A] px-2 py-1 rounded-full">
                    {category.azkar.length}
                  </span>
                </button>
              )
            })}
          </div>
        </aside>


        {/* المحتوى الرئيسي */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* رأس القسم */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#092147] p-3 rounded-xl">
                <Image 
                  src={activeCategory.img} 
                  alt={activeCategory.name} 
                  width={24} 
                  height={24}
                />
              </div>
              <div className="text-right">
                <h1 className="text-[32px] text-[#FFFEEE] font-bold">
                  {activeCategory.name}
                </h1>
                <p className="text-[18px] text-[#E7D7A0] mt-1">
                  {activeCategory.description}
                </p>
              </div>
            </div>
          </div>


          {/* شبكة بطاقات الأذكار */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCategory.azkar.map((zikr) => {
              const isExpanded = expandedZikr === zikr.id
              const displayText = isExpanded 
                ? zikr.text 
                : zikr.text.length > 100 
                  ? `${zikr.text.substring(0, 100)}...` 
                  : zikr.text


              return (
                <div
                  key={zikr.id}
                  className="bg-[#0F172F] rounded-[20px] border border-[#B7B7B733] px-5 py-4 flex flex-col gap-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[24px] text-[#FFFEEE] font-bold">
                      {zikr.title}
                    </span>
                    <span className="text-[11px] text-center text-[#E7D7A0] bg-[#FFFFFF1A] border-[#E7D7A0] border px-3 py-1 rounded-full">
                      {zikr.repeat}
                    </span>
                  </div>


                  <p className="text-[16px] text-[#FFFEEE] font-normal leading-[22px]">
                    {displayText}
                  </p>


                  <p className="text-[11px] text-[#E7D7A0]">
                    المرجع: {zikr.reference}
                  </p>


                  <div className="flex items-center justify-end mt-auto">
                    <button 
                      onClick={() => setExpandedZikr(isExpanded ? null : zikr.id)}
                      className="flex items-center gap-2 text-[14px] font-medium cursor-pointer bg-[#FFFFFF1A] px-5 py-2.5 rounded-full hover:bg-[#ffffff0f] transition-colors"
                    >
                      {isExpanded ? 'إخفاء النص' : 'اقرأ النص كامل'}
                      <Image src="/book-open-01.webp" alt="book" width={16} height={16} />
                    </button>
                  </div>
                </div>
              )
            })}
          </section>
        </div>
      </div>

      
    </div>
  )
}


export default AzkarContent
