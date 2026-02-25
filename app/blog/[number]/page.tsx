"use client";

import { getBlogPost } from "@/lib/github";
import Header from "@/components/header";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";
import { useEffect, useState } from "react";
import { BlogPost } from "@/lib/github";
import { translateText, translateMarkdown } from "@/lib/translate";

interface BlogPostParams {
  params: Promise<{
    number: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostParams) {
  const { language } = useLanguage();
  const t = translations[language];
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [postNumber, setPostNumber] = useState<number | null>(null);
  const [translatedTitle, setTranslatedTitle] = useState("");
  const [translatedBody, setTranslatedBody] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  // Load the blog post
  useEffect(() => {
    params.then(({ number }) => {
      const num = parseInt(number);
      setPostNumber(num);
      getBlogPost(num).then((data) => {
        setPost(data);
        setLoading(false);
      });
    });
  }, [params]);

  // Translate content when language or post changes
  useEffect(() => {
    const translateContent = async () => {
      if (!post) return;

      if (language === "en") {
        setTranslatedTitle(post.title);
        setTranslatedBody(post.body);
        return;
      }

      setIsTranslating(true);
      try {
        const [title, body] = await Promise.all([
          translateText(post.title, language),
          translateMarkdown(post.body, language),
        ]);
        setTranslatedTitle(title);
        setTranslatedBody(body);
      } catch (error) {
        console.error("Translation error:", error);
        setTranslatedTitle(post.title);
        setTranslatedBody(post.body);
      } finally {
        setIsTranslating(false);
      }
    };

    translateContent();
  }, [language, post]);

  if (loading) {
    return (
      <main>
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main>
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">{t.postNotFound}</h1>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-black dark:text-white font-medium hover:gap-3 transition-all"
          >
            <BsArrowLeft />
            {t.backToBlog}
          </Link>
        </div>
      </main>
    );
  }

  // Map language to locale for date formatting
  const localeMap: Record<string, string> = {
    en: "en-US",
    fr: "fr-FR",
    ar: "ar-SA",
    nl: "nl-NL",
    de: "de-DE",
    es: "es-ES",
    ko: "ko-KR",
  };

  const date = new Date(post.created_at).toLocaleDateString(localeMap[language] || "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main>
      <Header />
      <article className="max-w-3xl mx-auto px-4 py-20 mt-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-8"
        >
          <BsArrowLeft />
          {t.backToBlog}
        </Link>

        <header className="mb-12">
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {date}
          </time>
          <h1 className="text-5xl font-bold mt-4 mb-4">
            {isTranslating ? (
              <span className="opacity-50">{post.title}</span>
            ) : (
              translatedTitle || post.title
            )}
          </h1>
          <div className="flex gap-2 flex-wrap">
            {post.labels.map((label) => (
              <span
                key={label.name}
                className="text-xs px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-full"
              >
                {label.name}
              </span>
            ))}
          </div>
        </header>

        <div className="markdown-content">
          {isTranslating ? (
            <div className="opacity-50">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
            </div>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {translatedBody || post.body}
            </ReactMarkdown>
          )}
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
          <Link
            href={post.url}
            target="_blank"
            className="inline-flex items-center gap-2 text-black dark:text-white font-medium hover:opacity-75 transition-opacity"
          >
            {t.viewOnGitHub} →
          </Link>
        </footer>
      </article>
    </main>
  );
}
