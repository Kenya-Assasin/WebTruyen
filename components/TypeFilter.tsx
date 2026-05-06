"use client";

import { useMemo, useEffect } from "react";

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

  // Lấy danh sách genre
  const genres = useMemo(() => {
    return Array.from(
      new Set(
        (mangas || [])
          .map((m) => m.genre)
          .filter(Boolean)
      )
    ) as string[];
  }, [mangas]);

  // ✅ set mặc định genre đầu tiên
  useEffect(() => {
    if (genres.length > 0 && !genre) {
      setGenre(genres[0]);
    }
  }, [genres]);

  return (
    <div className="mb-6 space-y-3">

      {/* TYPE */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            setType("comic");
            setGenre(""); // reset để useEffect chọn lại mặc định
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
            setGenre(""); // reset để useEffect chọn lại mặc định
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
      <div className="overflow-x-auto pb-2">
        <div className="flex flex-nowrap gap-2 min-w-max">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)} // ✅ chỉ chọn từ list
              className={`px-3 py-1 rounded text-sm whitespace-nowrap ${
                genre === g
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}