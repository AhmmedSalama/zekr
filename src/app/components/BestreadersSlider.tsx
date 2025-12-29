'use client'
import Image from 'next/image';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function BestreadersSlider() {
  const sliderRef = useRef<HTMLDivElement>(null); // تحديد النوع
  const router = useRouter();

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

  const handleListen = (identifier: string) => {
    router.push(`/quran/${identifier}`);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-12" dir="rtl">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-6 mb-3">
          <Image src="/rightcurve.webp" alt="" width={27} height={81} />
          <h2 className="text-2xl md:text-3xl text-[#FBF9EF] font-bold">أفضل القراء</h2>
          <Image src="/leftcurve.webp" alt="" width={27} height={81} />
        </div>
        <p className="text-xl text-[#FFFFFF99]">استمع لآيات كتاب الله بترتيل عذب، وتدبر معانيه بخشوع وإيمان</p>
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll(-310)}
          className="absolute left-0 cursor-pointer top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-[#101B38] border-2 border-[#E7D7A0] rounded-full hover:bg-[#1a2b5a] transition-all"
        >
          <Image src="/arrowleft.webp" alt="Previous" width={10} height={20} />
        </button>

        <button
          onClick={() => scroll(310)}
          className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-[#101B38] border-2 border-[#E7D7A0] rounded-full hover:bg-[#1a2b5a] transition-all"
        >
          <Image src="/arrowright.webp" alt="Next" width={10} height={20} />
        </button>

        <div ref={sliderRef} className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide px-4 py-4">
          {scholars.map((scholar) => (
            <div key={scholar.id} className="relative flex-shrink-0 w-[296px] h-[460px] bg-[#121D3B] rounded-[20px] text-center">
              <Image src="/framebestreader.webp" alt="frame" width={296} height={247} className="absolute top-0 left-0 rounded-t-[20px]" />
              <div className='absolute top-[210px] w-[72px] h-[72px] left-[25px] bg-[#00133F] rounded-full border border-[#E1C987] p-1'>
                <Image src={scholar.image} alt={scholar.name} width={72} height={72} className="rounded-full" />
              </div>
              <div className='absolute bottom-[40px] left-0 right-0 text-center flex flex-col gap-[10px] items-center'>
                <h1 className='font-bold text-[20px] text-[#FFFEEE]'>{scholar.name}</h1>
                <p className='text-[16px] text-[#E1C987] font-bold mb-[10px]'>{scholar.country}</p>
                <button 
                  onClick={() => handleListen(scholar.identifier)}
                  className="w-[248px] h-[40px] text-[18px] text-[#00133F] cursor-pointer leading-[25px] rounded-[12px] bg-[#E1C987] hover:bg-[#d4b870] transition-colors" 
                  style={{ fontFamily: 'Tajawal' }}
                >
                  استماع
                </button>
              </div>
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
