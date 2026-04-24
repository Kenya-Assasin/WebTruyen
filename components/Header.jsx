"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className="w-full shadow-md bg-white px-6 py-3 flex items-center justify-between">
      
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        MyStory
      </Link>

      {/* Menu */}
      <nav className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/browse">Browse</Link>
        <Link href="/write">Write</Link>
      </nav>

      {/* Search */}
      <div className="flex items-center border px-2 py-1 rounded">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* User */}
      <div>
        <Link href="/profile">Login</Link>
      </div>
    </header>
  );
}
