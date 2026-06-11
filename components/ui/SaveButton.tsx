"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { toggleShortlist } from "@/lib/User/user/user-activity";
import toast from "react-hot-toast";

interface SaveButtonProps {
  userId?: string; // Optional rakha hai, in case guest user ho
  instituteId: string;
  isInitiallySaved: boolean; // Server se check karke bhejenge ki pehle se saved hai ya nahi
}

export default function SaveButton({ userId, instituteId, isInitiallySaved }: SaveButtonProps) {
  const router = useRouter();
    
  const [isSaved, setIsSaved] = useState(isInitiallySaved);
    const [isLoading, setIsLoading] = useState(false);
    
  const handleToggleSave = async () => {
    if (!userId) {
      toast.error("Please login to save!");
      return;
    }

        setIsSaved(!isSaved);
        setIsLoading(true);

    try {
          const res = await toggleShortlist(userId, instituteId);
        
        if (!res.success) {
          setIsSaved(isSaved);
          console.error(res.error);
        }
    } catch (error) {
      setIsSaved(!isSaved); // Revert UI on error
      console.error("Failed to save");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 cursor-pointer">
      <button 
        onClick={handleToggleSave} 
        disabled={isLoading}
        className="p-3 hover:bg-slate-100 rounded-full transition-colors"
      >
        <Bookmark 
          className={`w-7 h-7 transition-all cursor-pointer ${
            isSaved ? "fill-amber-500 text-amber-500" : "text-slate-400 hover:text-slate-600"
          }`} 
        />
      </button>

      {/* 🚀 NEW: Text ab isSaved state se direct link ho gaya */}
      <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
        isSaved ? "text-amber-600" : "text-slate-400"
      }`}>
        {isSaved ? "Saved" : "Save"}
      </span>
    </div>
  );
}
