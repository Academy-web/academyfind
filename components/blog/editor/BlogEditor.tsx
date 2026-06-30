import { getWriteBlogData } from "@/lib/User/user/blog/getwriteblogdata";

import BlogEditorForm from "./BlogEditorForm";
import type { BlogEditorProps } from "./types";

export type { BlogEditorInitialData, BlogEditorProps } from "./types";

export default async function BlogEditor(props: BlogEditorProps) {
  const { categories, tags, brands } = await getWriteBlogData();

  return (
    <BlogEditorForm
      {...props}
      options={{ categories, tags, brands }}
    />
  );
}
