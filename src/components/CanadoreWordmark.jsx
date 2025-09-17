import React from "react";
import logoUrl from "../assets/logo.png";

export default function CanadoreWordmark({ size = "md", className = "" }) {
  const sizes = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  };

  return (
    <img
      src={logoUrl}
      alt="Canadore College"
      className={`${sizes[size] ?? sizes.md} w-auto ${className}`.trim()}
      draggable={false}
    />
  );
}
