"use client";

import { useState } from "react";
import { ShotResult } from "@/hooks/useGenerate";
import { SHOT_DEFINITIONS } from "@/lib/shotDefinitions";

interface DownloadAllProps {
  results: ShotResult[];
}

export default function DownloadAll({ results }: DownloadAllProps) {
  const [isZipping, setIsZipping] = useState(false);

  const doneResults = results.filter(
    (r) => r.status === "done" && r.imageBase64
  );

  if (doneResults.length === 0) return null;

  const handleDownloadAll = async () => {
    setIsZipping(true);
    try {
      // Dynamically import JSZip
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      for (const result of doneResults) {
        const shot = SHOT_DEFINITIONS.find((s) => s.id === result.shotId);
        if (!shot || !result.imageBase64) continue;

        const filename = `${shot.id.toString().padStart(2, "0")}-product-${shot.slug}.png`;
        zip.file(filename, result.imageBase64, { base64: true });
      }

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "product-photos-6shots.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Zip error:", err);
      alert("Lỗi khi tạo file ZIP. Vui lòng tải từng ảnh riêng lẻ.");
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleDownloadAll}
        disabled={isZipping}
        className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-2xl text-sm font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 active:scale-95"
      >
        {isZipping ? (
          <>
            <span className="w-4 h-4 border-2 border-gray-500 border-t-white rounded-full animate-spin" />
            Đang đóng gói...
          </>
        ) : (
          <>
            🗜 Tải tất cả {doneResults.length} ảnh (.zip)
          </>
        )}
      </button>
      <p className="text-xs text-gray-600">
        Bao gồm {doneResults.length}/6 ảnh đã tạo
      </p>
    </div>
  );
}
