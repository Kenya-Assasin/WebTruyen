'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Vui lòng nhập email và mật khẩu');
      return;
    }

    // Get registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    // Add default admin and user accounts
    const defaultUsers = [
      {
        id: 'admin',
        username: 'admin',
        email: "admin@gmail.com",
        password: "123456",
        role: "admin",
        status: 'active'
      },
      {
        id: 'user',
        username: 'user',
        email: "user@gmail.com",
        password: "123456",
        role: "user",
        status: 'active'
      },
    ];

    const allUsers = [...registeredUsers, ...defaultUsers];

    // Check if email exists
    const userWithEmail = allUsers.find(u => u.email === email);
    
    if (!userWithEmail) {
      setError("Tài khoản không tồn tại");
      return;
    }

    // Check password
    if (userWithEmail.password !== password) {
      setError("Mật khẩu không đúng");
      return;
    }

    // Check if user is locked
    if (userWithEmail.status === 'locked') {
      setError("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ admin để được hỗ trợ.");
      return;
    }

    const foundUser = userWithEmail;

    // Save user to localStorage (simulate login)
    localStorage.setItem("user", JSON.stringify({
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role
    }));

    // Dispatch custom event to update Header immediately
    window.dispatchEvent(new Event("user-logged-in"));

    // Redirect based on role
    if (foundUser.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/"); // regular users go to home
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 max-w-7xl mx-auto px-6 py-6 min-h-screen animated-bg">
      <div className="w-full max-w-md">
        {/* Logo/Icon Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold gradient-text">Đăng nhập</h1>
          <p className="text-gray-600 mt-2">Tiếp tục đọc truyện ngay bây giờ</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-200 focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-200 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Đăng nhập
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Đăng ký ngay nhé!
            </Link>
          </p>
        </div>

        <p className="text-center mt-6 text-sm text-gray-500">&copy; 2026 WebTruyen. Khám phá thế giới của bạn.</p>
      </div>
    </div>
  );
};

export default LoginPage;