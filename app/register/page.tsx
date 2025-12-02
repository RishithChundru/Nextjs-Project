'use client';
import { useState } from 'react';
import api from '../../lib/axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  function update(key: string, value: string) {
    setForm({ ...form, [key]: value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      setLoading(true);
      await api.post('/auth/register', form);

      toast.success('Account created Successfully. Please login now');
      router.push('/login');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Registration failed');
    }

    setLoading(false);
  }

  return (
    <div className="flex justify-center items-center h-[80vh] px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="w-full p-3 bg-gray-100 rounded-lg mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="w-full p-3 bg-gray-100 rounded-lg mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your mail Id"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              required
              type="password"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              className="w-full p-3 bg-gray-100 rounded-lg mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Minimum 8 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-700 active:scale-95 transition"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/login')}
            className="text-orange-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
    