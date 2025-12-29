import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://zekr-beta.vercel.app'), // استبدله برابط موقعك النهائي لاحقاً
  title: {
    default: "ذِكْر | منصة القرآن والأذكار والأدعية",
    template: "%s | ذِكْر"
  },
  description:
    "منصة ذِكْر تساعدك على الاستماع للقرآن الكريم، تعلّم الحديث الشريف، قراءة الأذكار اليومية، والتقرب إلى الله في أي وقت وبكل سهولة.",
  keywords: [
    "ذكر", "القرآن الكريم", "أذكار الصباح والمساء", "أدعية نبوية", "الحديث الشريف", 
    "تلاوة القرآن", "مشاري العفاسي", "إسلاميات", "موقع ديني", "حصن المسلم"
  ],
  authors: [{ name: "منصة ذِكْر", url: "https://zekr-beta.vercel.app" }],
  creator: "منصة ذِكْر",
  publisher: "منصة ذِكْر",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ذِكْر | يُحيي القلوب ويقوّي الإيمان",
    description: "استمع إلى القرآن، تعلّم الحديث، واذكر الله أينما كنت عبر منصة ذِكْر المتكاملة.",
    url: "https://zekr-beta.vercel.app",
    siteName: "منصة ذِكْر",
    images: [
      {
        url: "/Heroshape.webp",
        width: 1200,
        height: 630,
        alt: "شعار منصة ذِكْر - القرآن والأذكار",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ذِكْر | منصة القرآن والأذكار",
    description: "منصة إسلامية للاستماع للقرآن الكريم وقراءة الأذكار والأدعية اليومية بشكل مبسط.",
    images: ["/Heroshape.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png', 
    apple: '/apple-icon.png',
  },
};


import Image from "next/image";
import DailyContent from "./components/DailyContent";
import ScholarsSlider from "./components/ScholarsSlider";
import AzkarsSlider from "./components/AzkarsSlider";
import PrayersSlider from "./components/PrayersSlider";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6 my-10">
      <div className="flex flex-row items-center justify-center 2xl:justify-between flex-wrap gap-6">
        <div className="">
        <h1 className="text-[32px] md:text-[32px] xl:text-[48px] font-bold mb-8 leading-[50.8px] md:leading-[76.8px]" style={{ fontFamily: 'Almarai' }} ><span className="text-[#E7D7A0]">ذِكْرٌ </span>يُحْيِي الْقُلُوبَ وَيُقَوِّي الإِيمَانَ، <br/> وَيُضِيءُ الدَّرْبَ بِنُورِ الْقُرْآنِ</h1>
        <p className="text-[25px] lg:text-[30px] font-normal mb-4 leading-[44.8px]" style={{ fontFamily: 'Almarai' }}>
         استمع إلى القرآن، تعلّم الحديث، واذكر الله أينما كنت
        </p>
        </div>
        <div className="mb-6">
          <Image 
            src="/Heroshape.webp" 
            alt="منصة ذكر" 
            width={515} 
            height={448} 
            className=""
          />
        </div>
      </div>
      <div className="arkan-aleslam mt-20 bg-[#092147] p-10 rounded-[40px] flex flex-col gap-10 items-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4 text-[#E1C987]" >أركان الإسلام الخمسة</h1>
          <h2 className="mb-5 text-xl md:text-[32px] font-normal text-[#FFFEEE]" >&quot;جوهر الإسلام وروحه في خمسة أركان&quot;</h2>
          <h3 className="text-xl md:text-[24px] font-normal text-[#FFFEEE]" >هي الأساس الذي يبني عليه المسلم إيمانه، فهي تجمع بين العقيدة، العبادة، والأخلاق، لترشد الإنسان إلى طريق الهداية والتقوى.</h3>
        </div>
        <div className="flex items-center flex-wrap justify-center gap-6 text-white">
            <div className="flex flex-col gap-[24px] items-center m-2 h-[327px] w-[200px]">
            <Image 
            src="/tawhed.webp" 
            alt="أركان الإسلام الخمسة" 
            width={150} 
            height={150} 
            className="border-2 border-[#CA944A] rounded-full p-3 bg-[#2a3b50]"
          />
          <div className="details text-center">
            <h2 className="text-[24px] leading-[32px] font-bold" >الشهادتان</h2>
            <p className="mt-3 text-[16px] leading-[24px] font-normal" >الاقرار بوحدانية الله ورسالة النبي محمد &#xFDFA;</p>
          </div>
          </div>
          <div className="flex flex-col gap-[24px] items-center m-2 h-[327px] w-[200px]">
            <Image 
            src="/prayer-mat.webp" 
            alt="أركان الإسلام الخمسة" 
            width={150} 
            height={150} 
            className="border-2 border-[#CA944A]  rounded-full p-3 bg-[#2a3b50]"
          />
          <div className="details text-center ">
            <h2 className="text-[24px] leading-[32px] font-bold">الصلاة</h2>
            <p className="mt-3 text-[16px] leading-[24px] font-normal" >الركن الذي يربط العبد بربه</p>
          </div>
          </div>
            <div className="flex flex-col gap-[24px] items-center m-2 h-[327px] w-[200px]">
            <Image 
            src="/zakat-icon-vector.webp" 
            alt="أركان الإسلام الخمسة" 
            width={150} 
            height={150} 
            className="border-2 border-[#CA944A] rounded-full p-3 bg-[#2a3b50]"
          />
          <div className="details text-center">
            <h2 className="text-[24px] leading-[32px] font-bold  ">الزكاة</h2>
            <p className="mt-3 text-[16px] leading-[24px] font-normal" >تطهير النفس والمال</p>
          </div>
          </div>
            <div className="flex flex-col gap-[24px] items-center m-2 h-[327px] w-[200px]">
            <Image 
            src="/lantern-icon-vector.webp" 
            alt="أركان الإسلام الخمسة" 
            width={150} 
            height={150} 
            className="border-2 border-[#CA944A] rounded-full p-3 bg-[#2a3b50]"
          />
          <div className="details text-center">
            <h2 className="text-[24px] leading-[32px] font-bold ">الصيام</h2>
            <p className="mt-3 text-[16px] leading-[24px] font-normal" >تهذيب الروح وتقوية الارادة</p>
          </div>
          </div>
            <div className="flex flex-col gap-[24px] items-center m-2 h-[327px] w-[200px]">
            <Image 
            src="/h-icon.webp" 
            alt="أركان الإسلام الخمسة" 
            width={150} 
            height={150} 
            className="border-2 border-[#CA944A] rounded-full p-3 bg-[#2a3b50]"
          />
          <div className="details text-center ">
            <h2 className="text-[24px] leading-[32px] font-bold ">الحج</h2>
            <p className="mt-3 text-[16px] leading-[24px] font-normal" >رحلة الايمان لمن استطاع اليه سبيلا</p>
          </div>
          </div>
        </div>
      </div>
        <div className="flex flex-row items-center justify-center 2xl:justify-between gap-6 flex-wrap my-[100px]">
          <div className="">
          <Image 
            src="/moss.webp" 
            alt="المصحف الشريف" 
            priority
            width={400} 
            height={400} 
            fetchPriority="high"
            className=""
          />
        </div>
        <div className="">
        <h1 className="text-3xl md:text-[40px] font-bold mb-6 text-[#E7D7A0]" >ٱسْمَعْ وَتَدَبَّرْ كَلَامَ ٱللَّهِ</h1>
        <p className="text-2xl md:text-[32px] mb-4 font-normal" >
          اجعل تلاوة القرآن عادة يومية، فهو شفاء ورحمة للمؤمنين. 
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start mt-10 gap-4">
          <Link href="/quran" className="bg-[#E7D7A0] text-[20px] text-[#0A102A] px-7 md:px-10 py-2 rounded-[12px] font-bold cursor-pointer" style={{ fontFamily: 'Tajawal' }}>
           استمع لتلاوة هادئة
          </Link>
<Link 
  href="/Mushaf"
  className="bg-transparent text-[20px] text-[#E7D7A0] border border-[#E7D7A0] px-7 md:px-10 py-2 rounded-[12px] font-bold cursor-pointer hover:bg-[#E7D7A01A] transition-all inline-block text-center"
  style={{ fontFamily: 'Tajawal' }}
>
     اقْرَأِ الْمُصْحَفَ الشَّرِيفَ
</Link>
        </div>
        </div>

      </div>
      <DailyContent/>
      <ScholarsSlider/>
      <AzkarsSlider/>
      <PrayersSlider/>
    </main>
  );
}
