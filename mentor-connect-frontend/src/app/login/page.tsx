"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/Authprovider";
export default function LoginPage() {
  const {user,login} = useAuth()
  const router = useRouter();
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await axios.post(`${backend}/api/auth/login`, {
        email,
        password,
      });

      if (res.data.status === 200) {
        toast.success('Login successful');
        // Optionally store user data/token 
        router.push("/")
        localStorage.setItem("token", res.data.token);
        login(res.data.user)
        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log(user);
        
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(" Login failed. Please check your credentials.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-blue-200 via-blue-50 to-blue-100 ">
      <div className="p-8 bg-white shadow-xl rounded-xl w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>

        {message && <p className="text-green-600 text-sm text-center">{message}</p>}
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

         <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 cursor-pointer hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
