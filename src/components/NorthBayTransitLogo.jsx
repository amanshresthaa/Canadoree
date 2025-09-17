import React from "react";
import transitUrl from "../assets/transit.png";

export default function NorthBayTransitLogo({ className = "", size = 32 }) {
  const style = {
    height: size,
  };

  return (
    <img
      src={transitUrl}
      alt="North Bay Transit"
      className={`${className}`.trim()}
      style={style}
      draggable={false}
    />
  );
}
