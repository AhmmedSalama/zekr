'use client'
import { useState, useEffect } from 'react';

type HadithData = {
  text: string;
  source: string;
};

type AyahData = {
  text: string;
  surah: string;
  ayahNumber: number;
};

export default function DailyContent() {
  const [activeTab, setActiveTab] = useState<'hadith' | 'ayah'>('hadith');
  const [hadith, setHadith] = useState<HadithData | null>(null);
  const [ayah, setAyah] = useState<AyahData | null>(null);
  const [loading, setLoading] = useState(false);

  /* ================= حديث اليوم ================= */
  useEffect(() => {
    if (activeTab === 'hadith' && !hadith) {
      setLoading(true);
      fetch('https://api.hadith.gading.dev/books/muslim?range=1-300')
        .then(res => res.json())
        .then(data => {
          const random =
            data.data.hadiths[
              Math.floor(Math.random() * data.data.hadiths.length)
            ];

          setHadith({
            text: random.arab,
            source: 'رواه مسلم',
          });
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [activeTab, hadith]);

  /* ================= آية اليوم ================= */
  useEffect(() => {
    if (activeTab === 'ayah' && !ayah) {
      setLoading(true);
      fetch('https://api.alquran.cloud/v1/ayah/random')
        .then(res => res.json())
        .then(data => {
          setAyah({
            text: data.data.text,
            surah: data.data.surah.name,
            ayahNumber: data.data.numberInSurah,
          });
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [activeTab, ayah]);

  /* ================= Loading ================= */
  if (loading) {
    return (
      <div className="mt-[80px] text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E7D7A0]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mb-[100px]" dir="rtl">
      <div className="flex gap-8 justify-center mb-8">
        <button
          onClick={() => setActiveTab('hadith')}
          className={`${activeTab === 'hadith'
            ? 'text-[#E7D7A0] border-b-2 border-[#E7D7A0]'
            : 'text-[#FFFFFF4D]'
            } text-[20px] md:text-[24px] leading-[48px] font-bold cursor-pointer`}
        >
          حديث اليوم
        </button>

        <button
          onClick={() => setActiveTab('ayah')}
          className={`${activeTab === 'ayah'
            ? 'text-[#E7D7A0] border-b-2 border-[#E7D7A0]'
            : 'text-[#FFFFFF4D]'
            } text-[20px] md:text-[24px] leading-[48px] font-bold cursor-pointer`}
        >
          آية اليوم
        </button>
      </div>

      <div
        className="rounded-[22px] flex items-center justify-center"
        style={{
          backgroundImage: 'url(/DailyContent.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="p-6 md:p-10 max-h-[320px] w-full overflow-y-auto text-center break-words ">
          {activeTab === 'hadith' && hadith && (
            <>
              <h3 className="text-xl md:text-2xl mb-4 leading-[44.8px] font-normal">
                قال رسول الله ﷺ:
              </h3>

              <p className="text-lg md:text-2xl mb-4 leading-relaxed font-normal text-[#F7DBA3]">
                &quot;{hadith.text}&quot;
              </p>

              <p className="text-lg md:text-2xl leading-[44.8px] font-normal">
                {hadith.source}
              </p>
            </>
          )}

          {activeTab === 'ayah' && ayah && (
            <>
              <h3 className="text-xl md:text-2xl mb-4 leading-[44.8px] font-normal">
                قال الله تعالى:
              </h3>

              <p className="text-lg md:text-2xl mb-4 leading-relaxed font-normal text-[#F7DBA3]">
                &quot;{ayah.text}&quot;
              </p>

              <p className="text-lg md:text-2xl leading-[44.8px] font-normal">
                {ayah.surah} - الآية {ayah.ayahNumber}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
