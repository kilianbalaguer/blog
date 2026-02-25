"use client";

import Header from "@/components/header";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main>
      <Header />
      <div className="max-w-5xl mx-auto px-4 pt-32 pb-20 text-center mt-20">
        <h1 className="text-6xl md:text-7xl font-bold mb-6">
          {t.welcomeTitle}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          {t.welcomeSubtitle}
        </p>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium hover:scale-105 transition-all duration-300"
        >
          {t.readArticles}
          <BsArrowRight />
        </Link>
      </div>
    </main>
  );
}
