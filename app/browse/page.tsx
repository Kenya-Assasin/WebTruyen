"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import TypeFilter from "@/components/TypeFilter";
import SideBackground from "@/components/SideBackground";

const ITEMS_PER_PAGE = 12;

type Manga = {
  id: string;
  title: string;
  type: "comic" | "text";
  genre?: string;
  cover: string;
  view: number;
  likes: number;
};

export default function BrowsePage() {
  const [type, setType] = useState<"comic" | "text">("comic");

  // ✅ multi-select
  const [genresSelected, setGenresSelected] = useState<string[]>([]);

  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");

  // 🔥 Fake data (sau này thay API)
  const mangas: Manga[] = [
    {
      id: "1",
      title: "Dark Mage",
      type: "comic",
      genre: "Fantasy",
      cover: "/test.jpg",
      view: 1200,
      likes: 300,
    },
    {
      id: "2",
      title: "School Life",
      type: "text",
      genre: "Slice of Life",
      cover: "/test.jpg",
      view: 800,
      likes: 120,
    },
    {
      id: "3",
      title: "Sword Master",
      type: "comic",
      genre: "Action",
      cover: "/test.jpg",
      view: 5000,
      likes: 900,
    },
    // thêm data tùy ý
  ];

  // ✅ filter theo type
  const filteredByType = useMemo(() => {
    return mangas.filter((m) => m.type === type);
  }, [mangas, type]);

  // ✅ filter theo multi-genre
  const filtered = useMemo(() => {
    return genresSelected.length === 0
      ? filteredByType
      : filteredByType.filter((m) =>
          genresSelected.includes(m.genre!)
        );
  }, [filteredByType, genresSelected]);

  // pagination
  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentData = filtered.slice(start, start + ITEMS_PER_PAGE);

  const maxPage = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  // sync input
  const handleBlur = () => {
    const newPage = Number(pageInput);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= maxPage) {
      setPage(newPage);
    } else {
      setPageInput(page.toString());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleBlur();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 min-h-screen animated-bg">

      {/* FILTER */}
      <TypeFilter
        type={type}
        setType={setType}
        mangas={filteredByType}
        genre=""
        setGenre={() => {}}
      />

      {/* LIST */}
      <div className="flex-1">

        {currentData.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            Không có dữ liệu
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {currentData.map((item) => (
              <Link key={item.id} href={`/story/${item.id}`}>
                <div className="bg-white border rounded shadow-sm cursor-pointer hover:shadow-md transition">
                  <img
                    src={item.cover}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-3 text-black">
                    <div className="font-semibold text-base truncate">
                      {item.title}
                    </div>
                    <div className="text-sm">{item.genre}</div>
                    <div className="text-sm">
                      👁 {item.view} | ❤️ {item.likes}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

            {/* BACKGROUND */}
            <SideBackground />

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 py-4 mt-auto">
        <button
          onClick={() => {
            setPage((p) => Math.max(1, p - 1));
            setPageInput((page - 1).toString());
          }}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <input
          type="text"
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-16 text-center border rounded px-2 py-1"
        />

        <span className="flex items-center text-sm">
          / {maxPage}
        </span>

        <button
          onClick={() => {
            setPage((p) => Math.min(maxPage, p + 1));
            setPageInput((page + 1).toString());
          }}
          disabled={page === maxPage}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>
  );
}