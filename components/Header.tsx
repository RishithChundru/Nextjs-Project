"use client";

import Link from "next/link";
import { useStore } from "../stores/useStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const { token, logout, role } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-black text-white shadow"
        : "text-black hover:bg-orange-100"
    }`;

  return (
    <header className="sticky top-0 z-50 shadow bg-orange-500 border-b backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-black">
          VictoryShop
        </Link>

        <nav className="flex items-center gap-3">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>

          {role !== "ADMIN" && (
            <Link href="/cart" className={linkClass("/cart")}>
              Cart
            </Link>
          )}

          {role !== "ADMIN" && token && (
            <Link href="/orders" className={linkClass("/orders")}>
              Orders
            </Link>
          )}

          {role === "ADMIN" && token && (
            <Link href="/admin/orders" className={linkClass("/admin/orders")}>
              Orders
            </Link>
          )}

          {role === "ADMIN" && (
            <Link href="/admin" className={linkClass("/admin")}>
              Admin
            </Link>
          )}
        </nav>

        <div>
          {!token ? (
            <div className="flex gap-3">
              <Link
                href="/login"
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                Register
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="px-4 py-3 bg-black text-white rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
