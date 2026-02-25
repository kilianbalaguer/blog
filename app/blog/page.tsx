"use client";

import { getBlogPosts } from "@/lib/github";
import BlogPostCard from "@/components/blog-post-card";
import Header from "@/components/header";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";
import { useEffect, useState } from "react";
import { BlogPost } from "@/lib/github";

export default function BlogPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  return (
    <main>
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-20 mt-20">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4">
            {t.blogPageTitle}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t.blogPageSubtitle}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Loading...
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              {t.noPosts}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
