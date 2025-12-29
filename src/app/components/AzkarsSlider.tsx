'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

export default function AzkarsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null); // تعديل هنا

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 305, behavior: 'smooth' });
  };

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -305, behavior: 'smooth' });
  };

  const Azkar = [
    { 
      id: 1, 
      name: 'أَذْكَارُ الْمَسَاءِ', 
      preview: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ للهِ وَالْحَمْدُ للهِ لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ..' 
    },
    { 
      id: 2, 
      name: 'أَذْكَارُ مَا بَعْدَ الصَّلَاةِ', 
      preview: 'أَسْتَغْفِرُ اللهَ (ثَلَاثاً)، اَللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ..' 
    },
    { 
      id: 3, 
      name: 'أَذْكَارُ الْخُرُوجِ مِنَ الْبَيْتِ', 
      preview: 'بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ.' 
    },
    { 
      id: 4, 
      name: 'أَذْكَارُ النَّوْمِ', 
      preview: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا..' 
    },
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-12" dir="rtl">
      
      <div className="text-center mb-[60px]">
        <div className='flex items-center justify-center mb-3 '>
          <Image src="/rightcurve.webp" alt="" width={27} height={81} className="ml-[30px]" />
          <h2 className="text-[20px] md:text-[32px] text-[#FBF9EF] font-bold mb-2">ٱذْكُرِ ٱللَّهَ يَذْكُرْكَ</h2>
          <Image src="/leftcurve.webp" alt="" width={27} height={81} className="mr-[30px]" />
        </div>
        <p className="text-[24px] font-normal text-[#FFFFFF99]">&quot;كلمات نور، تريح القلب وتطمئن النفس&quot;</p>
      </div>

      <div className="relative group px-10">
        
        <button
          onClick={scrollLeft}
          className="absolute flex items-center justify-center cursor-pointer w-[52px] h-[52px] left-0 top-1/2 -translate-y-1/2 z-20 bg-[#101B38] border-2 border-[#E7D7A0] rounded-full transition-all hover:bg-[#1a2b5a]"
        >
          <Image src="/arrowleft.webp" alt="Previous" width={10} height={20} />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {Azkar.map((zekr) => (
            <div 
              key={zekr.id} 
              className="min-w-[280px] md:min-w-[340px] h-[340px] bg-[#071937] border border-[#ffffff10] rounded-[24px] flex flex-col justify-between p-8 text-center shadow-2xl"
            >
              <div>
                <h3 className="text-[24px] text-[#E7D7A0] font-bold mb-6" style={{ fontFamily: 'Tajawal' }}>{zekr.name}</h3>
                <p className="text-[#E7D7A0] text-[20px] leading-[28px] font-medium line-clamp-3" style={{ fontFamily: 'Tajawal' }}>
                  {zekr.preview}
                </p>
              </div>
              
              <Link 
                href="/azkar"
                className="bg-[#E7D7A0] cursor-pointer text-[#0A102A] w-full py-4 rounded-[12px] font-bold hover:bg-[#d4bc7a] transform active:scale-95 transition-all text-[18px] block text-center no-underline"
              >
                عرض كل الأذكار
              </Link>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute flex items-center justify-center cursor-pointer w-[52px] h-[52px] right-0 top-1/2 -translate-y-1/2 z-20 bg-[#101B38] border-2 border-[#E7D7A0] rounded-full transition-all hover:bg-[#1a2b5a]"
        >
          <Image src="/arrowright.webp" alt="Next" width={10} height={20} />
        </button>

      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

    </div>
  );
}
