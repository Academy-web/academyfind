"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownUp, MapPin, Star, IndianRupee, Navigation, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  category: string;
  city: string;
  hasLocation: boolean;
}

export default function CityFilters({ category, city, hasLocation }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLocating, setIsLocating] = useState(false);

  // Current values from URL 
  const currentSort = searchParams.get("sort") || "relevance";
  const currentRadius = searchParams.get("radius") || "5";
  const currentRating = searchParams.get("rating") || "all";
  const currentFee = searchParams.get("fee") || "all";
  
  // States for the two 'Closest' buttons
  const isClosest = searchParams.get("closest") === "true";
  const isClosestUser = searchParams.get("closestUser") === "true";

  // 1. Purana filter: Closest from Selected Location
  const toggleClosest = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isClosest) {
      params.delete("closest");
    } else {
      params.delete("sort");
      params.delete("closestUser"); // Dusra wala closest band kardo
      params.delete("userLat");
      params.delete("userLng");
      params.set("closest", "true");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // 2. Naya filter: Closest to Me (Live GPS)
  const toggleClosestToMe = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Agar pehle se ON hai toh OFF kardo
    if (isClosestUser) {
      params.delete("closestUser");
      params.delete("userLat");
      params.delete("userLng");
      router.push(`${pathname}?${params.toString()}`);
      return;
    }

    // ON karna hai toh GPS fetch karo
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          params.delete("sort");
          params.delete("closest"); // Purana wala closest band kardo
          params.set("closestUser", "true");
          params.set("userLat", position.coords.latitude.toString());
          params.set("userLng", position.coords.longitude.toString());
          
          router.push(`${pathname}?${params.toString()}`);
          setIsLocating(false);
        },
        (error) => {
          console.error(error);
          alert("We couldn't fetch your location. Please allow location access in your browser.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setIsLocating(false);
    }
  };

  // 🚀 Magic Function (Updated to clear both closest flags if normal sort changes)
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Agar manual Sort change ho raha hai toh dono closest hata do
    if (key === "sort") {
      params.delete("closest");
      params.delete("closestUser");
      params.delete("userLat");
      params.delete("userLng");
    }

    if (value && value !== "relevance" && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  // 💅 Common styles for the premium pill look
  const triggerClasses = "rounded-full border-amber-200 bg-white hover:bg-amber-50 focus:ring-2 focus:ring-amber-400 focus:ring-offset-0 focus:outline-none transition-all data-[state=open]:bg-amber-50 data-[state=open]:border-amber-400 h-10 shadow-sm";

  return (
    <section className="mb-8 flex flex-col gap-4">
      
      {/* 1. Sort By */}
      <Select value={currentSort} onValueChange={(val) => handleFilterChange("sort", val)}>
        <SelectTrigger className={`w-full ${triggerClasses}`}>
          <div className="flex items-center gap-2 font-medium text-slate-700">
            <ArrowDownUp className="h-4 w-4 text-amber-500" />
            <SelectValue placeholder="Sort By" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl border-slate-100 shadow-xl" position="popper" side="bottom" sideOffset={5}>
          <SelectItem value="relevance" className="cursor-pointer">Relevance</SelectItem>
          <SelectItem value="rating" className="cursor-pointer">Top Rated</SelectItem>
          <SelectItem value="reviews" className="cursor-pointer">Most Reviewed</SelectItem>
        </SelectContent>
      </Select>

      {/* 2. Distance Filter */}
      {hasLocation && (
        <Select value={currentRadius} onValueChange={(val) => handleFilterChange("radius", val)}>
          <SelectTrigger className={`w-full ${triggerClasses}`}>
            <div className="flex items-center gap-2 font-medium text-slate-700">
              <MapPin className="h-4 w-4 text-amber-500" />
              <SelectValue placeholder="Distance" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl border-slate-100 shadow-xl" position="popper" side="bottom" sideOffset={5}>
            <SelectItem value="2" className="cursor-pointer">Within 2 km</SelectItem>
            <SelectItem value="5" className="cursor-pointer">Within 5 km</SelectItem>
            <SelectItem value="10" className="cursor-pointer">Within 10 km</SelectItem>
            <SelectItem value="20" className="cursor-pointer">Within 20 km</SelectItem>
          </SelectContent>
        </Select>
      )}

      {/* 3. Ratings Filter */}
      <Select value={currentRating} onValueChange={(val) => handleFilterChange("rating", val)}>
        <SelectTrigger className={`w-full ${triggerClasses}`}>
          <div className="flex items-center gap-2 font-medium text-slate-700">
            <Star className="h-4 w-4 text-amber-500" />
            <SelectValue placeholder="Ratings" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl border-slate-100 shadow-xl" position="popper" side="bottom" sideOffset={5}>
          <SelectItem value="all" className="cursor-pointer">Any Rating</SelectItem>
          <SelectItem value="4.5" className="cursor-pointer">4.5+ Stars</SelectItem>
          <SelectItem value="4.0" className="cursor-pointer">4.0+ Stars</SelectItem>
          <SelectItem value="3.5" className="cursor-pointer">3.5+ Stars</SelectItem>
        </SelectContent>
      </Select>

      {/* 4. Fees Filter */}
      <Select value={currentFee} onValueChange={(val) => handleFilterChange("fee", val)}>
        <SelectTrigger className={`w-full ${triggerClasses}`}>
          <div className="flex items-center gap-2 font-medium text-slate-700">
            <IndianRupee className="h-4 w-4 text-amber-500" />
            <SelectValue placeholder="Fees" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl border-slate-100 shadow-xl" position="popper" side="bottom" sideOffset={4}>
          <SelectItem value="all" className="cursor-pointer">Any Fee</SelectItem>
          <SelectItem value="50000" className="cursor-pointer">&lt; ₹50,000</SelectItem>
          <SelectItem value="100000" className="cursor-pointer">&lt; ₹1,00,000</SelectItem>
          <SelectItem value="150000" className="cursor-pointer">&lt; ₹1,50,000</SelectItem>
        </SelectContent>
      </Select>

      {/* Action Buttons Container */}
      {/* Action Buttons Container */}
      <div className="flex flex-col gap-3 mt-4">
        {/* Old Button: Closest from selected location */}
        {hasLocation && (
          <Button 
            variant="outline"
            onClick={toggleClosest}
            className={`w-full h-auto py-3 px-4 flex items-start justify-start rounded-2xl transition-all ${
              isClosest 
                ? "bg-amber-500 text-white hover:bg-amber-600 border-amber-500" 
                : "bg-white border-amber-200 text-slate-700 hover:bg-amber-50"
            }`}
          >
            <MapPin className="mr-3 h-4 w-4 shrink-0 mt-0.5" />
            <span className="flex-1 whitespace-normal text-left leading-relaxed text-xs font-bold break-words">
              {isClosest ? "Sorted: Closest from selected location" : "Sort by Closest from selected location"}
            </span>
          </Button>
        )}

        {/* New Button: Closest to Me */}
        <Button 
          variant="outline"
          onClick={toggleClosestToMe}
          disabled={isLocating}
          className={`w-full h-auto py-3 px-4 flex items-start justify-start rounded-2xl transition-all ${
            isClosestUser 
              ? "bg-amber-500 text-white hover:bg-amber-600 border-amber-500" 
              : "bg-white border-amber-200 text-slate-700 hover:bg-amber-50"
          }`}
        >
          {isLocating ? (
            <Loader2 className="mr-3 h-4 w-4 animate-spin shrink-0 mt-0.5" />
          ) : (
            <Navigation className="mr-3 h-4 w-4 shrink-0 mt-0.5" />
          )}
          <span className="flex-1 whitespace-normal text-left leading-relaxed text-xs font-bold break-words">
            {isClosestUser ? "Sorted: Closest to Me" : "Sort by Closest to Me"}
          </span>
        </Button>
      </div>

    </section>
  );
}