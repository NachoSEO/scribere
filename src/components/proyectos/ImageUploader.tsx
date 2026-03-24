"use client";

import { useCallback, useRef, useState } from "react";
import { uploadImage, deleteImage } from "@/lib/proyectos/queries";
import { createClient } from "@/lib/supabase/client";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  initials?: string;
  className?: string;
}

export function ImageUploader({
  value,
  onChange,
  initials,
  className = "",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fallbackInitials = initials
    ? initials.slice(0, 2).toUpperCase()
    : "??";

  const handleUpload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return;

      setUploading(true);
      try {
        const sb = createClient();

        if (value) {
          await deleteImage(sb, value);
        }

        const url = await uploadImage(sb, file);
        onChange(url);
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setUploading(false);
      }
    },
    [value, onChange]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleUpload(file);
      // Reset so the same file can be re-selected
      e.target.value = "";
    },
    [handleUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleUpload(file);
    },
    [handleUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative w-24 h-24 rounded-lg overflow-hidden cursor-pointer transition-all border-2 ${
        dragOver
          ? "border-[var(--color-accent)] bg-[var(--color-accent-light)]"
          : "border-[var(--color-border-light)] hover:border-[var(--color-accent)]"
      } ${className}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <img
          src={value}
          alt="Preview"
          className={`w-full h-full object-cover transition-opacity ${
            uploading ? "opacity-40" : "opacity-100"
          }`}
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center bg-[var(--color-parchment)] transition-opacity ${
            uploading ? "opacity-40" : "opacity-100"
          }`}
        >
          <span className="text-lg font-semibold text-[var(--color-ink-muted)] select-none">
            {fallbackInitials}
          </span>
        </div>
      )}

      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 text-white opacity-0 hover:opacity-100 drop-shadow transition-opacity"
            style={{ pointerEvents: "none" }}
          >
            <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" />
            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
          </svg>
        </div>
      )}
    </div>
  );
}
