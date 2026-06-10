"use client"

import { Button } from "@/components/ui/button";
import { updateInstituteProfile } from "@/lib/User/manager/updateProfile";
import { Save } from "lucide-react";
import { useState } from "react"
import toast from "react-hot-toast";

export default function EditProfileForm({institute} : {institute: any}){
    const [isLoading,setIsLoading] = useState(false);

    async function handleSubmit(formData: FormData){
        setIsLoading(true);
        const result = await updateInstituteProfile(institute.id, formData);

        if(result.success){
            toast.success(result.message || "Successfully updated profile")
        }else{
            toast.error("Can't update Profile, try again")
        }
        setIsLoading(false)
    }

    return (
        <form action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Institute Name */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Institute Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        defaultValue={institute.name || ""} 
                        required
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Public Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        defaultValue={institute.email || ""} 
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                    <input 
                        type="text" 
                        name="phone" 
                        defaultValue={institute.phone || ""} 
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>

                {/* Website */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Website URL</label>
                    <input 
                        type="url" 
                        name="website" 
                        defaultValue={institute.website || ""} 
                        placeholder="https://..."
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Full Address</label>
                <input 
                    type="text" 
                    name="address" 
                    defaultValue={institute.address || ""} 
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">About the Institute</label>
                <textarea 
                    name="description" 
                    rows={5}
                    defaultValue={institute.description || ""} 
                    placeholder="Tell students about your courses, batches, and achievements..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                />
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2 px-6"
                >
                    {isLoading ? "Saving..." : <><Save className="w-4 h-4" /> Save Changes</>}
                </Button>
            </div>
        </form>
    );
}