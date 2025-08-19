"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthProvider";
import {
  Home,
  User,
  Calendar,
  MessageSquare,
  BookOpen,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
} from "lucide-react";
import toast from "react-hot-toast";

export default function MenteeSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { menteeCollapsed, setMenteeCollapsed, logout } = useAuth();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", href: "/mentee/dashboard", icon: <Home className="w-5 h-5" /> },
    { name: "Find Mentor", href: "/mentee/find-mentor", icon: <User className="w-5 h-5" /> },
    { name: "Bookings", href: "/mentee/bookings", icon: <Calendar className="w-5 h-5" /> },
    { name: "Chat", href: "/mentee/chat", icon: <MessageSquare className="w-5 h-5" /> },
    { name: "Resources", href: "/mentee/resources", icon: <BookOpen className="w-5 h-5" /> },
  ];

  // ✅ Check authentication on mount
  useEffect(() => {
    const myToken = localStorage.getItem("token");
    let myUser = localStorage.getItem("user");
    myUser = myUser ? JSON.parse(myUser) : null;

    if (!myToken || myUser?.role !== "Mentee") {
      router.push("/login");
    }
  }, [router]);

  // ✅ Logout Handler
  const handleLogOut = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <div className="flex">
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-3 fixed top-2 right-2 z-50 bg-gray-900 text-white rounded-lg"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full ${
          menteeCollapsed ? "w-20" : "w-64"
        } bg-gray-900 text-white p-5 flex flex-col transform 
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-all duration-300 ease-in-out z-40`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8 p-5">
          {!menteeCollapsed && <h1 className="text-2xl font-bold">GuideLink</h1>}
          <button
            onClick={() => setMenteeCollapsed(!menteeCollapsed)}
            className="cursor-pointer hidden md:block p-1 bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            {menteeCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="space-y-2 ">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 p-2 rounded-lg transition ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 text-gray-300"
                }`}
              >
                {item.icon}
                {!menteeCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={handleLogOut}
            className="cursor-pointer flex items-center space-x-3 p-2 rounded-lg hover:bg-red-600 transition text-gray-300 mt-4 w-full"
          >
            <LogOut className="w-5 h-5" />
            {!menteeCollapsed && <span>Logout</span>}
          </button>
        </nav>
      </aside>
    </div>
  );
}
