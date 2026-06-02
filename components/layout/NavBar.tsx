"use client";

import Link from "next/link";
import {
  BookOpen,
  Search,
  BarChart3,
  FileText,
  Building2,
  LogIn,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-zinc-200/60">
      <div className="max-w-[1140px] mx-auto px-8 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="size-9 rounded-xl bg-amber-400 text-amber-50 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <BookOpen className="size-5" />
          </div>

          <span className="font-bold text-lg tracking-tight">
            AcademyFind
            <p className="text-[0.6rem] text-black font-normal">Academy Search Simplified</p>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Button variant="ghost" className="gap-2 text-zinc-900">
            <Search className="size-4" />
            Search
          </Button>

          <Button variant="ghost" className="gap-2 text-zinc-600">
            <BarChart3 className="size-4" />
            Compare
          </Button>

          <Button variant="ghost" className="gap-2 text-zinc-600">
            <FileText className="size-4" />
            Resources
          </Button>

          <Button variant="ghost" className="gap-2 text-zinc-600">
            <Building2 className="size-4" />
            Contact
          </Button>

          <Button variant="ghost" className="gap-2 text-zinc-600">
            <Building2 className="size-4" />
            About Us
          </Button>
        </nav>

        {/* Auth */}
        <div className="hidden lg:flex items-center gap-2">
          <Button variant="ghost" className="gap-2 text-zinc-600">
            <LogIn className="size-4" />
            Login
          </Button>

          <Button className="bg-amber-500 hover:bg-amber-600 text-white gap-2 shadow-md shadow-amber-500/30">
            <UserPlus className="size-4" />
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}