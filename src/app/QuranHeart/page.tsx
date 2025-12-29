import QuranHeartTracker from "../components/QuranHeartTracker"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "متابعة ختم القرآن الكريم | ذِكْر",
  description:
    "تتبع تقدمك في ختم القرآن الكريم بطريقة تفاعلية مميزة. حدد السور التي أتممت قراءتها وحمّل صورة توضح إنجازك. قلب قرآني يوثق رحلتك مع كتاب الله.",
  keywords: [
    "ختم القرآن",
    "متابعة القرآن",
    "قراءة القرآن",
    "تتبع القرآن",
    "قلب قرآني",
    "114 سورة",
    "تلاوة القرآن",
    "ذكر"
  ],
  openGraph: {
    title: "متابعة ختم القرآن الكريم | ذِكْر",
    description: "تتبع تقدمك في ختم القرآن الكريم بطريقة تفاعلية. قلب قرآني يوثق رحلتك مع كتاب الله.",
    url: "https://zekr-beta.vercel.app/QuranHeart",
    siteName: "ذِكْر",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/quran-heart-preview.jpg",
        width: 1200,
        height: 630,
        alt: "قلب قرآني - متابعة ختم القرآن الكريم",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "متابعة ختم القرآن الكريم | ذِكْر",
    description: "تتبع تقدمك في ختم القرآن الكريم بطريقة تفاعلية مميزة",
    images: ["/quran-heart-preview.jpg"],
  },
  alternates: {
    canonical: "https://zekr-beta.vercel.app/QuranHeart",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function QuranHeart() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="heading text-center mt-[100px]">
        <h1 className="text-2xl md:text-[48px] font-bold text-[#FFFEEE] leading-tight">
          <span className="text-[#E7D7A0]">قَلْبٌ قُرْآنِيٌّ</span> – تَتَبَّعْ خَتْمَكَ
        </h1>
        <p className="text-[#FAFAFAB2] text-[14px] md:text-[20px] font-normal mt-4 max-w-3xl mx-auto leading-relaxed">
          حدد السور التي أتممت قراءتها واحفظ تقدمك في ختمة القرآن الكريم. 
          <br className="hidden md:block" />
          انقر على أي قسم لتحديده، وحمّل صورة قلبك القرآني كخلفية أو ذكرى
        </p>
      </div>
      <QuranHeartTracker />
      
      {/* Instructions Section */}
      <div className="mt-16 mb-8 max-w-3xl mx-auto">
        <div className="bg-[#092147] rounded-2xl p-6 md:p-8 border border-[#E7D7A0]/20">
          <h2 className="text-[#E7D7A0] text-xl md:text-2xl font-bold mb-4 text-center">
            كيفية الاستخدام
          </h2>
          <ul className="space-y-3 text-[#FFFEEE] text-sm md:text-base">
            <li className="flex items-start gap-3">
              <span className="text-[#E7D7A0] text-xl">•</span>
              <span>اضغط على أي جزء من القلب لتحديد السورة التي أتممت قراءتها</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#E7D7A0] text-xl">•</span>
              <span>الأجزاء المحددة ستتلون باللون الذهبي وتُحفظ تلقائياً</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#E7D7A0] text-xl">•</span>
              <span>حمّل صورة قلبك القرآني بمقاسات مختلفة (كمبيوتر، موبايل، أو مخصص)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#E7D7A0] text-xl">•</span>
              <span>تقدمك محفوظ في متصفحك ولن يُحذف عند إغلاق الصفحة</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
