"use client";

import { Table, Image, Modal, Input, Button, Divider } from "antd";
import { useEffect, useState } from "react";
import mangaService, { manga } from "@/services/manga/manga.services";
import Link from "next/link";
import MangaTop from "@/components/MangaTop";
import ReadingHistory from "@/components/ReadingHistory";
import TypeFilter from "@/components/TypeFilter";
import SideBackground from "@/components/SideBackground";
export default function MangaList() {


    
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên truyện",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Ảnh bìa",
            dataIndex: "cover",
            key: "cover",
            render: (cover: string) => <Image src={cover} alt="cover" width={100} height={140} />,
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            key: "author",
        },
        {
            title: "Thể loại",
            dataIndex: "genre",
            key: "genre",
        },
        {
            title: "Lượt xem",
            dataIndex: "view",
            key: "view",
        },
        {
            title: "Số thích",
            dataIndex: "likes",
            key: "likes",
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
        },
    ];

    const [mangas, setMangas] = useState<manga[]>([]);
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 60; // 6 cột × 5 hàng
    const [type, setType] = useState<"comic" | "text">("comic");
    // phân trang
    const start = (page - 1) * ITEMS_PER_PAGE;
    const currentData = mangas.slice(start, start + ITEMS_PER_PAGE);
    const [pageInput, setPageInput] = useState(page.toString());
    const fetchMangas = async () => {
    const data = await mangaService.getByType(type);
        setMangas(data);
        };


        useEffect (() => {
            fetchMangas();
        }, [type])

        useEffect(() => {
        setPageInput(page.toString());
        }, [page]);


        useEffect(() => {
            setPage(1);
            }, [type]);



    return (
        <div className="max-w-7xl mx-auto px-6 py-6 min-h-screen animated-bg">

            {/* Toggle */}
            <TypeFilter type={type} setType={setType} mangas={mangas} genre="" setGenre={() => {}} />



            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">


            {/* MAIN */}
            <div className="lg:col-span-3">
            {/* BACKGROUND */}
            <SideBackground />

                {/* HIỂN THỊ */}
                {type === "comic" ? (

                <>
                    {/* GRID */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-5 gap-4">
                    {currentData.map((item) => (
                        <Link key={item.id} href={`/story/${item.id}`}>
                        <div
                            className="bg-white border rounded shadow-sm cursor-pointer hover:shadow-md transition"
                        >
                            <img src={item.cover} className="w-full h-50 object-cover" />

                            <div className="p-2 text-black text-sm">
                            <div className="font-semibold truncate">{item.title}</div>
                            <div className="text-xs text-black">{item.genre}</div>
                            <div className="text-xs">👁 {item.view} | ❤️ {item.likes}</div>
                            </div>
                        </div>
                        </Link>
                    ))}
                    </div>


<div className="flex flex-col min-h-[20vh]">
                    {/* PAGINATION */}
                    <div className="flex justify-center gap-3 mt-auto py-6">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <input
                        type="text"
                        value={pageInput}
                        onChange={(e) => {
                            setPageInput(e.target.value); // cho phép xóa / nhập tự do
                        }}
                        onBlur={() => {
                            const newPage = Number(pageInput);
                            const maxPage = Math.ceil(mangas.length / ITEMS_PER_PAGE);

                            if (!isNaN(newPage) && newPage >= 1 && newPage <= maxPage) {
                            setPage(newPage);
                            } else {
                            setPageInput(page.toString()); // sai → reset lại
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                            const newPage = Number(pageInput);
                            const maxPage = Math.ceil(mangas.length / ITEMS_PER_PAGE);

                            if (!isNaN(newPage) && newPage >= 1 && newPage <= maxPage) {
                                setPage(newPage);
                            } else {
                                setPageInput(page.toString());
                            }
                            }
                        }}
                        className="w-16 text-center border rounded px-2 py-1"
                    />

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={start + ITEMS_PER_PAGE >= mangas.length}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                    </div>
                </div>
                </>

                ) : (

                <Table
                    dataSource={mangas}
                    columns={columns}
                    scroll={{ x: 800 }}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />

                )}

            </div>

            {/* SIDEBAR */}
            <div className="space-y-6">

                {/* TOP */}
                <MangaTop mangas={mangas} type={type} />

                {/* LỊCH SỬ */}
                <ReadingHistory type={type} />
            </div>
    </div>
</div>


    );
}
