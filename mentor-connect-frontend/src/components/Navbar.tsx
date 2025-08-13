import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useAuth } from "@/components/context/Authprovider";
import { LuUserRound } from "react-icons/lu";
export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  console.log(user);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700 cursor-pointer" onClick={() => router.push("/")}>GuideLink</h1>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="w-6 h-6 text-blue-700" />
            ) : (
              <Menu className="w-6 h-6 text-blue-700" />
            )}
          </button>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          {/* <a href="#features" className="text-gray-700 hover:text-blue-700">
            Features
          </a>
          <a href="#testimonials" className="text-gray-700 hover:text-blue-700">
            Testimonials
          </a> */}
          {user ? (
            <div className="flex justify-between gap-4">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/profile")}>
                <LuUserRound size={24} />{" "}
                <span className="font-semibold">{user?.username} </span>
              </div>

              <div></div>
              {/* <button className="text-white bg-red-400 px-4 py-1 rounded cursor-pointer hover:bg-red-500 w-max">
                Logout
              </button> */}
            </div>
          ) : (
            <a
              onClick={() => {
                router.push("/login");
              }}
              className="text-white bg-blue-600 cursor-pointer px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </a>
          )}{" "}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col space-y-3">
          {/* <a href="#features" className="text-gray-700 hover:text-blue-700">
            Features
          </a>
          <a href="#testimonials" className="text-gray-700 hover:text-blue-700">
            Testimonials
          </a> */}
          {user ? (
            <div className="flex justify-between">
              <div className="flex items-center gap-2" onClick={() => router.push("/profile")}>
                <LuUserRound size={24} />{" "}
                <span className="font-semibold">{user?.username} </span>
              </div>

              {/* <div></div>
              <button className="text-white bg-red-500 px-4 py-1 rounded cursor-pointer hover:bg-blue-700 w-max">
                Logout
              </button> */}
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="text-white bg-blue-600 px-4 py-1 rounded cursor-pointer hover:bg-blue-700 w-max"
            >
              Login
            </button>
          )}{" "}
        </div>
      )}
    </nav>
  );
}
