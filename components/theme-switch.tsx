"use client";

import { useTheme } from "@/context/theme-context";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="fixed bottom-5 right-5 bg-white dark:bg-black w-[3rem] h-[3rem] border-2 border-black dark:border-white flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "light" ? <BsSun className="text-lg" /> : <BsMoon className="text-lg" />}
    </button>
  );
}
