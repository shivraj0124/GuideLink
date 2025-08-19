"use client";

import { useAuth } from "../../../context/AuthProvider";
import { CalendarDays, Video, CheckCircle2, XCircle } from "lucide-react";
import MenteeSidebar from "../../../components/Sidebar";

export default function BookingsPage() {
  const { menteeCollapsed } = useAuth(); // 🔥 get sidebar state

  const bookings = [
    { id: 1, mentor: "John Doe", expertise: "Web Development", date: "2025-08-21", time: "5:00 PM", status: "upcoming" },
    { id: 2, mentor: "Sarah Smith", expertise: "Data Science", date: "2025-08-15", time: "7:00 PM", status: "completed" },
    { id: 3, mentor: "Raj Kumar", expertise: "Cybersecurity", date: "2025-08-10", time: "6:00 PM", status: "cancelled" },
  ];

  return (
    <div className="flex">
      <MenteeSidebar />
      <main
        className={`flex-1 p-6 bg-gray-100 min-h-screen transition-all duration-300
        ${menteeCollapsed ? "md:ml-20" : "md:ml-64"}`}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h1>
        {/* bookings table same as before */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden text-black">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3">Mentor</th>
                <th className="p-3">Expertise</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="p-3 font-semibold">{booking.mentor}</td>
                  <td className="p-3">{booking.expertise}</td>
                  <td className="p-3 flex items-center space-x-2">
                    <CalendarDays className="w-4 h-4 text-gray-500" />
                    <span>{booking.date}</span>
                  </td>
                  <td className="p-3">{booking.time}</td>
                  <td className="p-3">
                    {booking.status === "upcoming" && (
                      <span className="flex items-center text-blue-600 font-medium">
                        <CalendarDays className="w-4 h-4 mr-1" /> Upcoming
                      </span>
                    )}
                    {booking.status === "completed" && (
                      <span className="flex items-center text-green-600 font-medium">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Completed
                      </span>
                    )}
                    {booking.status === "cancelled" && (
                      <span className="flex items-center text-red-600 font-medium">
                        <XCircle className="w-4 h-4 mr-1" /> Cancelled
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {booking.status === "upcoming" ? (
                      <button className="cursor-pointer flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        <Video className="w-4 h-4 mr-2" /> Join Session
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">No action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      
    </div>
  );
}
