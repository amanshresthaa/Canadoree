import React from "react";

import { Button } from "@/components/ui/button";

export default function InstallPrompt({ mode = "default", onInstall, onDismiss }) {
  const isIOS = mode === "ios";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-8">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_24px_50px_rgba(8,35,52,0.3)]">
        <div className="flex items-center justify-between border-b border-[#e1e8ef] px-5 py-4">
          <span className="text-sm font-semibold text-[#0f4051]">
            Install Canadore ID
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onDismiss}
            className="rounded-full text-[#6b7a89] hover:bg-[#f0f4f8]"
            aria-label="Close install prompt"
          >
            <span className="text-base leading-none">×</span>
          </Button>
        </div>

        <div className="space-y-4 px-5 py-6 text-sm text-[#3b4758]">
          {isIOS ? (
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 h-6 w-6 rounded-full bg-[hsl(var(--teal))]/10 text-center text-xs font-semibold leading-6 text-[hsl(var(--teal))]">
                  1
                </span>
                <p>
                  Tap the <span className="font-semibold">Share</span> button in Safari’s toolbar.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 h-6 w-6 rounded-full bg-[hsl(var(--teal))]/10 text-center text-xs font-semibold leading-6 text-[hsl(var(--teal))]">
                  2
                </span>
                <p>
                  Choose <span className="font-semibold">Add to Home Screen</span>.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 h-6 w-6 rounded-full bg-[hsl(var(--teal))]/10 text-center text-xs font-semibold leading-6 text-[hsl(var(--teal))]">
                  3
                </span>
                <p>
                  Confirm the name, then tap <span className="font-semibold">Add</span>.
                </p>
              </li>
            </ol>
          ) : (
            <p>
              Install the Canadore Digital ID to launch it instantly from your home screen and keep your card
              available offline.
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-[#e1e8ef] px-5 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={onDismiss}
            className="flex-1 rounded-full border-[#cfd7de] px-4 py-2 text-sm font-semibold text-[#6b7a89] hover:bg-[#f4f7fa]"
          >
            Maybe later
          </Button>
          <Button
            type="button"
            variant="teal"
            onClick={onInstall}
            className="flex-1 rounded-full px-4 py-2 text-sm font-semibold shadow-[0_10px_24px_rgba(15,40,60,0.18)]"
          >
            {isIOS ? "Got it" : "Install"}
          </Button>
        </div>
      </div>
    </div>
  );
}
