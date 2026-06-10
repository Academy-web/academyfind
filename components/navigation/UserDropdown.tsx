"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client"; // Apne auth-client ka path check kar lena
import Image from "next/image";

export default function UserDropdown({ user }: { user: any }) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh(); // Logout ke baad cache refresh karne ke liye zaroori hai
  };

  return (
    <DropdownMenu>
      {/* Premium Trigger Button */}
      <DropdownMenuTrigger className="flex items-center gap-2 outline-none rounded-full p-1 pr-2.5 hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-amber-500">
        <Avatar className="h-9 w-9 border border-slate-200 shadow-sm">
          {/* Image Bug Fix: "" ki jagah undefined pass kiya */}
          {user.image ? (
                <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={64}
                    height={64}
                    className="rounded-full border h-full w-full object-cover"
                />
            ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-amber-100 font-semibold text-amber-700">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
        )}
        </Avatar>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </DropdownMenuTrigger>
      
      {/* Polished Dropdown Content */}
      <DropdownMenuContent 
        className="w-64 mt-1 rounded-2xl p-2 shadow-xl shadow-slate-200/50 border-slate-100" 
        align="end" 
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal p-2.5">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold text-slate-800 leading-none">{user?.name}</p>
            <p className="text-xs text-slate-500 mt-1 truncate">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-slate-100 my-1" />
        
        {/* Profile Item */}
        <DropdownMenuItem 
          onClick={() => router.push("/profile")}
          className="rounded-xl cursor-pointer py-3 px-3 focus:bg-amber-50 focus:text-amber-700 transition-colors"
        >
          <User className="mr-3 h-4 w-4" />
          <span className="font-medium text-sm">My Profile</span>
        </DropdownMenuItem>
        
        {/* Dashboard Item (Role Based) */}
        {(user?.role === 'ADMIN') && (
          <DropdownMenuItem 
            onClick={() => router.push("/admin")}
            className="rounded-xl cursor-pointer py-3 px-3 focus:bg-amber-50 focus:text-amber-700 transition-colors"
          >
            <LayoutDashboard className="mr-3 h-4 w-4" />
            <span className="font-medium text-sm">Admin Panel</span>
          </DropdownMenuItem>
        )}

        {(user?.role === 'INSTITUTE_MANAGER') && (
          <DropdownMenuItem 
            onClick={() => router.push("/manager")}
            className="rounded-xl cursor-pointer py-3 px-3 focus:bg-amber-50 focus:text-amber-700 transition-colors"
          >
            <LayoutDashboard className="mr-3 h-4 w-4" />
            <span className="font-medium text-sm">Manage Institutes</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="bg-slate-100 my-1" />
        
        {/* Logout Item */}
        <DropdownMenuItem 
          onClick={handleLogout} 
          className="rounded-xl cursor-pointer py-3 px-3 text-red-600 focus:bg-red-50 focus:text-red-700 transition-colors"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span className="font-medium text-sm">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}