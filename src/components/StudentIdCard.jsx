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
    <div className="mx-auto flex w-full max-w-[420px] flex-col rounded-[1.25rem] border-[4px] border-[#d51f36] bg-white px-4 pb-6 pt-5 shadow-[0_12px_32px_rgba(15,40,60,0.12)] sm:px-6 sm:pb-8">
      <div className="flex w-full overflow-hidden rounded-[1rem] border border-[#e4e8ee]">
        <div className="flex flex-none basis-[76px] items-center justify-center bg-[#d51f36] px-2 py-8 sm:basis-[88px] sm:px-3">
          <div className="rotate-180 text-4xl font-bold tracking-[0.02em] text-white sm:text-[2.75rem] [writing-mode:vertical-rl]">
            STUDENT
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center gap-6 px-4 py-8 sm:gap-8 sm:px-6">
          <CanadoreWordmark size="lg" />

          <div className="w-full overflow-hidden rounded-2xl border border-[#e4e8ee] shadow-[0_6px_18px_rgba(15,40,60,0.08)]">
            <img
              src={photoSrc}
              alt={fullName}
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex w-full flex-col items-center gap-4 px-1 sm:px-2">
        <span className="self-start text-sm font-semibold uppercase tracking-[0.12em] text-[#1a1b1b] sm:text-base">
          {academicYear}
        </span>
        <span className="text-center text-2xl font-semibold text-[#1f2a37] sm:text-[1.75rem]">
          {fullName}
        </span>
        <div className="w-full space-y-3">
          <Barcode className="w-full" height={76} />
          <div className="text-center text-xs font-medium uppercase tracking-[0.28em] text-[#373f4d] sm:text-sm">
            {studentId}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center">
        <NorthBayTransitLogo className="h-16 w-auto sm:h-20" size={80} />
      </div>
    </div>
  );
}
