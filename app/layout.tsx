import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ThemeContextProvider from "@/context/theme-context";
import LanguageContextProvider from "@/context/language-context";
import ThemeSwitch from "@/components/theme-switch";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog | Kilian Balaguer",
  description: "Thoughts, insights, and stories from Kilian Balaguer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.className} bg-white dark:bg-black text-gray-950 relative dark:text-gray-50 dark:text-opacity-90`}
        suppressHydrationWarning
      >
        <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] transition-all duration-300" />
        
        <ThemeContextProvider>
          <LanguageContextProvider>
            {children}
            <Toaster position="top-right" />
            <ThemeSwitch />
          </LanguageContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
