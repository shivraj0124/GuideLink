"use client";

import { useState, useRef, useEffect } from "react";
import { Send, MessageSquare } from "lucide-react";
import MenteeSidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthProvider";

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const { menteeCollapsed } = useAuth(); 

  // Dummy conversations
  const chats = [
    { id: 1, name: "John Doe", lastMessage: "See you tomorrow!" },
    { id: 2, name: "Sarah Smith", lastMessage: "Thanks for the resources." },
    { id: 3, name: "Raj Kumar", lastMessage: "Let's schedule a session." },
    { id: 4, name: "Pawan Kumar", lastMessage: "Let's schedule a session." },
  ];

  // ✅ Make messages stateful
  const [messages, setMessages] = useState([
    { id: 1, sender: "mentor", text: "Hello, how can I help you?" },
    { id: 2, sender: "mentee", text: "I need guidance in React." },
    { id: 3, sender: "mentor", text: "Sure, let's start with basics." },
  ]);

  // Ref for auto-scroll
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change or chat changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedChat]);

  const handleSend = () => {
    if (message.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      sender: "mentee",
      text: message,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div className="flex bg-white">
      {/* Sidebar */}
      <MenteeSidebar />

      {/* Chat Main Area */}
      <main
        className={`flex-1 p-6 min-h-screen flex text-black ${
          menteeCollapsed ? "md:ml-20" : "md:ml-64"
        } transition-all duration-300`}
      >
        {/* Left Panel: Chats List */}
        <div className="w-1/4 bg-gradient-to-b from-blue-200 via-gray-100 to-blue-100 rounded-xl shadow-md overflow-y-auto hidden md:block">
          <h2 className="text-lg font-bold p-4 border-b border-blue-100">
            Conversations
          </h2>
          <ul>
            {chats.map((chat) => (
              <li
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 cursor-pointer border-b border-blue-200 hover:bg-gray-50 ${
                  selectedChat === chat.id ? "bg-blue-100" : ""
                }`}
              >
                <p className="font-semibold">{chat.name}</p>
                <p className="text-sm text-gray-500">{chat.lastMessage}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Panel: Chat Window */}
        <div className="flex-1 flex flex-col bg-gradient-to-b from-blue-200 via-gray-100 to-blue-100 rounded-xl shadow-md ml-0 md:ml-6">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-blue-300 font-bold flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>
                  {
                    chats.find((chat) => chat.id === selectedChat)?.name ||
                    "Chat"
                  }
                </span>
              </div>

              {/* Messages */}
              <div className="flex flex-col p-4 py-6 h-[76vh] overflow-y-auto scroll-auto no-scrollbar space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "mentee" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-xl max-w-xs ${
                        msg.sender === "mentee"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Invisible element to scroll into view */}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Box */}
              <div className="p-4 border-t border-blue-300 flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-blue-300 rounded-xl outline-none"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()} // send on Enter
                />
                <button
                  onClick={handleSend}
                  className="ml-3 p-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
