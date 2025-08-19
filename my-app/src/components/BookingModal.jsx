"use client";

import { useState } from "react";

export default function BookingModal({ mentor, onClose }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleConfirm = () => {
    if (!date || !time) {
      alert("Please select date & time");
      return;
    }
    console.log(`Booked session with ${mentor.name} on ${date} at ${time}`);
    alert(`Session booked with ${mentor.name}! ✅`);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center 
  bg-black/40 backdrop-blur-lg border border-gray-700/30 shadow-xl z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg text-black">
        <h2 className="text-2xl font-bold mb-4">Book Session</h2>
        <p className="mb-2">Mentor: <strong>{mentor.name}</strong></p>
        <p className="mb-4 text-gray-600">{mentor.expertise}</p>

        <label className="block mb-2 font-semibold">Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <label className="block mb-2 font-semibold">Select Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
