"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {useAuth}  from "../context/AuthProvider";
import { LuUserRound } from "react-icons/lu";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  console.log(user);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1
          className="text-2xl font-bold text-blue-700 cursor-pointer"
          onClick={() => router.push("/")}
        >
          GuideLink
        </h1>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="w-6 h-6 text-blue-700" />
            ) : (
              <Menu className="w-6 h-6 text-blue-700" />
            )}
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {user ? (
            <div className="flex justify-between gap-4">
              <div
                className="flex items-center gap-2 cursor-pointer text-black"
                onClick={() => router.push("/profile")}
              >
                <LuUserRound size={24} />
                <span className="font-semibold text-black">{user?.username}</span>
              </div>
            </div>
          ) : (
            <a
              onClick={() => router.push("/login")}
              className="text-white bg-blue-600 cursor-pointer px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </a>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col space-y-3">
          {user ? (
            <div className="flex justify-between">
              <div
                className="flex items-center gap-2 text-black"
                onClick={() => router.push("/profile")}
              >
                <LuUserRound size={24} />
                <span className="font-semibold text-black">{user?.username}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="text-black bg-blue-600 px-4 py-1 rounded cursor-pointer hover:bg-blue-700 w-max"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
