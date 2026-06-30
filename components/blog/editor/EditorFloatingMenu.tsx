"use client";

import { useState, useEffect } from "react";
import type { Editor } from "@tiptap/react";
import { FloatingMenu } from "@tiptap/react/menus";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  editor: Editor;
};

export default function EditorFloatingMenu({ editor }: Props) {
  // Guard state preventing menu overlapping when the slash menu popover opens
  const [isForcedHidden, setIsForcedHidden] = useState(false);

  // Reset our forced hiding state lock whenever the text cursor selection moves
  useEffect(() => {
    if (!editor) return;
    const handleSelection = () => setIsForcedHidden(false);
    
    editor.on("selectionUpdate", handleSelection);
    return () => {
      editor.off("selectionUpdate", handleSelection);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <FloatingMenu
      editor={editor}
      updateDelay={50} // Low debounce timing keeps tracking snappy
      shouldShow={({ editor: currentEditor }) => {
        // FIX 1: Immediately drop the menu out of view if the slash command panel was triggered
        if (isForcedHidden) return false;
        
        // FIX 2: Strict accessibility and structural layout element block checks
        if (!currentEditor.isEditable) return false;
        if (!currentEditor.isActive("paragraph")) return false;

        const { $from } = currentEditor.state.selection;

        // Ensure line text contents are completely empty before rendering the gutter options
        return (
          $from.parent.textContent.length === 0 &&
          $from.parentOffset === 0
        );
      }}
    >
      {/* 
        Gutter placement positioning layout. 
        Offsetting the wrapper -52px shifts the panel entirely out of your prose writing grid
        and positions it directly in the margin workspace, matching Notion perfectly.
      */}
      <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-xl select-none pointer-events-auto -translate-x-[52px]">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-slate-500 hover:text-slate-900 hover:bg-slate-50"
          // FIX 4: Clear accessibility parameters mapping
          aria-label="Open slash commands menu"
          // FIX 3: Stop blur events from taking cursor focus away from your active writing area
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            // Lock visibility frames instantly so the menus don't overlap on screen
            setIsForcedHidden(true);

            // Programmatically insert the search character token tag into the empty line space
            editor
              .chain()
              .focus()
              .insertContent("/")
              .run();

            // Simulate a synthetic key transaction down to ProseMirror to kick off your fuzzy search
            const { view } = editor;
            const event = new KeyboardEvent("keydown", { key: "/" });
            view.someProp("handleKeyDown", (f) => f(view, event));
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-slate-400 cursor-not-allowed hover:bg-transparent"
          aria-label="AI Assistant Options"
          onMouseDown={(e) => e.preventDefault()}
          disabled
        >
          <Sparkles className="h-4 w-4 text-amber-500/40" />
        </Button>
      </div>
    </FloatingMenu>
  );
}
