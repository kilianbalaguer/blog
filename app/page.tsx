import Header from "@/components/header";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="max-w-5xl mx-auto px-4 pt-32 pb-20 text-center mt-20">
        <h1 className="text-6xl md:text-7xl font-bold mb-6">
          Welcome to My <span className="italic">Blog</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Exploring web development, design, and the journey of building digital products.
        </p>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium hover:scale-105 transition-all duration-300"
        >
          Read Articles
          <BsArrowRight />
        </Link>
      </div>
    </main>
  );
}
