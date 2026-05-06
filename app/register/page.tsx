'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    // Check if email already exists (mock check)
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userExists = existingUsers.find((user: any) => user.email === email);

    if (userExists) {
      setError('Email đã được sử dụng');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password,
      role: 'user',
      status: 'active',
      createdAt: new Date().toISOString()
    };

    // Save to localStorage (mock database)
    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

    // Auto login after registration
    localStorage.setItem('user', JSON.stringify({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role
    }));

    // Dispatch custom event to update Header immediately
    window.dispatchEvent(new Event("user-logged-in"));

    alert('Đăng ký thành công!');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Icon Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold gradient-text">Đăng ký tài khoản</h1>
          <p className="text-gray-600 mt-2">Tạo tài khoản để bắt đầu đọc truyện</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tên người dùng</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-200 focus:outline-none"
                placeholder="Nhập tên người dùng"
                required
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              Đăng ký
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Đăng nhập ngay nè!
            </Link>
          </p>
        </div>

        <p className="text-center mt-6 text-sm text-gray-500">&copy; 2026 WebTruyen. Khám phá thế giới của bạn.</p>
      </div>
    </div>
  );
};

export default RegisterPage;
