"use client";

// ============================================
// Imports
// ============================================
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X } from "lucide-react";
import Image from "next/image";
// import { useTheme } from "./../hooks/useTheme";

// ============================================
// NavBar Component
// ============================================
function NavBar() {
  // --------------------------------------------
  // State Management
  // --------------------------------------------
  const [open, setOpen] = useState(false); // حالة فتح/إغلاق القائمة على الموبايل
  // const { theme, toggleTheme } = useTheme(); // Theme hook (معطل حالياً)
  const pathname = usePathname(); // الحصول على المسار الحالي للصفحة

  // --------------------------------------------
  // Render
  // --------------------------------------------
  return (
    <nav
      role="navigation"
      className="text-white bg-[linear-gradient(180deg,_rgba(9,33,71,0.6)_0%,_rgba(10,16,42,0.6)_100%)]"
    >
      {/* ========================================== */}
      {/* Container الرئيسي */}
      {/* ========================================== */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        
        {/* ========================================== */}
        {/* Logo + Theme Toggle */}
        {/* ========================================== */}
        <div className="flex items-center gap-4 font-bold text-xl">
          {/* زر تغيير الثيم (معطل حالياً) */}
          {/* <button
            onClick={toggleTheme}
            className="bg-[#F0BE5B] text-black p-2 rounded-md"
          >
            {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
          </button> */}

          {/* لوجو الموقع */}
          <Link href="/">
            <Image src="/Logo.webp" alt="منصة ذكر" width={75} height={40} />
          </Link>
        </div>

        {/* ========================================== */}
        {/* Desktop Menu - قائمة الشاشات الكبيرة */}
        {/* ========================================== */}
        <ul className="hidden md:flex items-center gap-6 text-sm md:text-[14px] lg:text-[17px] xl:text-[20px] leading-[36px] font-extrabold">
          {/* الرئيسية */}
          <li>
            <Link
              href="/"
              className={`${pathname === "/" ? "active" : ""} hover:text-[#E7D7A0]`}
              aria-current={pathname === "/" ? "page" : undefined}
            >
              الرئيسية
            </Link>
          </li>

          {/* القرآن الكريم */}
          <li>
            <Link
              href="/quran"
              className={`${pathname === "/quran" ? "active" : ""} hover:text-[#E7D7A0]`}
              aria-current={pathname === "/quran" ? "page" : undefined}
            >
              القرآن الكريم
            </Link>
          </li>

          {/* دروس ومحاضرات */}
          <li>
            <Link
              href="/lessons"
              className={`${pathname === "/lessons" ? "active" : ""} hover:text-[#E7D7A0]`}
              aria-current={pathname === "/lessons" ? "page" : undefined}
            >
              دروس ومحاضرات
            </Link>
          </li>

          {/* الأذكار والأدعية */}
          <li>
            <Link
              href="/azkar"
              className={`${pathname === "/azkar" ? "active" : ""} hover:text-[#E7D7A0]`}
              aria-current={pathname === "/azkar" ? "page" : undefined}
            >
              الأذكار والأدعية
            </Link>
          </li>

          {/* قصص وعبر */}
          <li>
            <Link
              href="/stories"
              className={`${pathname === "/stories" ? "active" : ""} hover:text-[#E7D7A0]`}
              aria-current={pathname === "/stories" ? "page" : undefined}
            >
              قصص وعبر
            </Link>
          </li>

          {/* تواصل معنا */}
          <li>
            <Link
              href="/contact"
              className={`${pathname === "/contact" ? "active" : ""} hover:text-[#E7D7A0]`}
              aria-current={pathname === "/contact" ? "page" : undefined}
            >
              تواصل معنا
            </Link>
          </li>
        </ul>

        {/* ========================================== */}
        {/* Quran Heart Button - Desktop */}
        {/* ========================================== */}
        <div className="hidden md:block">
          <Link
            href="/QuranHeart"
            className="bg-[#E7D7A0] hover:bg-[#d4bc7a] text-[#101835] px-5 lg:px-10 py-2 rounded-lg font-extrabold cursor-pointer lg:text-xl"
            style={{ fontFamily: "Tajawal" }}
          >
            Quran Heart
          </Link>
        </div>

        {/* ========================================== */}
        {/* Mobile Menu Toggle Button */}
        {/* ========================================== */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl cursor-pointer"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* ========================================== */}
      {/* Mobile Menu - قائمة الموبايل */}
      {/* ========================================== */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden px-6 pb-6"
          style={{ background: "var(--nav-bg)", fontFamily: "Almarai" }}
        >
          <ul
            className="flex flex-col items-center gap-4 text-[20px] font-extrabold leading-[36px] w-full"
            style={{ fontFamily: "Almarai" }}
          >
            {/* الرئيسية */}
            <li>
              <Link
                className={`${pathname === "/" ? "active" : ""} hover:text-[#E7D7A0]`}
                href="/"
              >
                الرئيسية
              </Link>
            </li>

            {/* القرآن الكريم */}
            <li>
              <Link
                className={`${pathname === "/quran" ? "active" : ""} hover:text-[#E7D7A0]`}
                href="/quran"
              >
                القرآن الكريم
              </Link>
            </li>

            {/* دروس ومحاضرات */}
            <li>
              <Link
                className={`${pathname === "/lessons" ? "active" : ""} hover:text-[#E7D7A0]`}
                href="/lessons"
              >
                دروس ومحاضرات
              </Link>
            </li>

            {/* الأذكار والأدعية */}
            <li>
              <Link
                className={`${pathname === "/azkar" ? "active" : ""} hover:text-[#E7D7A0]`}
                href="/azkar"
              >
                الأذكار والأدعية
              </Link>
            </li>

            {/* قصص وعبر */}
            <li>
              <Link
                className={`${pathname === "/stories" ? "active" : ""} hover:text-[#E7D7A0]`}
                href="/stories"
              >
                قصص وعبر
              </Link>
            </li>

            {/* تواصل معنا */}
            <li>
              <Link
                className={`${pathname === "/contact" ? "active" : ""} hover:text-[#E7D7A0]`}
                href="/contact"
              >
                تواصل معنا
              </Link>
            </li>

            {/* Quran Heart Button - Mobile */}
            <Link
              href="/QuranHeart"
              className="bg-[#E7D7A0] text-center text-black px-6 py-2 rounded-lg w-full cursor-pointer"
            >
              Quran Heart
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
