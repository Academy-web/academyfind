"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchBar() {
  const [input, setInput] = useState("");
  const [city, setCity] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    if (!input.trim()) return;

    const params = new URLSearchParams();

    params.set("q", input);

    if (city) {
      params.set("city", city);
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div
  className="
    flex
    flex-col
    gap-2

    w-full

    rounded-2xl
    border
    border-slate-200
    bg-white
    p-2
    shadow-lg

    sm:h-16
    sm:flex-row
    sm:items-center
  "
>
      {/* Search Input */}
      <div className="flex min-w-0 w-full flex-1 items-center">
        <Search className="ml-2 mr-3 h-5 w-5 shrink-0 text-amber-400" />

        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search coaching institutes..."
          className="
            min-w-0
            flex-1
            border-0
            p-0
            text-sm
            shadow-none
            focus-visible:ring-0
            sm:text-base
          "
        />
      </div>

      {/* City Select */}
      <Select value={city} onValueChange={setCity}>
        <SelectTrigger
  className="
    h-12
    w-full

    sm:w-40
    sm:shrink-0

    border-0
    shadow-none
    focus:ring-0
  "
>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-amber-500" />
            <SelectValue placeholder="City" />
          </div>
        </SelectTrigger>

        <SelectContent className="rounded-xl border-0 bg-slate-50 p-2 shadow-lg">
          <SelectItem value="kota">Noida</SelectItem>
          <SelectItem value="delhi">Delhi</SelectItem>
          <SelectItem value="jaipur">Jaipur</SelectItem>
          <SelectItem value="patna">Patna</SelectItem>
          <SelectItem value="indore">Indore</SelectItem>
          <SelectItem value="prayagraj">Prayagraj</SelectItem>
        </SelectContent>
      </Select>

      {/* Search Button */}
      <Button
  className="
    h-12
    w-full

    sm:w-auto
    sm:shrink-0

    rounded-xl
    bg-amber-400
    px-6
    hover:bg-amber-40
  "
>
        Search
      </Button>
    </div>
  );
}