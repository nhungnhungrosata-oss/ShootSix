"use client";

import { useState, useEffect } from "react";

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (standalone) {
      setIsInstalled(true);
      return;
    }

    // Detect iOS Safari
    const ua = navigator.userAgent;
    const ios =
      /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    setIsIOS(ios && !standalone);

    // Android/Desktop Chrome install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Detect successful install
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setCanInstall(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setCanInstall(false);
    }
    setDeferredPrompt(null);
  };

  const dismiss = () => {
    setDismissed(true);
    // Remember dismissal for 7 days
    try {
      localStorage.setItem("pwa-dismissed", Date.now().toString());
    } catch {}
  };

  // Check if previously dismissed
  useEffect(() => {
    try {
      const ts = localStorage.getItem("pwa-dismissed");
      if (ts) {
        const days = (Date.now() - parseInt(ts)) / (1000 * 60 * 60 * 24);
        if (days < 7) setDismissed(true);
        else localStorage.removeItem("pwa-dismissed");
      }
    } catch {}
  }, []);

  return {
    canInstall: canInstall && !dismissed && !isInstalled,
    isIOS: isIOS && !dismissed && !isInstalled,
    isInstalled,
    install,
    dismiss,
  };
}
