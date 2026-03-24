"use client";

import { useCallback, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadMapa, deleteMapa } from "@/lib/worldbuilding/storage";

interface MapUploadProps {
  mapaUrl: string;
  onUploaded: (url: string) => void;
  onDeleted: () => void;
}

export function MapUpload({ mapaUrl, onUploaded, onDeleted }: MapUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const sb = createClient();
      const url = await uploadMapa(sb, file);
      onUploaded(url);
    } catch (err) {
      console.error("Error uploading map:", err);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }, [onUploaded]);

  const handleDelete = useCallback(async () => {
    if (!mapaUrl) return;
    try {
      const sb = createClient();
      await deleteMapa(sb, mapaUrl);
      onDeleted();
    } catch (err) {
      console.error("Error deleting map:", err);
    }
  }, [mapaUrl, onDeleted]);

  return (
    <div className="space-y-3">
      <label className="block text-xs font-medium text-[var(--color-ink-light)] uppercase tracking-wide">
        Mapa
      </label>

      {mapaUrl ? (
        <div className="space-y-2">
          <div className="overflow-hidden rounded-lg border border-[var(--color-border)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mapaUrl}
              alt="Mapa del mundo"
              className="w-full max-h-[400px] object-contain bg-[var(--color-cream-dark)]"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => fileRef.current?.click()}
              className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-ink-light)] transition-colors hover:bg-[var(--color-cream-dark)]"
            >
              Cambiar
            </button>
            <button
              onClick={handleDelete}
              className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-ink-muted)] transition-colors hover:text-red-600 hover:border-red-200"
            >
              Eliminar mapa
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-[var(--color-border)] bg-[var(--color-cream)] px-6 py-8 text-sm text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-accent-light)] hover:text-[var(--color-ink-light)] disabled:opacity-50"
        >
          {uploading ? "Subiendo..." : "Subir imagen de mapa"}
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}
