
"use client";
import { CalendarDays, Users, MessageSquare } from "lucide-react";
import MenteeSidebar from "../../../components/Sidebar";
import { useAuth } from "../../../context/AuthProvider";
export default function MenteeDashboard() {
   const { user, login,menteeCollapsed } = useAuth();
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <MenteeSidebar />

      {/* Main Content */}
      <main className={`flex-1 p-6 transition-all duration-300 ${menteeCollapsed ? "md:ml-20" : "md:ml-64"}`}>
       <h1 className="text-4xl font-bold text-black  bg-clip-text  mb-2">
  Hello, {user?.username || "Mentee"} 👋
</h1>
<p className="text-lg text-gray-600 mb-6">
  Welcome back! Let’s continue your journey towards success 🚀
</p>

        {/* Example dashboard cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black">
      {/* Upcoming Sessions */}
      <div className="bg-gradient-to-r from-blue-500  to-blue-200 text-white shadow-lg rounded-xl p-5 ">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold mb-2">Upcoming Sessions</h2>
          <CalendarDays className="w-6 h-6 text-blue-500 "  />
        </div>
        <p className="text-sm opacity-90">You have 2 sessions this week.</p>
      </div>

      {/* Mentor Suggestions */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-100 text-white shadow-lg rounded-xl p-5 ">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold mb-2">Mentor Suggestions</h2>
          <Users className="w-6 h-6 text-green-500" />
        </div>
        <p className="text-sm opacity-90">3 new mentors match your interests.</p>
      </div>

      {/* Messages */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-100 text-white shadow-lg rounded-xl p-5 ">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold mb-2">Messages</h2>
          <MessageSquare className="w-6 h-6 text-pink-500" />
        </div>
        <p className="text-sm opacity-90">You have 5 unread messages.</p>
      </div>
    </div>
      </main>
    </div>
  );
}
