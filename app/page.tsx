"use client";

import Header from "@/components/header";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";
import Image from "next/image";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main>
      <Header />
      <div className="max-w-5xl mx-auto px-4 pt-20 pb-20">
        <div className="flex flex-col md:flex-row items-center gap-12 mt-20">
          {/* Photo Section */}
          <div className="flex-shrink-0 md:w-1/3">
            <div className="relative w-64 h-64 md:w-full md:h-auto rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/KilianBalaguer.JPEG"
                alt="Profile photo"
                width={300}
                height={300}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-2/3 text-left md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t.welcomeTitle}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {t.welcomeSubtitle}
            </p>
            
            <p className="text-base text-gray-700 dark:text-gray-300 mb-10 leading-relaxed max-w-xl">
              Welcome to my blog! Here I share my thoughts, experiences, and insights on web development, technology, and personal growth. Feel free to explore and enjoy the articles.
            </p>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium hover:scale-105 transition-all duration-300"
            >
              {t.readArticles}
              <BsArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
