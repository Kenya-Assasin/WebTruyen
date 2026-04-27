"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  type: "comic" | "text";
};

export default function ReadingHistory({ type }: Props) {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    // 🔥 chỉ thêm mock khi chưa có data
    const raw = localStorage.getItem("history");

    if (!raw || raw === "undefined") {
      const mockHistory = [
        {
          id: "1",
          title: "Hành Trình A-Res",
          cover: "https://picsum.photos/200/300?random=1",
          type: "comic",
        },
        {
          id: "2",
          title: "Bí Ẩn Hành Tinh S",
          cover: "https://picsum.photos/200/300?random=2",
          type: "text",
        },
        {
          id: "3",
          title: "Chiến Binh Không Gian",
          cover: "https://picsum.photos/200/300?random=3",
          type: "comic",
        },
      ];

      localStorage.setItem("history", JSON.stringify(mockHistory));
      setHistory(mockHistory);
      return;
    }

    try {
      const data = JSON.parse(raw);
      setHistory(Array.isArray(data) ? data : []);
    } catch {
      setHistory([]);
    }
  }, []);

  // lọc theo loại truyện
  const filteredHistory = history.filter((h) => h.type === type);

  return (
    <div className="bg-white border rounded p-3">
      <h3 className="font-bold mb-3 text-black">
        Lịch sử đọc {type === "comic" ? "truyện tranh" : "truyện chữ"}
      </h3>

      {filteredHistory.length === 0 ? (
        <div className="text-sm text-gray-500">Chưa có dữ liệu</div>
      ) : (
        <div className="space-y-2">
          {filteredHistory.map((m) => (
            <Link key={m.id} href={`/story/${m.id}`}>
              <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                <img
                  src={m.cover}
                  className="w-10 h-12 object-cover rounded"
                />

                <div className="flex-1 overflow-hidden">
                  <div className="text-sm truncate text-black">
                    {m.title}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}