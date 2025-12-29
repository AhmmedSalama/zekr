import QuranHeartTracker from "../components/QuranHeartTracker"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "متابعة ختم القرآن الكريم - القلب القرآني | ذِكْر",
  description:
    "تتبع تقدمك في ختم القرآن الكريم بطريقة تفاعلية مميزة. حدد السور التي أتممت قراءتها، ووثق رحلتك مع كتاب الله، وحمّل صورة إنجازك (القلب القرآني) لمشاركتها مع الآخرين.",
  keywords: [
    "ختم القرآن", "متابعة القرآن الكريم", "تتبع قراءة القرآن", "القلب القرآني", 
    "جدول ختم القرآن", "تحدي ختم القرآن", "تحميل صورة الختمة", "114 سورة", 
    "متابعة الورد اليومي", "ذِكْر"
  ],
  alternates: {
    canonical: '/QuranHeart', 
  },
  openGraph: {
    title: "متابعة ختم القرآن الكريم | القلب القرآني التفاعلي – ذِكْر",
    description: "وثق رحلتك مع كتاب الله بطريقة بصرية مميزة. تتبع السور التي قرأتها وحمّل صورة إنجازك الآن.",
    url: '/QuranHeart',
    siteName: "ذِكْر",
    images: [
      {
        url: "/quran-heart-preview.jpg", 
        width: 1200,
        height: 630,
        alt: "واجهة القلب القرآني لمتابعة ختم القرآن الكريم",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "متابعة ختم القرآن الكريم - القلب القرآني | ذِكْر",
    description: "تتبع تقدمك في ختم القرآن الكريم بطريقة تفاعلية بصرية وحمّل صورة إنجازك.",
    images: ["/quran-heart-preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};
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
