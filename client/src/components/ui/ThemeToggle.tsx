import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

// Reads the initial state from the <html> class, which index.html sets before
// React mounts (so there is no flash of the wrong theme).
function getInitialDark() {
  if (typeof document !== "undefined") {
    return document.documentElement.classList.contains("dark");
  }
  return false;
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialDark);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      type="button"
      onClick={() => setIsDark((v) => !v)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative p-2 rounded-full cursor-pointer text-gray-900 hover:bg-gray-300 dark:text-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
    >
      {isDark ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
}

export default ThemeToggle;
