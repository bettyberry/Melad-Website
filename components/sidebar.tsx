"use client";

import Link from "next/link";
import { Home, Users, Settings, BarChart } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md h-screen fixed top-0 left-0 p-4">
      <h1 className="text-2xl font-bold mb-6">Admin</h1>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
