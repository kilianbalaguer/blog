import { getBlogPosts } from "@/lib/github";
import BlogPostCard from "@/components/blog-post-card";
import Header from "@/components/header";
import { motion } from "framer-motion";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main>
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-20 mt-20">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Thoughts, insights, and stories from my journey as a developer.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No blog posts yet. Check back soon!
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
