"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  return (
    <div className="flex w-full max-w-2xl items-center gap-2 rounded-2xl border bg-white p-2 shadow-lg">
      <Search className="ml-2 h-5 w-5 text-muted-foreground" />

      <Input
        placeholder="Search JEE coaching in Kota, UPSC coaching in Delhi..."
        className="border-0 shadow-none focus-visible:ring-0"
      />

      <Button
        size="lg"
        className="rounded-xl bg-amber-400 hover:bg-amber-500 h-8 w-20 cursor-pointer"
      >
        Search
      </Button>
    </div>
  );
}