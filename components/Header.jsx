"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [search, setSearch] = useState("");
  const [stories, setStories] = useState([]); // dữ liệu rỗng
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const activeClass = (path) =>
  pathname === path
    ? "text-blue-600 font-bold"
    : "text-gray-900 font-medium hover:font-bold";

  // lấy user từ localStorage

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUser(data);
  }, []);

  const filteredStories = (stories || []).filter((story) =>
    story.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  

  return (
    <header className="w-full shadow-md bg-white px-4 py-3 flex items-center justify-between relative">

      {/* Logo */}
      <Link href="/" className="text-2xl font-bold">
        <span className="logo-gradient">WebTruyen</span>
      </Link>

      {/* MENU DESKTOP */}
      <nav className="hidden md:flex gap-6 text-black font-medium">
        <Link href="/" className={`${activeClass("/")} transition-all duration-200`}>
          Trang chủ
        </Link>

        <Link href="/browse" className={`${activeClass("/browse")} transition-all duration-200`}>
          Khám phá
        </Link>

        {user?.role === "user" && (
          <Link href="/write" className={`${activeClass("/write")} transition-all duration-200`}>
            Sáng tác
          </Link>
        )}

        {user?.role === "admin" && (
          <Link href="/admin" className={activeClass("/admin")}>
            Quản trị
          </Link>
        )}
      </nav>

      {/* SEARCH */}
      <div className="relative hidden sm:block">
<div className="flex items-center border-2 border-gray-300 rounded-md px-3 py-1 bg-white
                hover:border-blue-500 focus-within:border-blue-500 
                focus-within:shadow-md transition-all">

  <span className="mr-2 text-gray-500">🔍</span>

  <input
    type="text"
    placeholder="Search..."
    className="outline-none text-black w-28 sm:w-40 md:w-48 
               focus:font-semibold"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

        {search && (
          <div className="absolute top-12 left-0 w-full bg-white border shadow-md z-50">
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

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* chưa login */}
        {!user && (
          <Link href="/login" className="hidden sm:block text-black font-medium">
            Đăng nhập
          </Link>
        )}

        {/* đã login */}
        {user && (
          <div className="relative hidden sm:block group">
            
            {/* trigger */}
            <div className="cursor-pointer font-medium text-black">
              {user.username} ▼
            </div>

            {/* dropdown */}
            <div className="absolute right-0 mt-2 w-40 bg-white border shadow-md z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all rounded">
              
              <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 text-black">
                Hồ sơ
              </Link>

              <Link href="/history" className="block px-4 py-2 hover:bg-gray-100 text-black">
                Lịch sử
              </Link>

              <Link href="/bookmarks" className="block px-4 py-2 hover:bg-gray-100 text-black">
                Đã lưu
              </Link>

              {user.role === "admin" && (
                <Link href="/admin" className="block px-4 py-2 hover:bg-gray-100 text-black">
                  Quản trị
                </Link>
              )}

              <div
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
              >
                Đăng xuất
              </div>

            </div>
          </div>
        )}

        {/* MOBILE BUTTON */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
      <div className="absolute top-full left-0 w-full bg-white border shadow-md md:hidden z-50">

        <div className="p-3 border-b">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full border rounded px-2 py-1 text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Link href="/" className={`block p-3 border-b transition-all duration-200 ${activeClass("/")}`}>
          Trang chủ
        </Link>

        <Link href="/browse" className={`block p-3 border-b transition-all duration-200 ${activeClass("/browse")}`}>
          Khám phá
        </Link>

        {user && user.role === "user" && (
          <Link href="/write" className="block p-3 border-b text-gray-900 font-medium">
            Sáng tác
          </Link>
        )}

        {user && user.role === "admin" && (
          <Link href="/admin" className="block p-3 border-b text-gray-900 font-medium">
            Quản trị
          </Link>
        )}

        {!user ? (
          <Link href="/login" className="block p-3 text-gray-900 font-medium">
            Đăng nhập
          </Link>
        ) : (
          <div
            onClick={handleLogout}
            className="block p-3 text-gray-900 font-medium cursor-pointer"
          >
            Đăng xuất
          </div>
        )}
      </div>
    )}
    </header>
  );
}