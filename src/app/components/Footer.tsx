"use client"

import { Mail , Phone, Headphones , Facebook, Twitter, Instagram, Apple ,Smartphone} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from "next/navigation"; 

function Footer() {
  const pathname = usePathname(); // للحصول على المسار الحالي لتفعيل الرابط النشط
  
  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Image src='/startFooter.webp' alt="خلفية الفوتر لمنصة ذكر" width={200} height={200} className="absolute top-[70px] left-0 -z-10" />
        
        {/* صندوق الاشتراك في النشرة البريدية */}
        <div className="flex flex-col md:flex-row flex-wrap gap-5 justify-between items-center border-[#242c4a] bg-[var(--subscribe-color)] border py-6 px-6 rounded-2xl">
          <div className="subscribe">
            <h1 className='text-[24px] font-bold leading-[33.6px]' >اشترك في نشرتنا البريدية</h1>
            <p className='text-[var(--p-color)] mt-3 text-[16px] font-normal'>كن أول من يعلم بالدروس و المحاضرات الجديدة.</p>
          </div>
          <form className="subscribe-form flex flex-col md:flex-row lg:flex-row gap-5">
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="email" 
                placeholder="ادخل بريدك الالكتروني" 
                className="px-4 py-2 pr-10 text-[16px] font-bold rounded-[12px] bg-[#0A1A3B] text-white placeholder:text-[#B7B7B7CC] focus:outline-none focus:ring-2 focus:ring-[#e1ca87]"
                aria-label="أدخل بريدك الإلكتروني للاشتراك في النشرة"
              />
            </div>
            <button className="bg-[#E1C987] w-full md:w-fit font-bold hover:bg-[#f2d89a] text-black px-6 py-2 rounded-[12px] cursor-pointer" aria-label="اشترك في النشرة البريدية">
              اشترك
            </button>
          </form>
        </div>

        {/* تفاصيل الفوتر الرئيسية */}
        <div className='Footer-details mt-20 flex flex-col md:flex-row lg:flex-row justify-between gap-10'>
          {/* وصف المنصة */}
          <div className='max-w-xs'>
            <h1 className='font-bold text-xl mb-4'>ذكر</h1>
            <p className='text-[var(--p-color)]'>
              منصة ذكر تهدف لتلاوة القرأن وتعلم علومه. نضئ القلوب بنور الايمان. ليكون جسرا يصل المسلم بكتاب الله بأسلوب عصري.
            </p>
          </div>
          
          {/* روابط مهمة */}
          <div>
            <h1 className='font-bold text-[24px] leading-[33.px] mb-4 text-[var(--main-color)]'>روابط مهمة</h1>
            <ul className="flex flex-col gap-3 text-sm lg:text-base font-medium">
              <li>
                <Link
                  href="/"
                  className={`${pathname === "/" ? "active" : ""} hover:text-[#E1C987] text-[#B7B7B7] font-normal text-[16px] xl:text-[20px]`}
                  aria-current={pathname === "/" ? "page" : undefined}
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/quran"
                  className={`${pathname === "/quran" ? "active" : ""} hover:text-[#E1C987] text-[#B7B7B7] font-normal text-[16px] xl:text-[20px]`}
                  aria-current={pathname === "/quran" ? "page" : undefined}
                >
                  القرآن الكريم
                </Link>
              </li>
              <li>
                <Link
                  href="/lessons"
                  className={`${pathname === "/lessons" ? "active" : ""} hover:text-[#E1C987] text-[#B7B7B7] font-normal text-[16px] xl:text-[20px]`}
                  aria-current={pathname === "/lessons" ? "page" : undefined}
                >
                  دروس ومحاضرات
                </Link>
              </li>
              <li>
                <Link
                  href="/azkar"
                  className={`${pathname === "/azkar" ? "active" : ""} hover:text-[#E1C987] text-[#B7B7B7] font-normal text-[16px] xl:text-[20px]`}
                  aria-current={pathname === "/azkar" ? "page" : undefined}
                >
                  الأذكار والأدعية
                </Link>
              </li>
              <li>
                <Link
                  href="/stories"
                  className={`${pathname === "/stories" ? "active" : ""} hover:text-[#E1C987] text-[#B7B7B7] font-normal text-[16px] xl:text-[20px]`}
                  aria-current={pathname === "/stories" ? "page" : undefined}
                >
                  قصص وعبر
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`${pathname === "/contact" ? "active" : ""} hover:text-[#E1C987] text-[#B7B7B7] font-normal text-[16px] xl:text-[20px]`}
                  aria-current={pathname === "/contact" ? "page" : undefined}
                >
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>
          
          {/* قسم التواصل معنا */}
          <div>
            <h1 className='font-bold text-[24px] leading-[33.px] mb-4 text-[var(--main-color)]'>تواصل معنا</h1>
            <div className='flex flex-col gap-3 text-gray-400'>
              <a 
                href="mailto:info@zekr.com" 
                className='hover:text-[#E1C987] text-[var(--contact-color)] flex items-center gap-2'
                aria-label="إرسال بريد إلكتروني إلى info@zekr.com"
              >
                <Mail size={18} className="text-[var(--i-color)]" />
                info@zekr.com
              </a>
              <a 
                href="tel:+201000007890" 
                className='hover:text-[#E1C987] text-[var(--contact-color)] flex items-center gap-2'
                aria-label="الاتصال بالرقم 201000000000+"
              >
                <Phone size={18} className="text-[var(--i-color)]" />
                201000000000+
              </a>
              <a 
                href="#" 
                className='hover:text-[#E1C987] text-[var(--contact-color)] flex items-center gap-2'
                aria-label="استمع لتلاوة هادئة"
              >
                <Headphones size={18} className="text-[var(--i-color)]" />
                استمع لتلاوة هادئة
              </a>
            </div>
          </div>
          
          {/* قسم تحميل التطبيق */}
