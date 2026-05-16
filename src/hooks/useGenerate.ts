"use client";

import { useState, useCallback } from "react";
import { SHOT_DEFINITIONS } from "@/lib/shotDefinitions";

export type ShotStatus = "idle" | "loading" | "done" | "error";

export interface ShotResult {
  shotId: number;
  status: ShotStatus;
  imageBase64?: string;
  error?: string;
}

export function useGenerate() {
  const [results, setResults] = useState<ShotResult[]>(
    SHOT_DEFINITIONS.map((s) => ({ shotId: s.id, status: "idle" }))
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const updateResult = useCallback((shotId: number, update: Partial<ShotResult>) => {
    setResults((prev) =>
      prev.map((r) => (r.shotId === shotId ? { ...r, ...update } : r))
    );
  }, []);

  const generate = useCallback(async (file: File, provider = "gemini") => {
    setIsGenerating(true);
    setResults(SHOT_DEFINITIONS.map((s) => ({ shotId: s.id, status: "loading" })));

    // Sequential generation to respect free tier rate limits (10 RPM)
    // Add 1.5s delay between requests to stay well within limits
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    for (const shot of SHOT_DEFINITIONS) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("shotId", shot.id.toString());
        formData.append("provider", provider);

        const res = await fetch("/api/generate", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          updateResult(shot.id, {
            status: "done",
            imageBase64: data.imageBase64,
          });
        } else {
          throw new Error(data.error || "Generation failed");
        }
      } catch (err: any) {
        updateResult(shot.id, {
          status: "error",
          error: err.message || "Unknown error",
        });
      }

      // Wait 1.5s between each request (safe for 10 RPM free tier)
      if (shot.id < SHOT_DEFINITIONS.length) {
        await delay(1500);
      }
    }
    setIsGenerating(false);
  }, [updateResult]);

  const reset = useCallback(() => {
    setResults(SHOT_DEFINITIONS.map((s) => ({ shotId: s.id, status: "idle" })));
    setIsGenerating(false);
  }, []);

  const retryShot = useCallback(async (shotId: number, file: File, provider = "gemini") => {
    updateResult(shotId, { status: "loading", error: undefined });
    const shot = SHOT_DEFINITIONS.find((s) => s.id === shotId);
    if (!shot) return;

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("shotId", shotId.toString());
      formData.append("provider", provider);

      const res = await fetch("/api/generate", { method: "POST", body: formData });
      const data = await res.json();

      if (data.success) {
        updateResult(shotId, { status: "done", imageBase64: data.imageBase64 });
      } else {
        throw new Error(data.error || "Retry failed");
      }
    } catch (err: any) {
      updateResult(shotId, { status: "error", error: err.message });
    }
  }, [updateResult]);

  const doneCount = results.filter((r) => r.status === "done").length;
  const errorCount = results.filter((r) => r.status === "error").length;
  const progress = Math.round((doneCount / SHOT_DEFINITIONS.length) * 100);
  const allDone = doneCount === SHOT_DEFINITIONS.length;

  return {
    results,
    isGenerating,
    generate,
    reset,
    retryShot,
    doneCount,
    errorCount,
    progress,
    allDone,
  };
}
