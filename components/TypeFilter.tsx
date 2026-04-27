"use client";

import { useMemo } from "react";

type Manga = {
  id: string;
  title: string;
  type: "comic" | "text";
  genre?: string;
};

type Props = {
  type: "comic" | "text";
  setType: (t: "comic" | "text") => void;
  mangas: Manga[];
  genre: string;
  setGenre: (g: string) => void;
};

export default function TypeFilter({
  type,
  setType,
  mangas,
  genre,
  setGenre,
}: Props) {

  // 🔥 chỉ lấy genre từ mangas hiện tại (đã đúng type từ API)
  const genres = useMemo(() => {
    const safeMangas = mangas || [];

    return Array.from(
      new Set(
        safeMangas
          .map((m) => m.genre)
          .filter(Boolean)
      )
    );
  }, [mangas]);

  return (
    <div className="mb-6 space-y-3">

      {/* TYPE */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            setType("comic");
            setGenre("");
          }}
          className={`px-4 py-1 rounded ${
            type === "comic"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Truyện tranh
        </button>

        <button
          onClick={() => {
            setType("text");
            setGenre("");
          }}
          className={`px-4 py-1 rounded ${
            type === "text"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Truyện chữ
        </button>
      </div>

      {/* GENRE */}
      <div className="flex flex-wrap gap-2">
        {genres.length > 0 && (
          <>
            <button
              onClick={() => setGenre("")}
              className={`px-3 py-1 rounded text-sm ${
                genre === ""
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              Tất cả
            </button>

            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g!)}
                className={`px-3 py-1 rounded text-sm ${
                  genre === g
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {g}
              </button>
            ))}
          </>
        )}
      </div>

    </div>
  );
}