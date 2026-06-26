"use client";

import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    // TODO:
    // Call newsletter API
    // POST /api/blog/newsletter

    console.log(email);
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* Background Glow */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-200/25 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="grid items-center gap-12 p-10 lg:grid-cols-2 lg:p-16">
            {/* Left */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                <Mail className="h-4 w-4" />
                Newsletter
              </div>

              <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
                Never Miss an Important Update.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Get expert coaching guides, admission updates,
                exam notifications and career insights delivered
                directly to your inbox.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Latest coaching reviews",
                  "Admission & counselling updates",
                  "Preparation strategies",
                  "Career guidance",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-amber-500" />

                    <span className="text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 text-slate-700 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 font-semibold text-slate-900 transition hover:bg-amber-500 active:scale-[0.99]"
                >
                  Subscribe

                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-center text-sm leading-6 text-slate-500">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}