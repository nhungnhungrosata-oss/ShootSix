"use client";

import { ShotResult } from "@/hooks/useGenerate";
import ShotCard from "./ShotCard";

interface ResultGridProps {
  results: ShotResult[];
  uploadedFile?: File | null;
  onRetry?: (shotId: number) => void;
}

export default function ResultGrid({ results, uploadedFile, onRetry }: ResultGridProps) {
  const hasAnyResult = results.some(
    (r) => r.status !== "idle"
  );

  if (!hasAnyResult) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {results.map((result) => (
        <ShotCard
          key={result.shotId}
          result={result}
          uploadedFile={uploadedFile}
          onRetry={onRetry}
        />
      ))}
    </div>
  );
}
