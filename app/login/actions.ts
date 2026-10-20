"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";

export async function login(
  _prev: { error?: string } | undefined,
  formData: FormData
) {
  const password = String(formData.get("password") ?? "");

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return { error: "Wrong password" };
  }

  await createSession();
  redirect("/blog/new");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
