"use client";

import { useAuth } from "@/components/context/Authprovider";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
export default function Profile() {
  const { user,logout } = useAuth();
const router = useRouter();
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-600">Loading profile...</p>
      </div>
    );
  }
  const handleLogout =()=>{
    logout()
    router.push("/");
  }
  return (
    <div>
        <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-red-50 to-blue-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="w-28 h-28 rounded-full flex items-center justify-center bg-indigo-500 text-white text-5xl font-bold shadow-lg">
  {user?.username?.charAt(0).toUpperCase()}
        </div>
        </div>

        {/* Name & Role */}
        <div className="text-center mt-4">
          <h1 className="text-2xl font-bold text-gray-800">{user?.username}</h1>
          <p className="text-indigo-500 font-medium">{user?.role}</p>
        </div>
        

        {/* Info Card */}
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-gray-800 font-medium">{user?.email}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">User ID</p>
            <p className="text-gray-800 font-medium">{user?.id}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-between">
          <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-600 transition cursor-pointer">
            Edit Profile
          </button>
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 transition cursor-pointer" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
