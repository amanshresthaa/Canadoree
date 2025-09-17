import React from "react";
import CanadoreWordmark from "./CanadoreWordmark.jsx";
import NorthBayTransitLogo from "./NorthBayTransitLogo.jsx";
import Barcode from "./Barcode.jsx";
import defaultStudentPhotoUrl from "../assets/deepika.jpg";

export default function StudentIdCard({ profile }) {
  const {
    photoSrc = defaultStudentPhotoUrl,
    academicYear,
    fullName,
    studentId,
  } = profile;

  return (
    <div className="relative mx-auto w-full max-w-[20.5rem] overflow-hidden rounded-2xl border-[3px] border-[#d51f36] bg-white shadow-[0_12px_32px_rgba(15,40,60,0.12)]">
      <div className="absolute inset-y-0 left-0 w-16 bg-[#d51f36]">
        <div className="flex h-full items-center justify-center">
          <div className="rotate-180 text-xl font-semibold tracking-[0.3em] text-white [writing-mode:vertical-rl]">
            STUDENT
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-6 pb-6 pt-6 pl-[5.5rem]">
        <div className="flex flex-col gap-2">
          <CanadoreWordmark size="md" />
        </div>

        <div className="overflow-hidden rounded-[14px] border border-[#e4e8ee]">
          <img src={photoSrc} alt={fullName} className="h-48 w-full object-cover" />
        </div>

        <div className="flex items-baseline justify-between gap-4 text-[#1f2a37]">
          <span className="text-base font-semibold text-[#404b5a]">{academicYear}</span>
          <span className="text-xl font-semibold">{fullName}</span>
        </div>

        <div className="space-y-3">
          <Barcode className="w-full" height={82} />
          <div className="text-center text-sm font-medium uppercase tracking-[0.24em] text-[#373f4d]">
            {studentId}
          </div>
        </div>

        <div className="flex items-center justify-center pt-2">
          <NorthBayTransitLogo className="h-12 w-auto" size={48} />
        </div>
      </div>
    </div>
  );
}
