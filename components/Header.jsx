"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [search, setSearch] = useState("");
  const [stories, setStories] = useState([]); // dữ liệu rỗng
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
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

  // Đóng user menu khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

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
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/login" className="text-black font-medium hover:text-blue-600">
              Đăng nhập
            </Link>
            <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Đăng ký
            </Link>
          </div>
        )}

        {/* đã login */}
        {user && (
          <div className="relative hidden sm:block user-menu-container">
            {/* Avatar trigger */}
            <div 
              className="cursor-pointer flex items-center gap-2"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span className="text-black font-medium">{user.username}</span>
              <span className={`text-gray-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}>▼</span>
            </div>

            {/* Dropdown menu - show when userMenuOpen is true */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg z-50 rounded-lg">
                <div className="py-2">
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 text-black text-sm">
                    👤 Hồ sơ
                  </Link>

                  <Link href="/history" className="block px-4 py-2 hover:bg-gray-100 text-black text-sm">
                    📚 Lịch sử đọc
                  </Link>

                  <Link href="/bookmarks" className="block px-4 py-2 hover:bg-gray-100 text-black text-sm">
                    ❤️ Đã lưu
                  </Link>

                  {user.role === "user" && (
                    <Link href="/write" className="block px-4 py-2 hover:bg-gray-100 text-black text-sm">
                      ✍️ Sáng tác
                    </Link>
                  )}

                  {user.role === "admin" && (
                    <Link href="/admin" className="block px-4 py-2 hover:bg-gray-100 text-black text-sm">
                      ⚙️ Quản trị
                    </Link>
                  )}

                  <div className="border-t my-1"></div>

                  <div
                    onClick={() => {
                      handleLogout();
                      setUserMenuOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer text-sm"
                  >
                    🚪 Đăng xuất
                  </div>
                </div>
              </div>
            )}
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
          <>
            <Link href="/login" className="block p-3 border-b text-gray-900 font-medium">
              Đăng nhập
            </Link>
            <Link href="/register" className="block p-3 text-gray-900 font-medium">
              Đăng ký
            </Link>
          </>
        ) : (
          <>
            {/* User info in mobile menu */}
            <div className="p-3 border-b bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-black">{user.username}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                </div>
              </div>
            </div>

            <Link href="/profile" className="block p-3 border-b text-gray-900 font-medium">
              👤 Hồ sơ
            </Link>

            <Link href="/history" className="block p-3 border-b text-gray-900 font-medium">
              📚 Lịch sử đọc
            </Link>

            <Link href="/bookmarks" className="block p-3 border-b text-gray-900 font-medium">
              ❤️ Đã lưu
            </Link>

            {user.role === "user" && (
              <Link href="/write" className="block p-3 border-b text-gray-900 font-medium">
                ✍️ Sáng tác
              </Link>
            )}

            {user.role === "admin" && (
              <Link href="/admin" className="block p-3 border-b text-gray-900 font-medium">
                ⚙️ Quản trị
              </Link>
            )}

            <div
              onClick={() => {
                handleLogout();
                setMenuOpen(false); // Close mobile menu after logout
              }}
              className="block p-3 text-red-600 font-medium cursor-pointer"
            >
              🚪 Đăng xuất
            </div>
          </>
        )}
      </div>
    )}
    </header>
  );
}