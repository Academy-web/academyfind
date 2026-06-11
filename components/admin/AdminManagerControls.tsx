"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Building2, Loader2, Search } from "lucide-react";
import toast from "react-hot-toast";
import { addManagerRelation, removeManagerRelation } from "@/lib/User/admin/adminUserUpdate"; 

export default function ManagerControl({ 
    userId, 
    managedInstitutes, 
    allInstitutes 
}: { 
    userId: string;
    managedInstitutes: any[];
    allInstitutes: any[];
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedInstitute, setSelectedInstitute] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // 🚀 Search Query State

    // 🚀 Dynamic search filter (Case-insensitive)
    const filteredInstitutes = useMemo(() => {
        if (!searchQuery.trim()) return allInstitutes;
        return allInstitutes.filter(inst => 
            inst.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, allInstitutes]);

    const handleAdd = async () => {
        if (!selectedInstitute) return toast.error("Please select an institute first.");
        setIsLoading(true);
        const res = await addManagerRelation(userId, selectedInstitute);
        if (res.success) {
            toast.success(res.message || "Successfully added to institute");
            setSelectedInstitute(""); 
            setSearchQuery(""); // Form reset par search clear karo
        } else {
            toast.error(res.error || "Can't add");
        }
        setIsLoading(false);
    };

    const handleRemove = async (instituteId: string, instituteName: string) => {
        if (!confirm(`Are you sure you want to remove access to ${instituteName}?`)) return;
        setIsLoading(true);
        const res = await removeManagerRelation(userId, instituteId);
        if (res.success) toast.success(res.message || "Successfully removed access");
        else toast.error(res.error || "Can't remove access");
        setIsLoading(false);
    };

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 max-w-full overflow-hidden">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
                <Building2 className="w-5 h-5 text-blue-500" /> Managed Institutes Workspace
            </h3>

            {/* Current Managed List */}
            {managedInstitutes.length > 0 ? (
                <ul className="space-y-2">
                    {managedInstitutes.map((mi) => (
                        <li key={mi.instituteId} className="text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between group">
                            <span className="font-semibold text-slate-700 truncate mr-2 min-w-0">{mi.institute.name}</span>
                            <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => handleRemove(mi.instituteId, mi.institute.name)}
                                disabled={isLoading}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 px-2 shrink-0"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-xs text-slate-400 p-2 text-center bg-slate-50 rounded-xl border border-dashed">Not managing any institute currently.</p>
            )}

            {/* 🚀 FIXED: Searchable Assign Form */}
            <div className="pt-4 mt-2 border-t space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase">Assign New Institute</label>
                
                <div className="flex flex-col gap-2">
                    {/* Search Input Box */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Type to search institute..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setSelectedInstitute(""); // Search badalte hi purana selection reset karo
                            }}
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Filtered Dropdown & Button Box */}
                    <div className="flex gap-2">
                        {/* 'min-w-0' taaki flex lamba na khinche aur truncate chal sake */}
                        <select 
                            value={selectedInstitute}
                            onChange={(e) => setSelectedInstitute(e.target.value)}
                            className="flex-1 min-w-0 p-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500 truncate"
                        >
                            <option value="">-- Select from {filteredInstitutes.length} results --</option>
                            {filteredInstitutes.map(inst => (
                                <option key={inst.id} value={inst.id}>
                                    {inst.name.length > 50 ? inst.name.substring(0, 50) + "..." : inst.name}
                                </option>
                            ))}
                        </select>
                        <Button 
                            onClick={handleAdd} 
                            disabled={isLoading || !selectedInstitute}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 shrink-0 shadow-sm"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}