"use client";

import { usePWAInstall } from "@/hooks/usePWAInstall";

export default function InstallBanner() {
  const { canInstall, isIOS, install, dismiss } = usePWAInstall();

  if (!canInstall && !isIOS) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up">
      <div className="bg-gray-900 border border-orange-500/30 rounded-2xl p-4 shadow-2xl shadow-black/50 flex items-center gap-3 max-w-md mx-auto">
        <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-pink-600 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-lg">
          📸
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-white">Cài ShootSix Studio</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {isIOS
              ? 'Nhấn Share ⬆ → "Add to Home Screen"'
              : "Dùng như app thật, không cần trình duyệt"}
          </p>
        </div>
        {!isIOS && (
          <button
            onClick={install}
            className="px-3 py-2 bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl text-xs font-semibold text-white shrink-0 hover:opacity-90 active:scale-95 transition-all"
          >
            Cài đặt
          </button>
        )}
        <button
          onClick={dismiss}
          className="text-gray-500 hover:text-gray-300 transition-colors text-xl leading-none shrink-0 ml-1"
          aria-label="Đóng"
        >
          ×
        </button>
      </div>
    </div>
  );
}
