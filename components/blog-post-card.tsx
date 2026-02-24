"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { BlogPost } from "@/lib/github";

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const excerpt = post.body
    ? post.body
        .split("\n")
        .slice(0, 3)
        .join(" ")
        .substring(0, 150)
        .trim()
    : "No content available";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group p-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-600 transition-all duration-300"
    >
      <div className="mb-4">
        <time className="text-sm text-gray-500 dark:text-gray-400">
          {date}
        </time>
        <h3 className="text-2xl font-bold mt-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
          {post.title}
        </h3>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
        {excerpt}...
      </p>

      <div className="flex gap-2 flex-wrap mb-4">
        {post.labels.map((label) => (
          <span
            key={label.name}
            className="text-xs px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-full"
          >
            {label.name}
          </span>
        ))}
      </div>

      <Link
        href={`/blog/${post.number}`}
        className="inline-flex items-center gap-2 text-black dark:text-white font-medium group-hover:gap-3 transition-all"
      >
        Read More
        <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.article>
  );
}
