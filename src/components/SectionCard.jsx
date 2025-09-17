import React from "react";

export default function SectionCard({ title, subtitle, icon, trailing = null, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-2xl border border-[#e0e5e9] bg-white px-5 py-4 text-left shadow-[0_6px_18px_rgba(15,40,60,0.08)] transition hover:-translate-y-[1px] hover:shadow-[0_10px_24px_rgba(15,40,60,0.12)] active:scale-[0.99]"
    >
      <div className="flex items-center gap-4">
        {icon ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0f7f8e]/10 text-[#0f7f8e]">
            {icon}
          </div>
        ) : null}
        <div className="space-y-0.5">
          <div className="text-base font-medium text-[#1f2a37]">{title}</div>
          {subtitle ? <div className="text-sm text-[#6b7a89]">{subtitle}</div> : null}
        </div>
      </div>
      {trailing ? <div className="text-[#6b7a89]">{trailing}</div> : null}
    </button>
  );
}
