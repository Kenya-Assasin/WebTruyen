"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-80" />

      {/* Animated blur circles */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-[120px] opacity-30 top-[-100px] left-[-100px] animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-blue-600 rounded-full blur-[120px] opacity-30 bottom-[-100px] right-[-100px] animate-pulse" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* 404 glitch text */}
        <h1
          className={`text-7xl md:text-9xl font-extrabold tracking-widest transition ${
            glitch ? "translate-x-1 text-red-500" : ""
          }`}
        >
          404
        </h1>

        <h2 className="mt-4 text-2xl md:text-3xl font-semibold">
          Trang không tồn tại
        </h2>

        <p className="mt-2 text-gray-300 max-w-md mx-auto">
          Có thể bạn đã nhập sai đường dẫn hoặc trang đã bị xóa.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-medium"
          >
            Về trang chủ
          </Link>

          <Link
            href="/browse"
            className="px-6 py-2 border border-gray-400 hover:bg-white hover:text-black rounded-lg transition font-medium"
          >
            Khám phá truyện
          </Link>
        </div>
      </div>
    </div>
  );
}