"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SkillsSelector({ initialSkills = [], onChange }) {
  const [skills, setSkills] = useState(initialSkills);
  const [searchTerm, setSearchTerm] = useState("");
  const [allSkills, setAllSkills] = useState([]);
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
  // Fetch skills from backend API when component loads
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(`${backend}/api/auth/get_skills`); // Your backend route
        if (res.data?.status === 200) {
          // Extract only skill names from response
          const skillNames = res.data.skills.map((s) => s.name);
          console.log("Fetched skills:", skillNames);
          setAllSkills(skillNames);
        } else {
          console.error("Failed to fetch skills:", res.data?.error);
        }
      } catch (err) {
        console.error("Error fetching skills:", err.message);
      }
    };
    fetchSkills();
  }, []);

  // Filter available skills based on search term and exclude already selected
  const filteredSkills = allSkills.filter(
    (skill) =>
      skill?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !skills.includes(skill)
  );

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      const updated = [...skills, skill];
      setSkills(updated);
      onChange(updated);
      setSearchTerm("");
      console.log("Added skill:", skills);
    }
  };

  const removeSkill = (skill) => {
    const updated = skills.filter((s) => s !== skill);
    setSkills(updated);
    onChange(updated);
  };

  return (
    <div className="p-4 border rounded-lg max-w-md">
      {/* Selected Skills */}
      <div className="flex flex-wrap gap-2 mb-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-300"
            onClick={() => removeSkill(skill)}
          >
            {skill} ✕
          </span>
        ))}
      </div>

      {/* Search / Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type a skill..."
        className="border p-2 rounded w-full mb-2"
      />

      {/* Suggestions */}
      {searchTerm && filteredSkills.length > 0 && (
        <ul className="border rounded-lg bg-white max-h-40 overflow-y-auto">
          {filteredSkills.map((skill) => (
            <li
              key={skill}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => addSkill(skill)}
            >
              {skill}
            </li>
          ))}
        </ul>
      )}

      {/* Add new skill button */}
      {searchTerm && filteredSkills.length === 0 && (
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => addSkill(searchTerm)}
        >
          Add "{searchTerm}"
        </button>
      )}
    </div>
  );
}
