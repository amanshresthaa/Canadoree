import React from "react";

import { PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function InfoPopover({ profile, className, ...props }) {
  const { institution, issuedOn, downloadedOn, refreshOn } = profile;

  return (
    <PopoverContent
      align="end"
      sideOffset={12}
      className={cn(
        "w-80 rounded-2xl border border-[hsl(var(--teal))] bg-white/95 px-5 py-4 text-sm text-[#1f2a37] shadow-[0_16px_36px_rgba(11,42,62,0.15)]",
        className
      )}
      {...props}
    >
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-[hsl(var(--teal))]">Issued By</h3>
          <p className="mt-1 text-sm text-[#3b4758]">{institution}</p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-[hsl(var(--teal))]">Digital ID Validity Period</h3>
          <dl className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-sm text-[#3b4758]">
              <dt className="font-medium text-[#6b7a89]">Issued on</dt>
              <dd>{issuedOn}</dd>
            </div>
            <div className="flex items-center justify-between text-sm text-[#3b4758]">
              <dt className="font-medium text-[#6b7a89]">Downloaded</dt>
              <dd>{downloadedOn}</dd>
            </div>
            <div className="flex items-center justify-between text-sm text-[#3b4758]">
              <dt className="font-medium text-[#6b7a89]">Refreshes on</dt>
              <dd>{refreshOn}</dd>
            </div>
          </dl>
        </div>
      </div>
    </PopoverContent>
  );
}
