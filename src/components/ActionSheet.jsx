import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
} from "@/components/ui/sheet";

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

  const handleSheetClose = () => {
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
        handleSheetClose();
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
    <Sheet
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          handleSheetClose();
        }
      }}
    >
      <SheetContent side="bottom" className="pb-10 pt-5">
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[#d5dde3]" aria-hidden />
        <div className="space-y-3 px-5">
          <Button
            type="button"
            variant="outline"
            onClick={handleRetakeSelfie}
            className="w-full rounded-full border-[hsl(var(--teal))] bg-white px-4 py-3 text-base font-semibold text-[hsl(var(--teal))] shadow-[0_8px_20px_rgba(15,40,60,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,40,60,0.12)]"
          >
            Retake my selfie
          </Button>
          <Button
            type="button"
            variant={refreshState === "done" ? "secondary" : "teal"}
            onClick={handleRefresh}
            disabled={refreshState === "loading"}
            className={`flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-base font-semibold transition hover:-translate-y-0.5 ${
              refreshState === "done"
                ? "border border-[#21a878] bg-[#e6f7f0] text-[#1e7f54] shadow-[0_8px_18px_rgba(33,168,120,0.22)]"
                : "shadow-[0_8px_20px_rgba(15,40,60,0.08)]"
            } ${refreshState === "loading" ? "cursor-wait opacity-80" : ""}`}
          >
            {refreshState === "loading" && (
              <span
                className="h-4 w-4 animate-spin rounded-full border-[3px] border-transparent border-t-[hsl(var(--teal))]"
                aria-hidden
              />
            )}
            {refreshState === "done" ? "ID refreshed" : "Refresh my digital ID"}
          </Button>
        </div>
        <SheetFooter className="px-5">
          <p className="px-3 text-center text-sm leading-relaxed text-[#6b7a89]">
            Refreshing your digital ID helps us know you’re still a student and your ID is valid.
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
