"use client";

import { useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    if (!document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    }
  };

  if (!mounted) return null;

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
              Home
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all"
            >
              Blog
            </Link>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700" />
            <a
              href="https://kilianbalaguer-portfolio.vercel.app"
              className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all inline-flex items-center gap-1"
            >
              Portfolio <BsArrowRight className="text-xs" />
            </a>
            <a
              href="https://kilianbalaguer-linkpage.vercel.app"
              className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all inline-flex items-center gap-1"
            >
              Links <BsArrowRight className="text-xs" />
            </a>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-10 h-10 bg-white dark:bg-black border-2 border-black dark:border-white md:hover:bg-black md:hover:text-white md:dark:hover:bg-white md:dark:hover:text-black active:scale-95 transition-all flex items-center justify-center"
            >
              {isDark ? <BsSun className="text-lg" /> : <BsMoon className="text-lg" />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
