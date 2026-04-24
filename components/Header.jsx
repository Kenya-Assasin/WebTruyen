"use client";

import Link from "next/link";
import { useState } from "react";



export default function Header() {
  const [search, setSearch] = useState("");

  const [stories, setStories] = useState([]); // rỗng

  const filteredStories = stories.filter((story) =>
   story.title.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <header className="w-full shadow-md bg-white px-4 py-3 flex items-center justify-between">
      
      {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          <span className="logo-gradient">WebTruyen</span>
        </Link>

        

      {/* Menu */}
      <nav className="flex gap-6 text-black font-medium">
        <Link href="/">Home</Link>
        <Link href="/browse">Browse</Link>
        <Link href="/write">Write</Link>

      </nav>

      {/* Search */}
      <div className="relative">
        <div className="border-2 border-gray-400 rounded-md px-3 py-1 flex items-center bg-white">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none text-black w-48"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {search && (
          <div className="absolute top-12 left-0 bg-white border w-full shadow-md z-50">
            {filteredStories.length > 0 ? (
              filteredStories.map((story) => (
                <div
                  key={story.id}
                  className="p-2 text-gray-900 hover:bg-gray-100 cursor-pointer"
                >
                  {story.title}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">Không tìm thấy</div>
            )}
          </div>
        )}
      </div>

      {/* User */}
      <div>
        <Link href="/profile" className="text-black font-medium">Login</Link>
      </div>


      
    </header>

    
  );
}
