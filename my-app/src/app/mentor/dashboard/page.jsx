"use client";

import { useAuth } from "@/context/AuthProvider";
import MentorSidebar from "@/components/SidebarMentor";
import { CalendarDays, Users, MessageSquare } from "lucide-react";

export default function MentorDashboard() {
  const { mentorCollapsed, user } = useAuth();

  return (
    <div className="flex">
      <MentorSidebar />
      <main
        className={`flex-1 p-6 ${
          mentorCollapsed ? "md:ml-20" : "md:ml-64"
        } transition-all duration-300 bg-gray-100 min-h-screen`}
      >
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
          Welcome back,{" "}
          <span className="text-blue-600">
            {user?.username || "Mentor"}
          </span>{" "}
          👋
        </h1>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upcoming Sessions */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Upcoming Sessions</h2>
                <p className="text-3xl font-bold mt-2">3</p>
              </div>
              <CalendarDays className="w-12 h-12 opacity-80" />
            </div>
          </div>

          {/* Mentees Count */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Mentees</h2>
                <p className="text-3xl font-bold mt-2">12</p>
              </div>
              <Users className="w-12 h-12 opacity-80" />
            </div>
          </div>

          {/* Messages */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Messages</h2>
                <p className="text-3xl font-bold mt-2">5</p>
              </div>
              <MessageSquare className="w-12 h-12 opacity-80" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
