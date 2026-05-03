"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">

      {/* Background aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,0,255,0.25),black_70%)]" />

      {/* Crack effect */}
      <div className="absolute inset-0 opacity-20 bg-[url('/crack.png')] bg-cover" />

      {/* Floating particles */}
      <div className="absolute inset-0 animate-pulse opacity-30">
        <div className="w-full h-full bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">

        {/* Title */}
        <h1 className="text-7xl md:text-9xl font-extrabold tracking-widest text-purple-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
          404
        </h1>

        {/* Subtitle */}
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-200">
          Reality has fractured
        </h2>

        <p className="mt-3 text-gray-400 max-w-md mx-auto">
          Trang bạn tìm đã biến mất khỏi dòng chảy của thê giới.
          Có thể nó chưa từng tồn tại.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            href="/"
            className="px-6 py-2 bg-purple-700 hover:bg-purple-800 rounded-lg transition shadow-lg shadow-purple-900/50"
          >
            Trở về thế giới chính
          </Link>

          <Link
            href="/browse"
            className="px-6 py-2 border border-purple-500 hover:bg-purple-500 hover:text-black rounded-lg transition"
          >
            Khám phá thực tại khác
          </Link>

        </div>

        {/* Flavor text */}
        <div className="mt-10 text-xs text-gray-500 italic">
          [ERROR CODE: LOST_IN_VOID]
        </div>
      </div>
    </div>
  );
}