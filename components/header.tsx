"use client";

import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import LanguageSwitch from "./language-switch";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export default function Header() {
  const { language } = useLanguage();
  const t = translations[language];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="z-[999] relative">
      <div className="fixed top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 h-16 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b-2 border-black dark:border-white max-w-7xl mx-auto transition-all duration-300">
        <nav className="h-full px-4 sm:px-8 flex items-center justify-between">
          <div className="text-2xl font-black">KB</div>
          
          <div className="hidden md:flex items-center gap-3">
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

          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitch />
            <button
              type="button"
              className="w-10 h-10 bg-white dark:bg-black border-2 border-black dark:border-white md:hover:bg-black md:hover:text-white md:dark:hover:bg-white md:dark:hover:text-black active:scale-95 transition-all font-medium flex items-center justify-center touch-manipulation"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="text-xl font-black leading-none">☰</span>
            </button>
          </div>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[998] bg-white/95 dark:bg-black/95 backdrop-blur-sm p-6 md:hidden">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="text-2xl font-black">KB</div>
              <button
                type="button"
                onClick={(e) => {
                  setIsMenuOpen(false);
                  e.currentTarget.blur();
                }}
                aria-label="Close menu"
                className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black active:scale-95 transition-all duration-300 text-2xl font-black touch-manipulation flex items-center justify-center border-2 border-black dark:border-white"
              >
                ✕
              </button>
            </div>

            <ul className="flex flex-col gap-6">
              <li>
                <Link
                  href="/"
                  className="block text-2xl font-black hover:translate-x-2 transition-transform"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="block text-2xl font-black hover:translate-x-2 transition-transform"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.blog}
                </Link>
              </li>
              <li>
                <a
                  href="https://kilianbalaguer-portfolio.vercel.app"
                  className="block text-2xl font-black hover:translate-x-2 transition-transform"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.portfolio} <BsArrowRight className="inline text-base" />
                </a>
              </li>
              <li>
                <a
                  href="https://kilianbalaguer-linkpage.vercel.app"
                  className="block text-2xl font-black hover:translate-x-2 transition-transform"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.links} <BsArrowRight className="inline text-base" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
