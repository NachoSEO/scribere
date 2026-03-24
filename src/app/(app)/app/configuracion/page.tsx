"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

export default function ConfiguracionPage() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, [supabase.auth]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const meta = user?.user_metadata;

  return (
    <div className="flex h-full items-start justify-center pt-16">
      <div className="w-full max-w-md rounded-xl border border-[var(--color-border)] bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-lg font-semibold text-[var(--color-ink)]">
          Configuración
        </h1>

        {user ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              {meta?.avatar_url ? (
                <img
                  src={meta.avatar_url}
                  alt={meta.full_name ?? "Avatar"}
                  className="h-14 w-14 rounded-full"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-parchment)] text-lg font-semibold text-[var(--color-accent)]">
                  {(meta?.full_name ?? user.email ?? "?").charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                {meta?.full_name && (
                  <p className="truncate text-sm font-medium text-[var(--color-ink)]">
                    {meta.full_name}
                  </p>
                )}
                <p className="truncate text-sm text-[var(--color-ink-muted)]">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="border-t border-[var(--color-border)] pt-4">
              <button
                onClick={handleLogout}
                className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-ink-light)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-sm text-[var(--color-ink-muted)]">
            Cargando...
          </div>
        )}
      </div>
    </div>
  );
}
