import StoriesContent from "../components/StoriesContent"

function Stories() {
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
    <span className="text-[#E7D7A0]">قِصَصٌ وَعِبَرٌ</span> – آيَاتٌ تُلَامِسُ الْقُلُوبَ وَتُحْيِي الْعُقُولَ
  </h1>
  <p className="text-[#FFFEEE] text-[16px] md:text-[24px] font-normal mt-3">
    حكايات من القرآن والسنة والواقع، تحمل في طياتها دروسًا تهذب النفس وتزيد الإيمان
  </p>
</div>
      <StoriesContent />
    </div>
  )
}
export default Stories