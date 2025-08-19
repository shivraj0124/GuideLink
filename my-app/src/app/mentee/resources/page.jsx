"use client";

import { BookOpen, Video, FileText, Link as LinkIcon } from "lucide-react";
import MenteeSidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthProvider";
export default function ResourcesPage() {
    const { menteeCollapsed } = useAuth(); 
  const resources = [
    {
      id: 1,
      title: "React Documentation",
      type: "article",
      description: "The official React docs with examples and guides.",
      link: "https://react.dev",
    },
    {
      id: 2,
      title: "Node.js Crash Course",
      type: "video",
      description: "A complete Node.js crash course for beginners.",
      link: "https://youtube.com",
    },
    {
      id: 3,
      title: "Data Structures Handbook",
      type: "pdf",
      description: "A downloadable PDF guide on data structures.",
      link: "#",
    },
    {
      id: 4,
      title: "System Design Primer",
      type: "article",
      description: "A GitHub repo with resources for system design interviews.",
      link: "https://github.com/donnemartin/system-design-primer",
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "article":
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case "video":
        return <Video className="w-5 h-5 text-red-600" />;
      case "pdf":
        return <FileText className="w-5 h-5 text-green-600" />;
      default:
        return <LinkIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <MenteeSidebar />

      {/* Main Content */}
      <main className={`flex-1 p-6 text-black bg-gray-100 min-h-screen transition-all duration-300 ${menteeCollapsed ? "md:ml-20" : "md:ml-64"}`}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Learning Resources</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res) => (
            <div
              key={res.id}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-3 mb-3">
                {getIcon(res.type)}
                <h2 className="text-lg font-semibold">{res.title}</h2>
              </div>
              <p className="text-gray-600 mb-3">{res.description}</p>
              <a
                href={res.link}
                target="_blank"
                className="text-blue-600 font-medium hover:underline"
              >
                View Resource →
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
