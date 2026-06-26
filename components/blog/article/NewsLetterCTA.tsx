
"use client";

import { useState, useTransition } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

interface NewsletterCTAProps {
  onSubscribe?: (email: string) => Promise<void>;
  title?: string;
  description?: string;
}

export default function NewsletterCTA({
  onSubscribe,
  title = "Stay Ahead in Your Learning Journey",
  description = "Get the latest coaching insights, exam strategies, and education news delivered to your inbox.",
}: NewsletterCTAProps) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      if (onSubscribe) {
        await onSubscribe(email);
      }

      setSuccess(true);
      setEmail("");
    });
  };

  return (
    <section className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-400 p-8 text-white shadow-xl">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex rounded-full bg-white/20 p-3">
            <Mail className="h-6 w-6" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight">
            {title}
          </h2>

          <p className="mt-4 text-white/90">
            {description}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-3"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-slate-900 outline-none ring-0 placeholder:text-slate-400"
          />

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {success ? (
              <>
                <CheckCircle2 className="h-5 w-5" />
                Subscribed
              </>
            ) : (
              <>
                <Mail className="h-5 w-5" />
                {isPending ? "Subscribing..." : "Subscribe"}
              </>
            )}
          </button>

          <p className="text-center text-xs text-white/80">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </section>
  );
}
