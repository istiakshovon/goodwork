'use client'
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <button className="h-9 w-9" />;
    return (
        <div>
             <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {resolvedTheme === "dark" ? "☀️" : "🌙"}
    </button>
        </div>
    );
};

export default ThemeToggle;