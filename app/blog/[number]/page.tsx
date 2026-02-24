import { getBlogPost, getBlogPosts } from "@/lib/github";
import Header from "@/components/header";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPostParams {
  params: Promise<{
    number: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    number: post.number.toString(),
  }));
}

export default async function BlogPostPage({ params }: BlogPostParams) {
  const { number } = await params;
  const post = await getBlogPost(parseInt(number));

  if (!post) {
    return (
      <main>
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Post not found</h1>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-black dark:text-white font-medium hover:gap-3 transition-all"
          >
            <BsArrowLeft />
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const date = new Date(post.created_at).toLocaleDateString("en-US", {
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
          Back to Blog
        </Link>

        <header className="mb-12">
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {date}
          </time>
          <h1 className="text-5xl font-bold mt-4 mb-4">{post.title}</h1>
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
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
          <Link
            href={post.url}
            target="_blank"
            className="inline-flex items-center gap-2 text-black dark:text-white font-medium hover:opacity-75 transition-opacity"
          >
            View on GitHub →
          </Link>
        </footer>
      </article>
    </main>
  );
}
