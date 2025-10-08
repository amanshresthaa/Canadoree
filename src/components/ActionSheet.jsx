import React, { useEffect, useRef, useState } from "react";

export default function ActionSheet({ open, onClose, onRetake, onRefresh }) {
  const [refreshState, setRefreshState] = useState("idle");
  const timersRef = useRef([]);

  useEffect(() => {
    if (!open) {
      setRefreshState("idle");
      timersRef.current.forEach((id) => clearTimeout(id));
      timersRef.current = [];
    }
  }, [open]);

  if (!open) return null;

  const handleClose = () => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
    setRefreshState("idle");
    onClose();
  };

  const handleRefresh = () => {
    if (refreshState === "loading") return;

    setRefreshState("loading");

    const loadTimer = setTimeout(() => {
      setRefreshState("done");
      if (onRefresh) {
        onRefresh();
      }
      const successTimer = setTimeout(() => {
        handleClose();
      }, 1000);
      timersRef.current.push(successTimer);
    }, 1400);

    timersRef.current.push(loadTimer);
  };

  const handleRetakeSelfie = () => {
    if (onRetake) {
      onRetake();
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col justify-end">
      <button
        onClick={handleClose}
        aria-label="Close actions"
        className="h-full w-full bg-black/20"
      />
      <div className="relative rounded-t-3xl border-t border-[#d5dde3] bg-white pb-10 pt-5 shadow-[0_-20px_40px_rgba(8,35,52,0.25)]">
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[#d5dde3]" />
        <div className="space-y-3 px-5">
          <button
            onClick={handleRetakeSelfie}
            className="w-full rounded-full border border-[#0f7f8e] bg-white px-4 py-3 text-base font-semibold text-[#0f7f8e] shadow-[0_8px_20px_rgba(15,40,60,0.08)] transition hover:-translate-y-[1px] hover:shadow-[0_10px_24px_rgba(15,40,60,0.12)] active:scale-[0.99]"
          >
            Retake my selfie
          </button>
          <button
            onClick={handleRefresh}
            disabled={refreshState === "loading"}
            className={`flex w-full items-center justify-center gap-2 rounded-full border px-4 py-3 text-base font-semibold transition hover:-translate-y-[1px] active:scale-[0.99] ${
              refreshState === "done"
                ? "border-[#21a878] bg-[#e6f7f0] text-[#1e7f54] shadow-[0_8px_18px_rgba(33,168,120,0.22)]"
                : "border-[#0f7f8e] bg-white text-[#0f7f8e] shadow-[0_8px_20px_rgba(15,40,60,0.08)]"
            } ${refreshState === "loading" ? "cursor-wait opacity-80" : ""}`}
          >
            {refreshState === "loading" && (
              <span
                className="h-4 w-4 animate-spin rounded-full border-[3px] border-transparent border-t-[#0f7f8e]"
                aria-hidden
              />
            )}
            {refreshState === "done" ? "ID refreshed" : "Refresh my digital ID"}
          </button>
          <p className="px-3 text-center text-sm leading-relaxed text-[#6b7a89]">
            Refreshing your digital ID helps us know you’re still a student and your ID is valid.
          </p>
        </div>
      </div>
    </div>
  );
}
