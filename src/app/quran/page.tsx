import QuranPlayer from "../components/QuranPlayer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "القرآن الكريم | تلاوة واستماع – ذِكْر",
  description:
    "استمع إلى تلاوة القرآن الكريم بصوت قرّاء مميزين...",
  openGraph: {
    title: "القرآن الكريم | تلاوة واستماع",
    description: "تلاوة عطرة لآيات القرآن الكريم...",
    url: "https://zekr.com/quran",
    siteName: "ذِكْر",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "القرآن الكريم | تلاوة واستماع",
    description: "استمع لتلاوة القرآن الكريم...",
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
