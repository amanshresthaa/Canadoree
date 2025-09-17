import React from "react";
import barcodeUrl from "../assets/barcode.png";

export default function Barcode({ className = "", height = 80, width }) {
  const style = {
    height,
    width,
  };

  return (
    <img
      src={barcodeUrl}
      alt="Student barcode"
      className={`select-none ${className}`.trim()}
      style={style}
      draggable={false}
    />
  );
}
