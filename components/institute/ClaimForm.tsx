"use client";

import { useState } from "react";
import { submitClaimRequest } from "@/lib/institute-claim"; // Path check kar lena
import { useRouter } from "next/navigation";
import { CheckCircle2, ShieldCheck, TrendingUp, Edit3 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ClaimFormProps {
  instituteId: string;
  instituteName: string;
  userId: string;
}

export default function ClaimForm({ instituteId, instituteName, userId }: ClaimFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    
    const formData = new FormData(e.currentTarget);
    const res = await submitClaimRequest(formData);
    
    if (res.success) {
      setSuccess(true);
    } else {
      setErrorMsg(res.error || "Something went wrong.");
    }
    setIsSubmitting(false);
  };

  if (success) {
    return (
      <div className="mx-auto w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 text-center border border-slate-100">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Request Submitted!</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Thank you for claiming <strong className="text-slate-800">{instituteName}</strong>. Our admin team will verify your details and grant you access shortly.
        </p>
        <button 
          onClick={() => router.push('/')}
          className="w-full py-3.5 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all shadow-md shadow-amber-500/20"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col lg:flex-row border border-slate-100">
      
      {/* LEFT PANEL: Premium Dark Mode with Amber Accents */}
      <div className="lg:w-5/12 bg-slate-900 p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-amber-500 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-500 rounded-full blur-[100px] opacity-10"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-semibold mb-6 border border-amber-500/20">
            <ShieldCheck className="w-4 h-4" />
            Verification Process
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight">Claim Profile</h1>
          <p className="text-xl font-medium text-amber-400 mb-8 pb-6 border-b border-slate-800">
            {instituteName}
          </p>
          
          <p className="text-slate-400 leading-relaxed mb-8">
            Take official ownership of your AcademyFind listing. Unlock powerful tools to grow your institute's presence.
          </p>
          
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                <Edit3 className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-slate-200 font-semibold mb-1">Edit Information</h4>
                <p className="text-sm text-slate-500">Update courses, fees, and contact details anytime.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-slate-200 font-semibold mb-1">Attract Students</h4>
                <p className="text-sm text-slate-500">Showcase photos and reply to student reviews.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* RIGHT PANEL: Clean Form */}
      <div className="lg:w-7/12 p-10 lg:p-12 bg-white">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Your Details</h2>
          <p className="text-slate-500 mt-1">Please provide your official contact information.</p>
        </div>
        
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="instituteId" value={instituteId} />
          <input type="hidden" name="userId" value={userId} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Full Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="fullName" 
                required
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Phone Number <span className="text-red-500">*</span></label>
              <input 
                type="tel" 
                name="phone" 
                required
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Official Email ID <span className="text-red-500">*</span></label>
            <input 
              type="email" 
              name="email" 
              required
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
              placeholder="contact@yourinstitute.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Your Role at Institute <span className="text-red-500">*</span></label>
            <Select name="role" required>
              <SelectTrigger className="w-full px-4 py-6 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all text-base">
                <SelectValue placeholder="Select your designation" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                <SelectItem value="Owner/Founder">Owner / Founder</SelectItem>
                <SelectItem value="Director/Principal">Director / Principal</SelectItem>
                <SelectItem value="Manager/Admin">Manager / Admin</SelectItem>
                <SelectItem value="Marketing Head">Marketing Head</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Additional Information</label>
            <textarea 
              name="message" 
              rows={3}
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all resize-none"
              placeholder="Any links (website, social media) to help us verify faster..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-70 disabled:cursor-not-allowed mt-2 flex justify-center items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Submitting Request...
              </>
            ) : "Submit Claim Request"}
          </button>
        </form>
      </div>
    </div>
  );
}