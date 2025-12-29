import type { Metadata } from 'next'
import AzkarContent from "../components/AzkarContent"

// Metadata 
import { Metadata } from 'next'

export const metadata: Metadata = {

  metadataBase: new URL('https://zekr-beta.vercel.app'), 
  title: 'أذكار وأدعية يومية | ذكر الله حصن المؤمن',
  description: 'مجموعة شاملة من الأذكار والأدعية المأثورة من القرآن والسنة - أذكار الصباح والمساء، أذكار النوم، أذكار بعد الصلاة، الرقية الشرعية وأدعية قرآنية ونبوية لتطمئن بها القلوب.',
  keywords: [
    'أذكار', 'أذكار الصباح', 'أذكار المساء', 'أذكار النوم', 'أذكار بعد الصلاة',
    'أدعية قرآنية', 'أدعية نبوية', 'الرقية الشرعية', 'ذكر الله', 'أدعية يومية',
    'أذكار المسلم', 'حصن المسلم', 'أذكار وأدعية', 'أدعية مأثورة'
  ],
  authors: [{ name: 'موقع الأذكار' }],
  creator: 'موقع الأذكار',
  publisher: 'موقع الأذكار',
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
  alternates: {
    canonical: '/azkar',
  },
  openGraph: {
    title: 'أذكار وأدعية يومية | ذكر الله حصن المؤمن',
    description: 'مجموعة شاملة من الأذكار والأدعية المأثورة من القرآن والسنة لتطمئن بها القلوب ويزداد بها الإيمان.',
    url: '/azkar',
    siteName: 'موقع الأذكار',
    images: [
      {
        url: '/Heroshape.webp', 
        width: 1200,
        height: 630,
        alt: 'أذكار وأدعية يومية - ذكر الله',
      },
    ],
    locale: 'ar_EG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'أذكار وأدعية يومية | ذكر الله حصن المؤمن',
    description: 'مجموعة شاملة من الأذكار والأدعية المأثورة من القرآن والسنة.',
    images: ['/Heroshape.webp'], 
  },
  category: 'Islamic Content',
}
export default function Azkar() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 my-10">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'أذكار وأدعية يومية',
            description: 'مجموعة شاملة من الأذكار والأدعية المأثورة من القرآن والسنة',
            inLanguage: 'ar',
            about: {
              '@type': 'Thing',
              name: 'الأذكار الإسلامية',
            },
            publisher: {
              '@type': 'Organization',
              name: 'موقع الأذكار',
            },
          }),
        }}
      />

      <div className="heading text-center my-[100px]">
        <h1 className="text-2xl md:text-[48px] font-bold text-[#FFFEEE]">
          <span className="text-[#E7D7A0]">ذِكْرُ اللهِ حِصْنُ الْمُؤْمِنِ</span> – أَذْكَارٌ وَأَدْعِيَةٌ يَوْمِيَّةٌ
        </h1>
        <p className="text-[#FFFEEE] text-[16px] md:text-[24px] font-normal mt-3">
          مجموعة من الأذكار والأدعية المأثورة لتطمئن بها القلوب ويزداد بها الإيمان
        </p>
      </div>
      
      <AzkarContent />
    </div>
  )
}
