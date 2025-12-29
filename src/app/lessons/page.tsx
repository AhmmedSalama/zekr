import type { Metadata } from 'next'
import LessonsPlayer from "../components/LessonsPlayer"

// Metadata 
export const metadata: Metadata = {
  title: 'دروس ومحاضرات إسلامية | نتعلم ونتدبر',
  description: 'مجموعة مميزة من الدروس والمحاضرات الإسلامية من علماء وشيوخ موثوقين - دروس في العقيدة، الفقه، التفسير، الحديث والسيرة النبوية لنتعلم ونتدبر ديننا',
  keywords: [
    'دروس إسلامية',
    'محاضرات إسلامية',
    'دروس دينية',
    'علماء الدين',
    'شيوخ ثقات',
    'دروس العقيدة',
    'دروس الفقه',
    'تفسير القرآن',
    'شرح الحديث',
    'السيرة النبوية',
    'محاضرات دينية',
    'دروس صوتية',
    'تعلم الدين',
    'الثقافة الإسلامية',
    'دروس وعظ',
    'نتعلم ونتدبر'
  ],
  authors: [{ name: 'ذِكر - منصة المحتوى الإسلامي' }],
  creator: 'ذِكر - منصة المحتوى الإسلامي',
  publisher: 'ذِكر - منصة المحتوى الإسلامي',
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
    canonical: 'https://zekr.com/lessons',
  },
  openGraph: {
    title: 'دروس ومحاضرات إسلامية | نتعلم ونتدبر',
    description: 'مجموعة مميزة من الدروس والمحاضرات الإسلامية من علماء وشيوخ موثوقين لنتعلم ونتدبر ديننا',
    url: 'https://zekr.com/lessons',
    siteName: 'ذِكر - منصة المحتوى الإسلامي',
    locale: 'ar_EG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'دروس ومحاضرات إسلامية | نتعلم ونتدبر',
    description: 'مجموعة مميزة من الدروس والمحاضرات الإسلامية من علماء وشيوخ موثوقين',
  },
  category: 'Islamic Education',
}

export default function Lessons() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 my-10">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'دروس ومحاضرات إسلامية',
            description: 'مجموعة مميزة من الدروس والمحاضرات الإسلامية من علماء وشيوخ موثوقين',
            url: 'https://zekr.com/lessons',
            inLanguage: 'ar',
            about: {
              '@type': 'Thing',
              name: 'التعليم الإسلامي',
            },
            publisher: {
              '@type': 'Organization',
              name: 'ذِكر - منصة المحتوى الإسلامي',
              url: 'https://zekr.com'
            },
            educationalUse: 'Religious Education',
            learningResourceType: 'Lecture',
          }),
        }}
      />

      <div className="heading text-center my-[100px]">
        <h1 className="text-2xl md:text-[48px] font-bold text-[#FFFEEE]">
          <span className="text-[#E7D7A0]">دُرُوسٌ وَمُحَاضَرَاتٌ</span> – نَتَعَلَّمُ وَنَتَدَبَّرُ
        </h1>
        <p className="text-[#FFFEEE] text-[16px] md:text-[24px] font-normal mt-3">
          مجموعة من الدروس والمحاضرات المميزة من علماء وشيوخ نثق بهم، تزيدنا قربًا من الله وفهمًا لديننا
        </p>
      </div>
      
      <LessonsPlayer />
    </div>
  )
}
