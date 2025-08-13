"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import SkillsSelector from "@/components/skillsSelector";
export default function SignupPage() {
  const router = useRouter();
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "otp" | "form">("email");
  const [otp, setOtp] = useState("");
  // const [serverMessage, toast.success] = useState("");
  // const [error, toast.error] = useState("");
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "",
  });
  const allSkillsList = [
    "JavaScript",
    "React",
    "Node.js",
    "UI/UX",
    "Python",
    "Java",
    "Mentoring",
  ];
  const handleSkillsChange = (selectedSkills) => {
    console.log("Selected skills:", selectedSkills);
    setSkills(selectedSkills);
    // You can call your API to save this in Supabase
  };
  const handleSendOtp = async () => {
    setLoading(true);
    // toast.error("");
    try {
      const res = await axios.post(`${backend}/api/auth/send-otp`, { email });
      console.log("OTP sent response:", res);

      if (res.data.status === 200) {
        toast.success(res.data.message);
        setStep("otp");
      } else {
        toast.error(res.data.error || res.data.message);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Something went wrong.");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    toast.error("");
    try {
      const res = await axios.post(`${backend}/api/auth/verify-otp`, {
        email,
        otp,
      });
      toast.success(res.data.message);
      setStep("form");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Invalid OTP.");
    }
    setLoading(false);
  };

  const handleFinalSubmit = async () => {
    console.log(skills)
    setLoading(true);
    toast.error("");
    try {
      const res = await axios.post(`${backend}/api/auth/create-user`, {
        email,
        ...form,
        skills:skills
      });
      toast.success(res.data.message);
      // setStep("email"); // Reset flow
      router.push("login");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to register.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-50 to-blue-100  px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Mentor-Connect Signup
        </h2>

        {/* {serverMessage && (
          <p className="text-green-600 text-center">{serverMessage}</p>
        )} */}
        {/* {error && <p className="text-red-500 text-center">{error}</p>} */}

        {step === "email" && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2 outline-none"
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-indigo-600 cursor-pointer text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Log in
              </Link>
            </p>
          </>
        )}

        {step === "otp" && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2 outline-none"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full bg-indigo-600 cursor-pointer text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Log in
              </Link>
            </p>
          </>
        )}

        {step === "form" && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 outline-none"
            />
            <select
              name="role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 outline-none"
            >
              <option value="">Select Role</option>
              <option value="Student">Student</option>
              <option value="Mentor">Mentor</option>
            </select>
            <SkillsSelector
              initialSkills={[]}
              onChange={handleSkillsChange}
            />
            <button
              onClick={handleFinalSubmit}
              disabled={loading}
              className="w-full bg-indigo-600 cursor-pointer text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Log in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