<section aria-labelledby="download-app-heading">
            <h2 id="download-app-heading" className='font-bold text-[24px] leading-[33px] mb-4 text-[var(--main-color)]'>
              حمل تطبيق ذكر
            </h2>
            <p className='text-[var(--p-color)] text-xl font-normal'>
              تجربة إيمانية متكاملة بين يديك، حمل التطبيق الآن.
            </p>
            
            <div className='flex flex-col gap-5 mt-5'>
              {/* Apple Store Link */}
              <a 
                href='https://apps.apple.com/...' 
                className='bg-[var(--subscribe-color)] border-[#242c4a] border rounded-lg gap-4 py-4 px-4 flex justify-start items-center w-[300px] md:w-[220px] lg:w-[350px] '
                aria-label="تحميل تطبيق ذكر من متجر آبل - App Store"
                title="تحميل تطبيق ذكر من متجر آبل"
              >
                <Apple size={40} className="text-[var(--i-color)]" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className='font-normal text-[#B7B7B7] text-[12px] leading-tight'>Download on the</span>
                  <span className='font-bold text-[#FAFAFA] text-[18px] leading-tight'>App Store</span>
                </div>
              </a>

              {/* Google Play Link */}
              <a 
                href='https://play.google.com/...' 
                className='bg-[var(--subscribe-color)] border-[#242c4a] border rounded-lg gap-4 py-4 px-4 flex justify-start items-center w-[300px] md:w-[220px] lg:w-[350px] '
                aria-label="تحميل تطبيق ذكر من متجر جوجل بلاي - Google Play"
                title="تحميل تطبيق ذكر من متجر جوجل بلاي"
              >
                <Smartphone size={40} className="text-[var(--i-color)]" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className='font-normal text-[#B7B7B7] text-[12px] leading-tight'>Download on the</span>
                  <span className='font-bold text-[#FAFAFA] text-[18px] leading-tight'>Google Play</span>
                </div>
              </a>
            </div>
          </section>
        </div>

        {/* فاصل سفلي */}
        <hr className='text-[var(--p-color)] mt-10' />
        
        {/* حقوق النشر وأيقونات السوشيال ميديا */}
        <div className="mt-10 text-center flex flex-row flex-wrap justify-between items-center gap-4">
          <p className='text-[var(--p-color)]' dir='ltr'>© {new Date().getFullYear()} ذِكْر. جميع الحقوق محفوظة</p>
          <div className='sochial-media-icons flex justify-center gap-6'>
            <a href="#" className='hover:text-[#E1C987] text-[var(--p-color)]' aria-label="صفحتنا على فيسبوك">
              <Facebook size={20} />
            </a>
            <a href="#" className='hover:text-[#E1C987] text-[var(--p-color)]' aria-label="صفحتنا على تويتر">
              <Twitter size={20} />
            </a>
            <a href="#" className='hover:text-[#E1C987] text-[var(--p-color)]' aria-label="صفحتنا على إنستجرام">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
