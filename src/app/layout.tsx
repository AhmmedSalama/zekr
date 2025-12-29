import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// إعداد الـ Viewport لتحسين الأداء وتجربة المستخدم على الموبايل
export const viewport: Viewport = {
  themeColor: "#0A102A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // للسماح للمستخدمين بتكبير الخط (Accessibility)
};

export const metadata: Metadata = {
  metadataBase: new URL('https://zekr-beta.vercel.app'), // الرابط الحالي التجريبي
  title: {
    default: "ذِكر | منصة المحتوى الإسلامي - قرآن، أذكار، دروس ومحاضرات",
    template: "%s | ذِكر"
  },
  description: "منصة إسلامية شاملة تقدم القرآن الكريم بصوت أفضل القراء، الأذكار والأدعية اليومية، دروس ومحاضرات من علماء موثوقين. تطبيق مجاني لتعلم وتدبر الدين الإسلامي",
  keywords: [
    'قرآن كريم', 'تلاوات قرآنية', 'أذكار إسلامية', 'أذكار الصباح والمساء', 
    'دروس إسلامية', 'محاضرات دينية', 'أدعية قرآنية', 'تفسير القرآن', 
    'السيرة النبوية', 'الرقية الشرعية', 'حصن المسلم', 'منصة إسلامية', 
    'تطبيق إسلامي', 'ذكر', 'zekr'
  ],
  manifest: '/manifest.json',
  authors: [{ name: 'ذِكر - منصة المحتوى الإسلامي' }],
  creator: 'ذِكر - منصة المحتوى الإسلامي',
  publisher: 'ذِكر - منصة المحتوى الإسلامي',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ذِكر | منصة المحتوى الإسلامي',
    description: 'منصة إسلامية شاملة - القرآن الكريم، الأذكار والأدعية، دروس ومحاضرات من علماء موثوقين',
    url: 'https://zekr-beta.vercel.app',
    siteName: 'ذِكر',
    images: [
      {
        url: '/Heroshape.webp',
        width: 1200,
        height: 630,
        alt: 'منصة ذِكر الإسلامية',
      },
    ],
    locale: 'ar_EG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ذِكر | منصة المحتوى الإسلامي',
    description: 'منصة إسلامية شاملة - القرآن الكريم، الأذكار والأدعية، دروس ومحاضرات',
    images: ['/Heroshape.webp'],
  },
  category: 'Islamic Content',
  applicationName: 'ذِكر',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link 
          rel="preload" 
          href="/Background2.webp" 
          as="image" 
          fetchPriority="high" 
        />
        
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ذِكر - منصة المحتوى الإسلامي',
              description: 'منصة إسلامية شاملة تقدم القرآن الكريم، الأذكار، والدروس الدينية',
              url: 'https://zekr-beta.vercel.app',
              inLanguage: 'ar',
              publisher: {
                '@type': 'Organization',
                name: 'ذِكر',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://zekr-beta.vercel.app/Heroshape.webp'
                }
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://zekr-beta.vercel.app/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className="antialiased scroll-smooth">
        <NavBar />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}