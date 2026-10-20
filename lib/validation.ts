import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters"),
  excerpt: z.string().trim().max(200, "Excerpt must be at most 200 characters"),
  content: z.string().trim().min(10, "Content must be at least 10 characters"),
  coverImage: z
    .string()
    .trim()
    .refine(
      (v) =>
        v === "" || v.startsWith("https://images.unsplash.com/") || v.startsWith("/"),
      "Use an images.unsplash.com URL or a local path like /cover.jpg"
    ),
});

export type PostInput = z.infer<typeof postSchema>;

export type FormState = {
  errors?: Partial<Record<keyof PostInput, string>>;
  values?: PostInput;
};

export function validatePost(formData: FormData) {
  const raw = {
    title: String(formData.get("title") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    content: String(formData.get("content") ?? ""),
    coverImage: String(formData.get("coverImage") ?? ""),
  };

  const result = postSchema.safeParse(raw);
  if (result.success) return { ok: true as const, data: result.data };

  const errors: FormState["errors"] = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof PostInput;
    if (!errors[key]) errors[key] = issue.message;
  }
  return { ok: false as const, state: { errors, values: raw } satisfies FormState };
}
