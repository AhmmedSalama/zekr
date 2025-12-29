'use client'
import Image from 'next/image';
import { useRef } from 'react';

export default function ScholarsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null); 

  const scroll = (offset: number) => {
    sliderRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const scholars = [
    { id: 1, name: 'الشيخ أحمد بن علي العجمي', image: '/ahmed-alajmi.webp', country: 'السعودية', identifier: 'ahmed-alajmi' },
    { id: 2, name: 'الشيخ مشاري راشد العفاسي', image: '/mishary-alafasy.webp', country: 'الكويت', identifier: 'mishary-alafasy' },
    { id: 3, name: 'الشيخ عبد الباسط عبد الصمد', image: '/abdulbasit.webp', country: 'مصر', identifier: 'abdulbasit' },
    { id: 4, name: 'الشيخ سعد الغامدي', image: '/saad-alghamdi.webp', country: 'السعودية', identifier: 'saad-alghamdi' },
    { id: 5, name: 'الشيخ ماهر المعيقلي', image: '/maher-almuaiqly.webp', country: 'السعودية', identifier: 'maher-almuaiqly' },
    { id: 6, name: 'الشيخ ياسر الدوسري', image: '/yasser-dossary.webp', country: 'السعودية', identifier: 'yasser-dossary' },
    { id: 7, name: 'الشيخ عبدالله بصفر', image: '/abdullah-basfar.webp', country: 'السعودية', identifier: 'abdullah-basfar' },
    { id: 8, name: 'الشيخ محمد صديق المنشاوي', image: '/mohamed-minshawi.webp', country: 'مصر', identifier: 'mohamed-minshawi' },
    { id: 9, name: 'الشيخ خالد الجليل', image: '/khalid-jalil.webp', country: 'السعودية', identifier: 'khalid-jalil' },
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-12" dir="rtl">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-6 mb-3">
          <Image src="/rightcurve.webp" alt="" width={27} height={81} />
          <h2 className="text-2xl md:text-3xl text-[#FBF9EF] font-bold">
            دُرُوسٌ مُنْتَقَاةٌ مِنْ شُيُوخٍ نُحِبُّهُمْ
          </h2>
          <Image src="/leftcurve.webp" alt="" width={27} height={81} />
        </div>
        <p className="text-xl text-[#FFFFFF99]">
          لننهل من علمهم، ونسير على خطاهم في فهم كتاب الله وسنّة نبيّه ﷺ.
        </p>
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll(-300)}
          className="absolute left-0 cursor-pointer top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-[#101B38] border-2 border-[#E7D7A0] rounded-full hover:bg-[#1a2b5a] transition-all"
        >
          <Image src="/arrowleft.webp" alt="Previous" width={10} height={20} />
        </button>

        <button
          onClick={() => scroll(300)}
          className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-[#101B38] border-2 border-[#E7D7A0] rounded-full hover:bg-[#1a2b5a] transition-all"
        >
          <Image src="/arrowright.webp" alt="Next" width={10} height={20} />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide px-4 py-4"
        >
          {scholars.map((scholar) => (
            <div key={scholar.id} className="flex-shrink-0 w-56 text-center">
              <div className="relative mb-6 w-48 h-80 mx-auto rounded-[35px] overflow-hidden border border-white/10 shadow-xl">
                <div 
                  className="w-full h-full bg-cover bg-top transform hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${scholar.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <h3 className="text-lg text-white font-bold mb-5 truncate">{scholar.name}</h3>
              <button className="bg-[#E7D7A0] cursor-pointer text-[#0A102A] w-full py-4 rounded-xl font-bold hover:bg-[#d4bc7a] active:scale-95 transition-all text-lg shadow-lg">
                تصفح دروس الشيخ
              </button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
