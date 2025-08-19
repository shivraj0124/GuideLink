"use client";

import { useState } from "react";
import { Search, Star, Calendar } from "lucide-react";
import MenteeSidebar from "../../../components/Sidebar";
import { useAuth } from "@/context/AuthProvider";
import BookingModal from "@/components/BookingModal"; // Assuming you have a BookingModal component
export default function FindMentor() {
  const [query, setQuery] = useState("");
  const { menteeCollapsed } = useAuth(); 
 const [selectedMentor, setSelectedMentor] = useState(null);
  const mentors = [
    {
      id: 1,
      name: "John Doe",
      expertise: "Web Development",
      experience: "5+ years",
      rating: 4.8,
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 2,
      name: "Sarah Smith",
      expertise: "Data Science",
      experience: "3+ years",
      rating: 4.6,
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 3,
      name: "Raj Kumar",
      expertise: "Cybersecurity",
      experience: "7+ years",
      rating: 4.9,
      image: "https://i.pravatar.cc/150?img=7",
    },
  ];

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(query.toLowerCase()) ||
      mentor.expertise.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      <MenteeSidebar />

      {/* Main Content */}
      <main className={`flex-1 p-6 ${menteeCollapsed ? "md:ml-20" : "md:ml-64"} transition-all duration-300 bg-gray-100 min-h-screen`}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Find a Mentor</h1>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-xl shadow-md p-3 mb-6 max-w-lg">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by name, skill, or expertise..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none text-black"
          />
        </div>

        {/* Mentor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold text-black">{mentor.name}</h2>
                  <p className="text-gray-600">{mentor.expertise}</p>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-2">{mentor.experience}</p>

              <div className="flex items-center text-yellow-500 mb-4">
                <Star className="w-5 h-5 fill-yellow-500" />
                <span className="ml-1 text-sm text-gray-700">
                  {mentor.rating}
                </span>
              </div>

              <button className="cursor-pointer w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={() => {setSelectedMentor(mentor) }}>
                <Calendar className="w-4 h-4 mr-2" /> Book Session
              </button>
            </div>
          ))}

          {filteredMentors.length === 0 && (
            <p className="text-gray-600">No mentors found.</p>
          )}
        </div>
      </main>

      {selectedMentor && (
          <BookingModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />
        )}

    </div>
  );
}
