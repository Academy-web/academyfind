"use client";

import { EditorContent as TiptapEditorContent } from "@tiptap/react";
import type { Editor } from "@tiptap/react";

type Props = {
  editor: Editor;
};

export default function EditorContent({ editor }: Props) {
  return (
    <div className="relative bg-white">
      <TiptapEditorContent
        editor={editor}
        className="
          min-h-[650px]
          px-8
          py-8
          
          [&_.ProseMirror]:prose
          [&_.ProseMirror]:prose-slate
          [&_.ProseMirror]:prose-lg
          [&_.ProseMirror]:max-w-none
          [&_.ProseMirror]:space-y-4

          [&_.ProseMirror_h1]:scroll-mt-24
          [&_.ProseMirror_h2]:scroll-mt-24
          [&_.ProseMirror_h3]:scroll-mt-24
          [&_.ProseMirror_h4]:scroll-mt-24
          
          [&_.ProseMirror_p]:text-slate-700
          [&_.ProseMirror_p]:leading-8

          [&_.ProseMirror_a]:text-amber-600
          [&_.ProseMirror_a]:no-underline
          hover:[&_.ProseMirror_a]:underline

          [&_.ProseMirror_strong]:text-slate-900

          [&_.ProseMirror_ul]:list-disc
          [&_.ProseMirror_ul]:pl-6
          
          [&_.ProseMirror_ol]:list-decimal
          [&_.ProseMirror_ol]:pl-6
          
          [&_.ProseMirror_li]:my-1

          [&_.ProseMirror_ul[data-type='taskList']]:list-none
          [&_.ProseMirror_ul[data-type='taskList']]:pl-0

          [&_.ProseMirror_pre]:rounded-xl
          [&_.ProseMirror_pre]:border
          [&_.ProseMirror_pre]:border-slate-800
          [&_.ProseMirror_pre]:bg-slate-950
          [&_.ProseMirror_pre]:p-5
          
          [&_.ProseMirror_pre_code]:bg-transparent
          [&_.ProseMirror_pre_code]:p-0

          [&_.ProseMirror_blockquote]:border-l-4
          [&_.ProseMirror_blockquote]:border-amber-500
          [&_.ProseMirror_blockquote]:bg-amber-50/50
          [&_.ProseMirror_blockquote]:py-2
          [&_.ProseMirror_blockquote]:pl-5
          [&_.ProseMirror_blockquote]:italic

          [&_.ProseMirror_img]:rounded-xl
          [&_.ProseMirror_img]:shadow-lg
          [&_.ProseMirror_img]:mx-auto
          [&_.ProseMirror_img]:my-8

          [&_.ProseMirror_table]:w-full
          [&_.ProseMirror_table]:border-collapse
          [&_.ProseMirror_table]:my-6
          [&_.ProseMirror_table]:overflow-hidden
          [&_.ProseMirror_table]:rounded-xl

          [&_.ProseMirror_th]:border
          [&_.ProseMirror_th]:border-slate-200
          [&_.ProseMirror_th]:bg-slate-50
          [&_.ProseMirror_th]:p-3
          [&_.ProseMirror_th]:text-left
          [&_.ProseMirror_th]:font-semibold

          [&_.ProseMirror_td]:border
          [&_.ProseMirror_td]:border-slate-200
          [&_.ProseMirror_td]:p-3

          [&_.ProseMirror_.is-editor-empty::before]:content-[attr(data-placeholder)]
          [&_.ProseMirror_.is-editor-empty::before]:text-slate-400
          [&_.ProseMirror_.is-editor-empty::before]:float-left
          [&_.ProseMirror_.is-editor-empty::before]:pointer-events-none
          [&_.ProseMirror_.is-editor-empty::before]:h-0

          [&_.ProseMirror_.is-empty::before]:content-[attr(data-placeholder)]
          [&_.ProseMirror_.is-empty::before]:text-slate-400
          [&_.ProseMirror_.is-empty::before]:float-left
          [&_.ProseMirror_.is-empty::before]:pointer-events-none
          [&_.ProseMirror_.is-empty::before]:h-0

          focus:outline-none
          [&_.ProseMirror]:outline-none
        "
      />
    </div>
  );
}
