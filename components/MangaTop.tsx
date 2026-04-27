"use client";

import Link from "next/link";

export default function MangaTop({ mangas, type }: any) {
  const topStories = (mangas || [])
    //.filter((m: any) => m.type === type)
    .slice()
    .sort((a: any, b: any) => Number(b.view) - Number(a.view))
    .slice(0, 10);

  const maxView = topStories[0]?.view || 1;
  
  console.log("type", type);
  console.log("mangas", mangas);

  // 🎨 màu top 1–2–3
  const getRankStyle = (index: number) => {
    if (index === 0) return "text-yellow-500 font-bold"; // 🥇
    if (index === 1) return "text-gray-400 font-semibold"; // 🥈
    if (index === 2) return "text-orange-500 font-semibold"; // 🥉
    return "text-black";
  };

  return (
    
    <div className="bg-white border rounded p-4">
      <h3 className="font-bold mb-3 text-black">
        Top {type === "comic" ? "truyện tranh" : "truyện chữ"}
      </h3>

      {topStories.length === 0 ? (
        <div className="text-sm text-black">Không có dữ liệu</div>
      ) : (
        <div className="space-y-2">
          {topStories.map((m: any, index: number) => {
            const percent = (m.view / maxView) * 100;

            return (
                
              <Link key={m.id} href={`/story/${m.id}`}>
                <div className="cursor-pointer hover:opacity-80">
                  
                  {/* 🔥 title + view */}
                  <div className="flex justify-between text-sm">
                    <span className={`truncate ${getRankStyle(index)}`}>
                      {index === 0 && "🥇 "}
                      {index === 1 && "🥈 "}
                      {index === 2 && "🥉 "}
                      {index + 1}. {m.title}
                    </span>

                    <span className="text-black">👁 {m.view}</span>
                  </div>

                  {/* 🔥 progress bar */}
                  <div className="w-full bg-gray-200 h-2 rounded mt-1">
                    <div
                      className={`h-2 rounded ${
                        index === 0
                          ? "bg-yellow-400"
                          : index === 1
                          ? "bg-gray-400"
                          : index === 2
                          ? "bg-orange-400"
                          : "bg-blue-500"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}