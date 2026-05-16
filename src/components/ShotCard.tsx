"use client";

import Image from "next/image";
import { SHOT_DEFINITIONS } from "@/lib/shotDefinitions";
import { ShotResult } from "@/hooks/useGenerate";
import { downloadBase64Image } from "@/lib/imageUtils";

interface ShotCardProps {
  result: ShotResult;
  uploadedFile?: File | null;
  onRetry?: (shotId: number) => void;
}

export default function ShotCard({ result, uploadedFile, onRetry }: ShotCardProps) {
  const shot = SHOT_DEFINITIONS.find((s) => s.id === result.shotId)!;

  const handleDownload = () => {
    if (!result.imageBase64) return;
    downloadBase64Image(result.imageBase64, `product-${shot.slug}.png`);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Image area — always square */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-900 border border-gray-800">

        {/* Idle */}
        {result.status === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="text-2xl opacity-40">{shot.icon}</span>
            <p className="text-xs text-gray-600">{shot.titleVi}</p>
          </div>
        )}

        {/* Loading skeleton */}
        {result.status === "loading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            <p className="text-xs text-gray-500 animate-pulse">Đang tạo...</p>
          </div>
        )}

        {/* Done — show image */}
        {result.status === "done" && result.imageBase64 && (
          <>
            <Image
              src={`data:image/png;base64,${result.imageBase64}`}
              alt={shot.titleVi}
              fill
              className="object-cover"
              unoptimized
            />
            {/* Download overlay on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={handleDownload}
                className="px-3 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-xs text-white hover:bg-white/20 transition-all flex items-center gap-1.5"
              >
                ⬇ Tải xuống
              </button>
            </div>
          </>
        )}

        {/* Error */}
        {result.status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3">
            <span className="text-xl">⚠️</span>
            <p className="text-xs text-red-400 text-center line-clamp-2">
              {result.error || "Lỗi không xác định"}
            </p>
            {onRetry && uploadedFile && (
              <button
                onClick={() => onRetry(result.shotId)}
                className="text-xs px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 hover:bg-red-500/30 transition-colors"
              >
                Thử lại
              </button>
            )}
          </div>
        )}

        {/* Badge: shot number */}
        <div className="absolute top-2 left-2">
          <span className="text-xs bg-black/60 backdrop-blur text-gray-300 px-1.5 py-0.5 rounded-md">
            {shot.icon} {shot.id}
          </span>
        </div>

        {/* Done badge */}
        {result.status === "done" && (
          <div className="absolute top-2 right-2">
            <span className="text-xs bg-green-500/20 border border-green-500/30 text-green-400 px-1.5 py-0.5 rounded-md">
              ✓
            </span>
          </div>
        )}
      </div>

      {/* Label */}
      <div className="px-0.5">
        <p className="text-xs font-medium text-gray-300 truncate">{shot.titleVi}</p>
        <p className="text-xs text-gray-600 truncate">{shot.descriptionVi}</p>
      </div>

      {/* Download button when done */}
      {result.status === "done" && (
        <button
          onClick={handleDownload}
          className="w-full py-1.5 text-xs bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 transition-colors flex items-center justify-center gap-1"
        >
          ⬇ Tải PNG
        </button>
      )}
    </div>
  );
}
