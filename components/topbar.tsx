"use client";

import { Bell, UserCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-4 sticky top-0">
      {/* Search */}
      <div className="flex items-center gap-2 w-1/3">
        <Input placeholder="Search..." />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <UserCircle className="h-8 w-8" />
      </div>
    </header>
  );
}

