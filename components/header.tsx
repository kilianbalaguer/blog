"use client";

import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import LanguageSwitch from "./language-switch";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export default function Header() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="z-[999] relative">
      <div className="fixed top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 h-16 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b-2 border-black dark:border-white max-w-7xl mx-auto transition-all duration-300">
        <nav className="h-full px-4 sm:px-8 flex items-center justify-between">
          <div className="text-2xl font-black">KB</div>
          
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all"
            >
              {t.home}
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all"
            >
              {t.blog}
            </Link>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700" />
            <a
              href="https://kilianbalaguer-portfolio.vercel.app"
              className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all inline-flex items-center gap-1"
            >
              {t.portfolio} <BsArrowRight className="text-xs" />
            </a>
            <a
              href="https://kilianbalaguer-linkpage.vercel.app"
              className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all inline-flex items-center gap-1"
            >
              {t.links} <BsArrowRight className="text-xs" />
            </a>
            <LanguageSwitch />
          </div>
        </nav>
      </div>
    </header>
  );
}
