import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "ذِكر | منصة المحتوى الإسلامي - قرآن، أذكار، دروس ومحاضرات",
  description: "منصة إسلامية شاملة تقدم القرآن الكريم بصوت أفضل القراء، الأذكار والأدعية اليومية، دروس ومحاضرات من علماء موثوقين. تطبيق مجاني لتعلم وتدبر الدين الإسلامي",
  keywords: [
    'قرآن كريم',
    'تلاوات قرآنية',
    'أذكار إسلامية',
    'أذكار الصباح والمساء',
    'دروس إسلامية',
    'محاضرات دينية',
    'أدعية قرآنية',
    'تفسير القرآن',
    'السيرة النبوية',
    'الرقية الشرعية',
    'حصن المسلم',
    'منصة إسلامية',
    'تطبيق إسلامي',
    'ذكر',
    'zekr'
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
    canonical: 'https://zekr.com',
  },
  openGraph: {
    title: 'ذِكر | منصة المحتوى الإسلامي',
    description: 'منصة إسلامية شاملة - القرآن الكريم، الأذكار والأدعية، دروس ومحاضرات من علماء موثوقين',
    url: 'https://zekr.com',
    siteName: 'ذِكر - منصة المحتوى الإسلامي',
    locale: 'ar_EG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ذِكر | منصة المحتوى الإسلامي',
    description: 'منصة إسلامية شاملة - القرآن الكريم، الأذكار والأدعية، دروس ومحاضرات',
  },
  category: 'Islamic Content',
  applicationName: 'ذِكر',
  verification: {
    // google: 'your-google-verification-code', // ضيف لما تعمل Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Schema.org Structured Data للموقع كله */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ذِكر - منصة المحتوى الإسلامي',
              description: 'منصة إسلامية شاملة تقدم القرآن الكريم، الأذكار، والدروس الدينية',
              url: 'https://zekr.com',
              inLanguage: 'ar',
              publisher: {
                '@type': 'Organization',
                name: 'ذِكر',
                url: 'https://zekr.com',
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://zekr.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body
        className=""
      >
        <NavBar />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
