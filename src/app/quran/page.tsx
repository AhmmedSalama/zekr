import QuranPlayer from "../components/QuranPlayer"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "القرآن الكريم | تلاوة واستماع مباشر لأشهر القراء – ذِكْر",
  description:
    "استمع إلى تلاوة القرآن الكريم بصوت قرّاء مميزين، تلاوات خاشعة بجودة عالية مع إمكانية اختيار القارئ والسورة المفضلة لديك عبر منصة ذِكْر.",
  keywords: [
    "القرآن الكريم استماع", "تلاوة القرآن", "تحميل القرآن", "مشاري العفاسي", 
    "عبد الباسط عبد الصمد", "المنشاوي", "القرآن الكريم صوت", "إذاعة القرآن", 
    "تلاوات خاشعة", "سمعنا قرآن"
  ],
  alternates: {
    canonical: '/quran',
  },
  openGraph: {
    title: "القرآن الكريم | تلاوة واستماع خاشع – منصة ذِكْر",
    description: "تلاوات عطرة ومميزة لآيات القرآن الكريم بأصوات أشهر القراء، استمع الآن بجودة عالية.",
    url: "https://zekr-beta.vercel.app/quran",
    siteName: "ذِكْر",
    images: [
      {
        url: "/Heroshape.webp",
        width: 1200,
        height: 630,
        alt: "تلاوة واستماع القرآن الكريم - منصة ذِكْر",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "القرآن الكريم | تلاوة واستماع – ذِكْر",
    description: "استمع لتلاوة القرآن الكريم بأصوات مميزة وجودة عالية عبر منصة ذِكْر.",
    images: ["/Heroshape.webp"],
  },
};

export default function QuranPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 my-10">
      <div className="heading text-center my-[100px]">
        <h1 className="text-2xl md:text-[48px] font-bold text-[#FFFEEE]">
          <span className="text-[#E7D7A0]">الْقُرْآنُ الْكَرِيمُ</span> – تِلَاوَةٌ وَاسْتِمَاعٌ
        </h1>
        <p className="text-[#FFFEEE] text-[16px] md:text-[24px] font-normal mt-3">
          استمع لآيات كتاب الله بترتيل عذب، وتدبر معانيه بخشوع وإيمان
        </p>
      </div>
      <QuranPlayer />
    </div>
  )
}
