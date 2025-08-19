'use client';

import {useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {
  Menu,
  X,
  Home,
  Calendar,
  MessageSquare,
  BookOpen,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {useAuth} from '@/context/AuthProvider';

export default function MentorSidebar () {
  const [open, setOpen] = useState (false);
  const pathname = usePathname ();
  const {mentorCollapsed, setMentorCollapsed, logout} = useAuth ();

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/mentor/dashboard',
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: 'Bookings',
      href: '/mentor/bookings',
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      name: 'Chat',
      href: '/mentor/chat',
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      name: 'Resources',
      href: '/mentor/resources',
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      name: 'Profile',
      href: '/mentor/profile',
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex">
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen (!open)}
        className="md:hidden p-3 fixed top-2 right-2 z-50 bg-gray-900 text-white rounded-lg"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full ${mentorCollapsed ? 'w-20' : 'w-64'} bg-gray-900 text-white p-5 flex flex-col transform 
        ${open ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-all duration-300 ease-in-out z-40`}
      >
        {/* Logo + Collapse Button */}
        <div className="flex items-center justify-between mb-8 p-5">
          {!mentorCollapsed &&
            <h1 className="text-2xl font-bold">GuideLink</h1>}
          <button
            onClick={() => setMentorCollapsed (!mentorCollapsed)}
            className="cursor-pointer hidden md:block p-1 bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            {mentorCollapsed
              ? <ChevronRight className="w-5 h-5" />
              : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          {menuItems.map (item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 p-2 rounded-lg transition ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
              >
                {item.icon}
                {!mentorCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}

          {/* Logout */}
          <button
            onClick={logout}
            className="cursor-pointer flex items-center space-x-3 p-2 rounded-lg hover:bg-red-600 transition text-gray-300 mt-4 w-full"
          >
            <LogOut className="w-5 h-5" />
            {!mentorCollapsed && <span>Logout</span>}
          </button>
        </nav>
      </aside>
    </div>
  );
}
