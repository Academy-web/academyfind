
"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Send } from "lucide-react";
import type { BlogComment, User } from "@/app/generated/prisma/client";

type CommentItem = Pick<
  BlogComment,
  "id" | "content" | "createdAt"
> & {
  user: Pick<User, "name" | "image">;
};

interface CommentsProps {
  comments: CommentItem[];
  canComment?: boolean;
  onSubmit?: (content: string) => Promise<void>;
}

export default function Comments({
  comments,
  canComment = false,
  onSubmit,
}: CommentsProps) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit || !content.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit(content.trim());
      setContent("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-8 flex items-center gap-3">
        <MessageCircle className="h-6 w-6 text-amber-500" />
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Comments ({comments.length})
          </h2>
          <p className="text-sm text-slate-500">
            Join the discussion.
          </p>
        </div>
      </div>

      {canComment ? (
        <form onSubmit={submit} className="mb-10 space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Write your comment..."
            className="w-full rounded-2xl border border-slate-300 p-4 outline-none focus:border-amber-500"
          />

          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 font-medium text-white hover:bg-amber-600 disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <div className="mb-8 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600">
          <Link href="/login" className="font-semibold text-amber-600">
            Sign in
          </Link>{" "}
          to join the discussion.
        </div>
      )}

      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 py-10 text-center text-slate-500">
            No comments yet. Be the first to comment.
          </div>
        ) : (
          comments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-2xl border border-slate-200 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {comment.user.name ?? "Anonymous"}
                  </h3>
                  <time className="text-xs text-slate-500">
                    {new Intl.DateTimeFormat("en-IN", {
                      dateStyle: "medium",
                    }).format(comment.createdAt)}
                  </time>
                </div>
              </div>

              <p className="mt-4 whitespace-pre-line leading-7 text-slate-700">
                {comment.content}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
