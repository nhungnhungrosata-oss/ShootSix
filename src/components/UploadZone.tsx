"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { validateImageFile } from "@/lib/imageUtils";

interface UploadZoneProps {
  onUpload: (file: File) => void;
  preview: string | null;
  disabled?: boolean;
}

export default function UploadZone({ onUpload, preview, disabled }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setError(validation.error || "File không hợp lệ");
        return;
      }
      onUpload(file);
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  if (preview) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative group">
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-orange-500/40 shadow-xl shadow-orange-500/10 relative">
            <Image
              src={preview}
              alt="Ảnh sản phẩm đã tải lên"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={() => inputRef.current?.click()}
              disabled={disabled}
              className="px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-sm text-white hover:bg-white/20 transition-all"
            >
              Đổi ảnh
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500">Ảnh của bạn đã sẵn sàng</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        disabled={disabled}
        className={`
          w-full max-w-sm h-52 rounded-2xl border-2 border-dashed transition-all duration-200
          flex flex-col items-center justify-center gap-3 cursor-pointer
          ${isDragging
            ? "border-orange-400 bg-orange-500/10 scale-[1.02]"
            : "border-gray-700 bg-gray-900/50 hover:border-orange-500/50 hover:bg-gray-800/50"
          }
        `}
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400/20 to-pink-600/20 border border-orange-500/20 flex items-center justify-center text-2xl">
          📷
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-300">
            {isDragging ? "Thả ảnh vào đây" : "Tải ảnh sản phẩm lên"}
          </p>
          <p className="text-xs text-gray-500 mt-1">JPG, PNG, WEBP — tối đa 10MB</p>
        </div>
        {/* Mobile camera capture */}
        <span className="text-xs text-orange-400/70">hoặc chụp ngay từ camera</span>
      </button>

      {/* Dual inputs: file picker + camera capture for mobile */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleChange}
      />

      {error && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}
