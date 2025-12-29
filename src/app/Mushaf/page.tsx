import MushafViewer from "../components/MushafViewer";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'المصحف الشريف - قراءة القرآن الكريم أونلاين | موقعك',
  description: 'اقرأ القرآن الكريم الآن بخط واضح ومريح للعين. المصحف الشريف كاملاً برواية حفص عن عاصم مع إمكانية التنقل بين السور والآيات بسهولة.',
  keywords: 'المصحف الشريف, القرآن الكريم, قراءة القرآن, المصحف الإلكتروني, قرآن اون لاين, حفص عن عاصم, تلاوة القرآن',
  
  openGraph: {
    title: 'المصحف الشريف - قراءة القرآن الكريم',
    description: 'اقرأ القرآن الكريم الآن بخط واضح ومريح للعين مع إمكانية التنقل بين السور والآيات',
    type: 'website',
    locale: 'ar_EG',
    siteName: 'موقعك',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'المصحف الشريف - قراءة القرآن الكريم',
    description: 'اقرأ القرآن الكريم الآن بخط واضح ومريح للعين',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: '/mushaf',
  },
}

function MushafPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A102A] text-white p-6">
      <div className="heading text-center mt-[100px]">
        <h1 className="text-2xl md:text-[48px] font-bold text-[#FFFEEE]">
          <span className="text-[#E7D7A0]">الْمُصْحَفُ الشَّرِيفُ</span> – قِرَاءَةٌ وَتَدَبُّرٌ
        </h1>
        <p className="text-[#FFFEEE] text-[16px] md:text-[24px] font-normal mt-3">
          اقْرَأْ آيَاتِ كِتَابِ اللَّهِ بِخَطٍّ وَاضِحٍ، وَتَدَبَّرْ مَعَانِيَهُ بِخُشُوعٍ وَإِيمَانٍ
        </p>
      </div>
      <MushafViewer />
    </div>
  );
}

export default MushafPage;
