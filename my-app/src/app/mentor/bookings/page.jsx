"use client";

import { CalendarDays, CheckCircle2, XCircle, Video, Clock, Plus} from "lucide-react";
import MentorSidebar from "@/components/SidebarMentor";
import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuAlarmClock } from "react-icons/lu";
export default function MentorBookingsPage() {
  const { mentorCollapsed } = useAuth();

  // Bookings by mentees
  const [bookings, setBookings] = useState([
    {
      id: 1,
      mentee: "Shivraj Kolwankar",
      topic: "React Basics",
      date: "2025-08-22",
      time: "6:00 PM",
      status: "pending",
    },
    {
      id: 2,
      mentee: "Aarav Mehta",
      topic: "DSA in C++",
      date: "2025-08-20",
      time: "4:00 PM",
      status: "approved",
    },
  ]);

  // ✅ Available slots added by mentor
  const [availableSlots, setAvailableSlots] = useState([
    { id: 1, date: "2025-08-25", time: "5:00 PM", topic: "Web Development" },
  ]);

  // Input states
  const [newSlot, setNewSlot] = useState({ date: "", time: "", topic: "" });

  // Handle Approve / Cancel
  const updateStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  // Add availability slot
  const addSlot = () => {
    if (!newSlot.date || !newSlot.time || !newSlot.topic) return alert("Fill all fields!");

    setAvailableSlots([
      ...availableSlots,
      { id: availableSlots.length + 1, ...newSlot },
    ]);
    setNewSlot({ date: "", time: "", topic: "" }); // reset form
  };

  return (
    <div className="flex">
      <MentorSidebar />

      <main
        className={`flex-1 p-6 ${
          mentorCollapsed ? "md:ml-20" : "md:ml-64"
        } transition-all duration-300 bg-gray-100 min-h-screen text-black`}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h1>

        {/* ---- Add Availability ---- */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Plus className="w-5 h-5 mr-2 text-blue-600" /> Add Availability
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="date"
              value={newSlot.date}
              onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="time"
              value={newSlot.time}
              onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Topic"
              value={newSlot.topic}
              onChange={(e) => setNewSlot({ ...newSlot, topic: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <button
              onClick={addSlot}
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Slot
            </button>
          </div>

          {/* List of available slots */}
          {availableSlots.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Your Available Slots</h3>
              <ul className="space-y-2">
                {availableSlots.map((slot) => (
                  <li
                    key={slot.id}
                    className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                  >
                    <span className="flex justify-center items-center space-x-2">
                     <FaRegCalendarAlt color="blue"/> <span> {slot.date}</span><span>  {slot.time}</span> — <span className="font-bold ml-2">{slot.topic}</span>
                    </span>
                    <button
                      onClick={() =>
                        setAvailableSlots((prev) =>
                          prev.filter((s) => s.id !== slot.id)
                        )
                      }
                      className="cursor-pointer text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ---- Mentee Bookings ---- */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden text-black">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3">Mentee</th>
                <th className="p-3">Topic</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="p-3 font-semibold">{booking.mentee}</td>
                  <td className="p-3">{booking.topic}</td>
                  <td className="p-3 flex items-center space-x-2">
                    <CalendarDays className="w-4 h-4 text-gray-500" />
                    <span>{booking.date}</span>
                  </td>
                  <td className="p-3 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{booking.time}</span>
                  </td>
                  <td className="p-3">
                    {booking.status === "pending" && (
                      <span className="flex items-center text-yellow-600 font-medium">
                        <Clock className="w-4 h-4 mr-1" /> Pending
                      </span>
                    )}
                    {booking.status === "approved" && (
                      <span className="flex items-center text-green-600 font-medium">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Approved
                      </span>
                    )}
                    {booking.status === "cancelled" && (
                      <span className="flex items-center text-red-600 font-medium">
                        <XCircle className="w-4 h-4 mr-1" /> Cancelled
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center space-x-2">
                    {booking.status === "pending" ? (
                      <>
                        <button
                          onClick={() => updateStatus(booking.id, "approved")}
                          className="cursor-pointer px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(booking.id, "cancelled")}
                          className="cursor-pointer px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      </>
                    ) : booking.status === "approved" ? (
                      <button className="cursor-pointer flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        <Video className="w-4 h-4 mr-2" /> Start Session
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
