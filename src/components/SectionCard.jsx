import React from "react";

import { Button } from "@/components/ui/button";

export default function SectionCard({ title, subtitle, icon, trailing = null, onClick }) {
  return (
    <Button
      type="button"
      variant="surface"
      size="block"
      onClick={onClick}
      className="group rounded-2xl border-[#e0e5e9] bg-white shadow-[0_6px_18px_rgba(15,40,60,0.08)] transition-shadow hover:shadow-[0_10px_24px_rgba(15,40,60,0.12)]"
    >
      <div className="flex items-center gap-4">
        {icon ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--teal))]/10 text-[hsl(var(--teal))]">
            {icon}
          </div>
        ) : null}
        <div className="space-y-0.5">
          <div className="text-base font-medium text-[#1f2a37]">{title}</div>
          {subtitle ? <div className="text-sm text-[#6b7a89]">{subtitle}</div> : null}
        </div>
      </div>
      {trailing ? <div className="text-[#6b7a89] transition group-hover:text-[#0f7f8e]">{trailing}</div> : null}
    </Button>
  );
}
