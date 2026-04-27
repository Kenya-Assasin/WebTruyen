"use client";

import Link from "next/link";

type Props = {
  history: any[];
  type: "comic" | "text";
};

export default function ReadingHistory({ history, type }: Props) {
  const filteredHistory = (history || []).filter(
    (h) => h.type === type
  );

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      
      {/* HEADER */}
      <h3 className="font-bold mb-3 text-black text-base">
        Lịch sử đọc{" "}
        {type === "comic" ? "truyện tranh" : "truyện chữ"}
      </h3>

      {/* EMPTY */}
      {filteredHistory.length === 0 ? (
        <div className="text-sm text-gray-500 italic">
          Chưa có dữ liệu
        </div>
      ) : (
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">

          {filteredHistory.map((m: any) => (
            <Link key={m.id} href={`/story/${m.id}`}>
              <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition cursor-pointer">

                {/* COVER */}
                <img
                  src={m.cover}
                  className="w-10 h-14 object-cover rounded shadow-sm"
                />

                {/* INFO */}
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-medium text-black truncate">
                    {m.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    👁 {m.view || 0}
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