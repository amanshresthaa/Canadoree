import React from "react";

export default function Header({ left = null, title = "", right = null }) {
  return (
    <header className="flex items-center justify-between px-5 py-3">
      <div className="flex min-w-[48px] justify-start">{left}</div>
      <div className="text-base font-semibold tracking-tight text-[#0f4051]">{title}</div>
      <div className="flex min-w-[48px] justify-end">{right}</div>
    </header>
  );
}
