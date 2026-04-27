"use client";

import { Table, Image, Modal, Input, Button, Divider } from "antd";
import { useEffect, useState } from "react";
import mangaService, { manga } from "@/services/manga/manga.services";
import Link from "next/link";
import MangaTop from "@/components/MangaTop";
import ReadingHistory from "@/components/ReadingHistory";
import TypeFilter from "@/components/TypeFilter";
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
            dataIndex: "type",
            key: "type",
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
    const ITEMS_PER_PAGE = 30; // 6 cột × 5 hàng
    const [type, setType] = useState<"comic" | "text">("comic");
    // phân trang
    const start = (page - 1) * ITEMS_PER_PAGE;
    const [history, setHistory] = useState<any[]>([]);
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
        const data = JSON.parse(localStorage.getItem("history") || "[]");
        setHistory(data);
        }, []);

    useEffect(() => {
        setPage(1);
        }, [type]);



    return (
        <div className="max-w-7xl mx-auto px-6 py-6">

            {/* Toggle */}
            <TypeFilter type={type} setType={setType} mangas={mangas} genre="" setGenre={() => {}} />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6"></div>


            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">



                

            {/* MAIN */}
            <div className="lg:col-span-3">

                {/* HIỂN THỊ */}
                {type === "comic" ? (

                <>
                    {/* GRID */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {currentData.map((item) => (
                        <Link key={item.id} href={`/story/${item.id}`}>
                        <div
                            onClick={() => {
                            const old = JSON.parse(localStorage.getItem("history") || "[]");

                            const newHistory = [
                                item,
                                ...old.filter((i: any) => i.id !== item.id),
                            ].slice(0, 20);

                            localStorage.setItem("history", JSON.stringify(newHistory));
                            }}
                            className="bg-white border rounded shadow-sm cursor-pointer hover:shadow-md transition"
                        >
                            <img src={item.cover} className="w-full h-40 object-cover" />

                            <div className="p-2 text-black text-sm">
                            <div className="font-semibold truncate">{item.title}</div>
                            <div className="text-xs text-black">{item.author}</div>
                            <div className="text-xs">👁 {item.view} | ❤️ {item.likes}</div>
                            </div>
                        </div>
                        </Link>
                    ))}
                    </div>

                    {/* PAGINATION */}
                    <div className="flex justify-center gap-3 mt-6">
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
                </>

                ) : (

                <Table
                    dataSource={mangas}
                    columns={columns}
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
                <ReadingHistory history={history} type={type} />

            </div>
    </div>
</div>


    );
}
