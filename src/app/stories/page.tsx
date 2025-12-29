import { Metadata } from 'next';
import StoriesContent from "../components/StoriesContent";

export const metadata: Metadata = {
  title: 'قصص وعبر إسلامية | آيات تلامس القلوب وتحيي العقول – ذِكْر',
  description: 'مجموعة مختارة من قصص القرآن الكريم، قصص الأنبياء، وحكايات من السنة والواقع تحمل دروساً وعبر تهذب النفس وتزيد الإيمان وتلامس الوجدان.',
  keywords: [
    'قصص إسلامية', 'قصص القرآن', 'قصص الأنبياء', 'عبر ومواعظ', 'قصص وعبر', 
    'حكايات دينية', 'قصص من السنة', 'قصص واقعية إسلامية', 'تفسير القصص'
  ],
  alternates: {
    canonical: '/stories',
  },
  openGraph: {
    title: 'قصص وعبر إسلامية | آيات تلامس القلوب – منصة ذِكْر',
    description: 'استمتع بقراءة أجمل القصص والحكايات الإسلامية التي تحمل دروساً وعبر للحياة.',
    url: '/stories',
    siteName: 'ذِكْر',
    images: [
      {
        url: '/Heroshape.webp',
        width: 1200,
        height: 630,
        alt: 'قصص وعبر إسلامية - منصة ذكر',
      }
    ],
    locale: 'ar_EG',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'قصص وعبر إسلامية | آيات تلامس القلوب – ذِكْر',
    description: 'حكايات من القرآن والسنة تحمل دروسًا تهذب النفس وتزيد الإيمان.',
    images: ['/Heroshape.webp'],
  },
};

function Stories() {
  // 2. بيانات Schema.org المنظمة لمساعدة جوجل في فهم محتوى الصفحة
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'قصص وعبر إسلامية - منصة ذِكْر',
    description: 'حكايات من القرآن والسنة والواقع، تحمل في طياتها دروسًا تهذب النفس وتزيد الإيمان',
    url: 'https://zekr-beta.vercel.app/stories',
    inLanguage: 'ar',
    publisher: {
      '@type': 'Organization',
      'name': 'ذِكْر',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://zekr-beta.vercel.app/Logo.webp'
      }
    },
    mainEntity: {
      '@type': 'ItemList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'قصص القرآن الكريم'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'قصص الأنبياء والمرسلين'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': 'عبر وحكم نبوية'
        }
      ]
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 my-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="heading text-center my-[100px]" aria-labelledby="stories-main-heading">
        <h1 id="stories-main-heading" className="text-2xl md:text-[48px] font-bold text-[#FFFEEE] leading-tight">
          <span className="text-[#E7D7A0]">قِصَصٌ وَعِبَرٌ</span> – آيَاتٌ تُلَامِسُ الْقُلُوبَ وَتُحْيِي الْعُقُولَ
        </h1>
        <p className="text-[#FFFEEE] text-[16px] md:text-[24px] font-normal mt-3 max-w-4xl mx-auto">
          حكايات من القرآن والسنة والواقع، تحمل في طياتها دروسًا تهذب النفس وتزيد الإيمان وتلامس الوجدان.
        </p>
      </section>

      {/* قسم المحتوى الرئيسي */}
      <section aria-label="قائمة القصص والعبر">
        <StoriesContent />
      </section>
    </main>
  );
}

export default Stories;