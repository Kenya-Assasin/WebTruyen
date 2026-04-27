export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10 border-t">
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">

        {/* Logo + mô tả */}
        <div>
          <h2 className="text-lg font-bold text-black">WebTruyen</h2>
          <p className="mt-2">
            Nền tảng đọc và sáng tác truyện chữ, truyện tranh.
          </p>
        </div>

        {/* Điều hướng */}
        <div>
          <h3 className="font-semibold text-black mb-2">Liên kết</h3>
          <ul className="space-y-1">
            <li><a href="/" className="hover:font-semibold">Trang chủ</a></li>
            <li><a href="/browse" className="hover:font-semibold">Khám phá</a></li>
            <li><a href="/top" className="hover:font-semibold">Top truyện</a></li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h3 className="font-semibold text-black mb-2">Liên hệ</h3>
          <p>Email: support@webtruyen.com</p>
          <p>Facebook: WebTruyen</p>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-xs py-3 border-t">
        © 2026 WebTruyen. All rights reserved.
      </div>
    </footer>
  );
}