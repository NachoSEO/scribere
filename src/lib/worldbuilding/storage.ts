import type { SupabaseClient } from "@supabase/supabase-js";

async function getUserId(sb: SupabaseClient): Promise<string> {
  const { data: { user } } = await sb.auth.getUser();
  if (user) return user.id;
  const devId = process.env.NEXT_PUBLIC_DEV_USER_ID;
  if (devId) return devId;
  throw new Error("No authenticated user found. Log in or set NEXT_PUBLIC_DEV_USER_ID for local development.");
}

export async function uploadMapa(sb: SupabaseClient, file: File): Promise<string> {
  const userId = await getUserId(sb);
  const ext = file.name.split(".").pop() ?? "png";
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await sb.storage.from("mapas").upload(path, file);
  if (error) throw error;

  const { data } = sb.storage.from("mapas").getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteMapa(sb: SupabaseClient, publicUrl: string): Promise<void> {
  // Extract path from public URL: ...mapas/userId/filename
  const match = publicUrl.match(/\/mapas\/(.+)$/);
  if (!match) return;
  const path = match[1];

  const { error } = await sb.storage.from("mapas").remove([path]);
  if (error) throw error;
}
