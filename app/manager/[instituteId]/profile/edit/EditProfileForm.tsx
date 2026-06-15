"use client"

import { useState } from "react"
import toast from "react-hot-toast";
import Link from "next/link";
import { updateInstituteProfile } from "@/lib/User/manager/updateProfile";
import { PLAN_LIMITS, PlanType } from "@/lib/plan_limits";

// SHADCN & UI COMPONENTS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// ICONS
import { Save, Lock, Check, MapPin, Image as ImageIcon, IndianRupee, Link as LinkIcon, UploadCloud, Map, Video, Users, Trophy, ShieldCheck, UsersRound, Settings } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTelegram, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";

// CUSTOM COMPONENTS
import LocationAutocomplete from "@/components/admin/AdminLocationAutoComplete";
import VideoSettings from "./EditVideoLinks";
import EditTeachers from "./EditTeacherProfile";
import EditResultImages from "./EditResultImages";
import ClassroomImages from "./EditClassroomImages";

export default function EditProfileForm({
    institute, 
    allCategories 
}: {
    institute: any, 
    allCategories: {id: string, name: string}[] 
}){
    const [isLoading, setIsLoading] = useState(false);

    // Image Upload States
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(institute.imageUrl || institute.logo || "");
    const showActualImage = imagePreview.includes("cloudinary.com") || imagePreview.startsWith("blob:");

    // Category States
    const initialCategories = institute.categories?.map((c: any) => c.categoryId || c.id) || [];
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);

    // Location & Coordinate States
    const [address, setAddress] = useState(institute.address || "");
    const [latitude, setLatitude] = useState(institute.latitude?.toString() || "");
    const [longitude, setLongitude] = useState(institute.longitude?.toString() || "");

    // Visibility State (Manager Toggle)
    const [isPublished, setIsPublished] = useState(institute.isPublished ?? true);
    
    // Handlers
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image too large. Max allowed limit is 5MB.");
            return;
        }
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file)); 
    };
    
    const toggleCategory = (categoryId: string) => {
        setSelectedCategories((prev) => 
            prev.includes(categoryId) 
                ? prev.filter(id => id !== categoryId) 
                : [...prev, categoryId]
        );
    };

    const handleLocationSelect = (lat: number, lng: number, newAddress: string) => {
        setLatitude(lat.toString());
        setLongitude(lng.toString());
        setAddress(newAddress);
        toast.success("Location auto-filled from Google Maps!");
    };

    // Form Submit
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setIsLoading(true);
        
        const formData = new FormData(e.currentTarget);
        formData.append("categories", JSON.stringify(selectedCategories));
        formData.append("isPublished", String(isPublished)); // 🚀 Added isPublished

        if (imageFile) {
            formData.append("imageFile", imageFile);
        }

        const result = await updateInstituteProfile(institute.id, formData);

        if(result.success){
            toast.success(result.message || "Successfully updated profile");
        } else {
            toast.error(result.error || "Can't update Profile, try again");
        }
        setIsLoading(false);
    }

    const limits = PLAN_LIMITS[institute.subscriptionPlan as PlanType] || PLAN_LIMITS.BASIC;
    const isPremiumOrUltra = institute.subscriptionPlan === "PREMIUM" || institute.subscriptionPlan === "ULTRA";

    // =======================================================
    // 🚨 1. FULL PAGE LOCK FOR "BASIC" (FREE) PLAN
    // =======================================================
    if (institute.subscriptionPlan === "BASIC" || !institute.subscriptionPlan) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-3xl mx-auto">
                <div className="w-20 h-20 bg-slate-50 border border-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <Lock className="w-10 h-10" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">Profile Editing is Locked</h2>
                <p className="text-slate-500 max-w-md mb-8 text-sm md:text-base leading-relaxed">
                    You are currently on the <b>Free (Basic)</b> tier. To take control of this listing, update details, and start receiving student leads, please verify your academy.
                </p>
                <Link href={`/manager/${institute.id}/subscription`} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold transition shadow-lg shadow-blue-600/20 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" /> Verify Academy Now
                </Link>
            </div>
        );
    }

    // =======================================================
    // ✅ 2. FORM FOR VERIFIED, PREMIUM & ULTRA PLANS
    // =======================================================
    return (
        <div className="space-y-10 max-w-5xl mx-auto pb-16">
            
            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* 📸 IMAGE UPLOAD SECTION */}
                <Card className="rounded-3xl border-slate-200 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg text-slate-800">
                            <ImageIcon className="w-5 h-5 text-blue-600" /> Main Display Image
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col items-center justify-center space-y-5">
                        <div className="w-full max-w-lg h-48 sm:h-64 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden relative shadow-inner p-4 text-center">
                            {showActualImage ? (
                                <img src={imagePreview} alt="Institute Cover" className="w-full h-full object-cover absolute inset-0" />
                            ) : imagePreview ? (
                                <div className="flex flex-col items-center gap-3 text-slate-500 w-full z-10">
                                    <ImageIcon className="w-8 h-8 text-slate-300" />
                                    <div className="text-sm font-semibold text-slate-700">External Reference Stored</div>
                                    <div className="text-xs bg-white border border-slate-200 text-slate-500 px-3 py-2 rounded-lg w-full truncate font-mono select-all">
                                        {imagePreview}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-sm text-slate-400 flex flex-col items-center gap-2 z-10">
                                    <ImageIcon className="w-8 h-8 text-slate-300"/> 
                                    <span>No Image Available</span>
                                </div>
                            )}
                        </div>

                        <label className="cursor-pointer bg-slate-900 hover:bg-blue-600 text-white text-sm px-6 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-sm">
                            <UploadCloud className="w-4 h-4" /> Change Cover Image
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                    </CardContent>
                </Card>

                {/* 📋 SHADCN TABS FOR DETAILS */}
                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-slate-100 p-1 rounded-xl mb-6 h-auto">
                        <TabsTrigger value="general" className="rounded-lg py-2">General Info</TabsTrigger>
                        <TabsTrigger value="location" className="rounded-lg py-2">Location & Contact</TabsTrigger>
                        <TabsTrigger value="social" className="rounded-lg py-2">Social Links</TabsTrigger>
                        <TabsTrigger value="settings" className="rounded-lg py-2">Settings</TabsTrigger>
                    </TabsList>

                    {/* ================= 1. GENERAL INFO ================= */}
                    <TabsContent value="general">
                        <Card className="rounded-2xl border-slate-200 shadow-sm">
                            <CardHeader><CardTitle>Basic Details</CardTitle><CardDescription>Update your academy's primary information.</CardDescription></CardHeader>
                            <CardContent className="space-y-5">
                                <div className="space-y-2">
                                    <Label>Institute Name <span className="text-red-500">*</span></Label>
                                    <Input name="name" defaultValue={institute.name || ""} required />
                                </div>
                                <div className="space-y-2">
                                    <Label>About the Academy</Label>
                                    <Textarea name="description" rows={4} defaultValue={institute.description || ""} placeholder="Tell students about your courses, batches, and achievements..." />
                                </div>
                                <div className="space-y-2">
                                    <Label>Starting Fee Info</Label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input name="feeInfo" defaultValue={institute.feeInfo || ""} placeholder="e.g. ₹5,000/month" className="pl-9" />
                                    </div>
                                </div>

                                {/* Categories */}
                                <div className="space-y-2 pt-2 border-t mt-4">
                                    <Label>Tagged Categories</Label>
                                    <p className="text-xs text-slate-500">Select the courses and exams you teach.</p>
                                    <div className="h-48 overflow-y-auto border border-slate-200 rounded-xl p-3 bg-slate-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                        {allCategories?.map((cat) => {
                                            const isSelected = selectedCategories.includes(cat.id);
                                            return (
                                                <label key={cat.id} className={`flex items-center space-x-2 border p-2 rounded-lg transition-colors cursor-pointer select-none ${isSelected ? "bg-blue-50 border-blue-200 text-blue-900 font-medium" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"}`}>
                                                    <input 
                                                        type="checkbox" 
                                                        checked={isSelected}
                                                        onChange={() => toggleCategory(cat.id)}
                                                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                                                    />
                                                    <span className="text-sm truncate">{cat.name}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* ================= 2. LOCATION & CONTACT ================= */}
                    <TabsContent value="location">
                        <Card className="rounded-2xl border-slate-200 shadow-sm">
                            <CardHeader><CardTitle>Location & Contact</CardTitle><CardDescription>Help students find and reach you easily.</CardDescription></CardHeader>
                            <CardContent className="space-y-6">
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2"><Label>Phone Number</Label><Input name="phone" type="tel" defaultValue={institute.phone || ""} /></div>
                                    <div className="space-y-2"><Label>Public Email</Label><Input name="email" type="email" defaultValue={institute.email || ""} /></div>
                                    <div className="space-y-2">
                                        <Label>Website URL</Label>
                                        <div className="relative">
                                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <Input type="url" name="website" defaultValue={institute.website || ""} placeholder="https://..." className="pl-9" />
                                        </div>
                                    </div>
                                </div>

                                {/* Advanced Map Settings */}
                                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-1.5 text-blue-700"><Map className="w-4 h-4"/> Auto-fill Coordinates via Maps</Label>
                                        <LocationAutocomplete onLocationSelect={handleLocationSelect} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Full Address <span className="text-red-500">*</span></Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                            <Textarea name="address" value={address} onChange={(e) => setAddress(e.target.value)} required rows={2} className="pl-9 bg-white" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2"><Label>Latitude</Label><Input name="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} className="bg-white font-mono" /></div>
                                        <div className="space-y-2"><Label>Longitude</Label><Input name="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} className="bg-white font-mono" /></div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label>Google Maps Share URL</Label>
                                        <Input type="url" name="googleMapsUrl" defaultValue={institute.googleMapsUrl || ""} placeholder="https://maps.app.goo.gl/..." className="bg-white" />
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* ================= 3. SOCIAL LINKS ================= */}
                    <TabsContent value="social">
                        <Card className="rounded-2xl border-slate-200 shadow-sm">
                            <CardHeader><CardTitle>Social Media Links</CardTitle></CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>WhatsApp URL</Label><div className="relative"><FaWhatsapp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" /><Input name="whatsappUrl" type="url" defaultValue={institute.whatsappUrl || ""} className="pl-9" /></div></div>
                                <div className="space-y-2"><Label>Instagram URL</Label><div className="relative"><FaInstagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-600" /><Input name="instagramUrl" type="url" defaultValue={institute.instagramUrl || ""} className="pl-9" /></div></div>
                                <div className="space-y-2"><Label>Facebook URL</Label><div className="relative"><FaFacebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" /><Input name="facebookUrl" type="url" defaultValue={institute.facebookUrl || ""} className="pl-9" /></div></div>
                                <div className="space-y-2"><Label>YouTube URL</Label><div className="relative"><FaYoutube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-600" /><Input name="youtubeUrl" type="url" defaultValue={institute.youtubeUrl || ""} className="pl-9" /></div></div>
                                <div className="space-y-2"><Label>LinkedIn URL</Label><div className="relative"><FaLinkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-700" /><Input name="linkedinUrl" type="url" defaultValue={institute.linkedinUrl || ""} className="pl-9" /></div></div>
                                <div className="space-y-2"><Label>Twitter/X URL</Label><div className="relative"><FaTwitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-800" /><Input name="twitterUrl" type="url" defaultValue={institute.twitterUrl || ""} className="pl-9" /></div></div>
                                <div className="space-y-2"><Label>Telegram URL</Label><div className="relative"><FaTelegram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" /><Input name="telegramUrl" type="url" defaultValue={institute.telegramUrl || ""} className="pl-9" /></div></div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* ================= 4. SETTINGS & VISIBILITY ================= */}
                    <TabsContent value="settings">
                        <Card className="rounded-2xl border-slate-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Settings className="w-5 h-5 text-slate-600"/> Profile Visibility Settings</CardTitle>
                                <CardDescription>Control how your profile appears to students.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between p-5 border border-slate-200 rounded-xl bg-slate-50">
                                    <div className="space-y-1 max-w-[70%]">
                                        <Label className="text-base">Publish Profile</Label>
                                        <p className="text-xs text-slate-500 leading-relaxed">
                                            If turned OFF, your institute will be hidden from public search results and category pages. Your data will be saved securely and you can turn it back ON anytime.
                                        </p>
                                    </div>
                                    <Switch checked={isPublished} onCheckedChange={setIsPublished} />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Submit Form */}
                <div className="flex justify-end pt-4 border-t border-slate-100">
                    <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2 px-8 shadow-sm">
                        {isLoading ? "Saving Details..." : <><Save className="w-4 h-4" /> Save Profile Details</>}
                    </Button>
                </div>
            </form>

            {/* ======================================================= */}
            {/* 🚨 3. CONDITIONAL PREMIUM/ULTRA FEATURES SECTIONS        */}
            {/* ======================================================= */}
            <div className="pt-8 border-t-2 border-dashed border-slate-200 space-y-8">
                
                {/* YouTube Videos Component */}
                {isPremiumOrUltra ? (
                    <VideoSettings instituteId={institute.id} currentVideos={institute.youtubeVideos || []} maxLimit={limits.maxVideos} />
                ) : (
                    <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-6 text-center flex flex-col items-center shadow-sm">
                        <div className="w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-400"><Lock className="w-4 h-4" /></div>
                        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2"><Video className="w-4 h-4 text-red-500" /> YouTube Video Integration Locked</h3>
                        <p className="text-xs text-slate-500 max-w-sm mt-1 mb-3">Showcase your classroom dynamic and video lectures directly on your public profile page.</p>
                        <Link href={`/manager/${institute.id}/subscription`} className="bg-slate-900 hover:bg-blue-600 text-white text-xs px-4 py-2 rounded-xl font-medium transition">Upgrade to Premium</Link>
                    </div>
                )}

                {/* Classroom Images */}
                {isPremiumOrUltra ? (
                    <ClassroomImages instituteId={institute.id} currentImages={institute.classroomImages || []} maxLimit={limits.maxClassroom} />
                ) : (
                    <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-6 text-center flex flex-col items-center shadow-sm">
                        <div className="w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-400"><Lock className="w-4 h-4" /></div>
                        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2"><UsersRound className="w-4 h-4 text-amber-500" /> Classroom Images Locked</h3>
                        <p className="text-xs text-slate-500 max-w-sm mt-1 mb-3">Showcase your classroom images directly on your public profile page.</p>
                        <Link href={`/manager/${institute.id}/subscription`} className="bg-slate-900 hover:bg-blue-600 text-white text-xs px-4 py-2 rounded-xl font-medium transition">Upgrade to Premium</Link>
                    </div>
                )}
                
                {/* Results Gallery Component */}
                {isPremiumOrUltra ? (
                    <EditResultImages instituteId={institute.id} currentImages={institute.gallery || []} maxLimit={limits.maxResults} />
                ) : (
                    <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-6 text-center flex flex-col items-center shadow-sm">
                        <div className="w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-400"><Lock className="w-4 h-4" /></div>
                        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2"><Trophy className="w-4 h-4 text-amber-500" /> Toppers & Results Gallery Locked</h3>
                        <p className="text-xs text-slate-500 max-w-sm mt-1 mb-3">Publish images of top-ranking students, batch results, and milestone banners to build trust.</p>
                        <Link href={`/manager/${institute.id}/subscription`} className="bg-slate-900 hover:bg-blue-600 text-white text-xs px-4 py-2 rounded-xl font-medium transition">Upgrade to Premium</Link>
                    </div>
                )}

                {/* Teacher Profiles Component */}
                {isPremiumOrUltra ? (
                    <EditTeachers instituteId={institute.id} currentTeachers={institute.teachers || []} maxLimit={limits.maxTeachers} />
                ) : (
                    <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-6 text-center flex flex-col items-center shadow-sm">
                        <div className="w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-400"><Lock className="w-4 h-4" /></div>
                        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2"><Users className="w-4 h-4 text-emerald-500" /> Faculty Profiles Locked</h3>
                        <p className="text-xs text-slate-500 max-w-sm mt-1 mb-3">Introduce your experienced faculty members, their qualifications, and subjects taught.</p>
                        <Link href={`/manager/${institute.id}/subscription`} className="bg-slate-900 hover:bg-blue-600 text-white text-xs px-4 py-2 rounded-xl font-medium transition">Upgrade to Premium</Link>
                    </div>
                )}
            </div>
        </div>
    );
}