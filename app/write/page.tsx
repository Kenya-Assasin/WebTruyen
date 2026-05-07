
"use client";

import { useState } from "react";
import Link from "next/link";
import SideBackground from "@/components/SideBackground";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("Fantasy");
  const [type, setType] = useState<"comic" | "text">("text");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Vui lòng nhập tên truyện");
      return;
    }

    const data = {
      title,
      genre,
      type,
      description,
      cover,
    };

    console.log(data);

    alert("Đăng truyện thành công");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 min-h-screen animated-bg">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Sáng tác truyện</h1>
            <p className="text-gray-400 mt-2">
              Tạo và quản lý tác phẩm của bạn
            </p>
          </div>

          <Link
            href="/browse"
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
          >
            Quay lại
          </Link>
        </div>

        {/* MAIN */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* BASIC INFO */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-5">
                Thông tin truyện
              </h2>

              <div className="space-y-5">

                {/* TITLE */}
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Tên truyện
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nhập tên truyện..."
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Mô tả
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Mô tả nội dung truyện..."
                    rows={8}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500 resize-none"
                  />
                </div>

              </div>
            </div>

            {/* BACKGROUND */}
            <SideBackground />

            {/* CHAPTER */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold">
                  Chương truyện
                </h2>

                <button className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 transition">
                  + Thêm chương
                </button>
              </div>

              <div className="space-y-4">

                <div className="border border-gray-700 rounded-lg p-4 hover:border-blue-500 transition cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">
                        Chương 1: Khởi đầu
                      </div>

                      <div className="text-sm text-gray-400 mt-1">
                        Cập nhật 2 giờ trước
                      </div>
                    </div>

                    <button className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-sm">
                      Chỉnh sửa
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* COVER */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-5">
                Ảnh bìa
              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  value={cover}
                  onChange={(e) => setCover(e.target.value)}
                  placeholder="Link ảnh bìa..."
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                />

                <div className="aspect-[3/4] rounded-lg overflow-hidden border border-gray-700 bg-black flex items-center justify-center">
                  {cover ? (
                    <img
                      src={cover}
                      alt="cover"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">
                      Preview ảnh bìa
                    </span>
                  )}
                </div>

              </div>
            </div>

            {/* SETTINGS */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-5">
                Cài đặt
              </h2>

              <div className="space-y-5">

                {/* TYPE */}
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Loại truyện
                  </label>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setType("text")}
                      className={`px-4 py-2 rounded transition ${
                        type === "text"
                          ? "bg-blue-600"
                          : "bg-gray-800"
                      }`}
                    >
                      Truyện chữ
                    </button>

                    <button
                      onClick={() => setType("comic")}
                      className={`px-4 py-2 rounded transition ${
                        type === "comic"
                          ? "bg-blue-600"
                          : "bg-gray-800"
                      }`}
                    >
                      Truyện tranh
                    </button>
                  </div>
                </div>

                {/* GENRE */}
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Thể loại
                  </label>

                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option>Fantasy</option>
                    <option>Action</option>
                    <option>Romance</option>
                    <option>Horror</option>
                    <option>Psychological</option>
                    <option>School Life</option>
                  </select>
                </div>

                {/* STATUS */}
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Trạng thái
                  </label>

                  <select className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500">
                    <option>Đang tiến hành</option>
                    <option>Hoàn thành</option>
                    <option>Tạm ngưng</option>
                  </select>
                </div>

              </div>
            </div>

            {/* ACTION */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
              <button
                onClick={handleSubmit}
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition"
              >
                Đăng truyện
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}