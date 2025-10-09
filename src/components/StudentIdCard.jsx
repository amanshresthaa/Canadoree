import React from "react";
import CanadoreWordmark from "./CanadoreWordmark.jsx";
import NorthBayTransitLogo from "./NorthBayTransitLogo.jsx";
import Barcode from "./Barcode.jsx";
import defaultStudentPhotoUrl from "../assets/deepika.jpg";

export default function StudentIdCard({ profile, className = "" }) {
  const {
    photoSrc = defaultStudentPhotoUrl,
    academicYear,
    fullName,
    studentId,
  } = profile;

  return (
    <div
      className={`flex h-full w-full flex-col justify-between gap-6 rounded-md border-[4px] border-[#d51f36] bg-white p-3 shadow-[0_12px_32px_rgba(15,40,60,0.12)] sm:p-4 ${className}`}
    >
      <div className="flex flex-1 flex-col gap-6">
        <div className="grid w-full grid-cols-12 items-stretch gap-0 overflow-hidden">
          <div className="col-span-4 bg-[#d51f36] sm:w-20">
            <div className="flex h-full items-center justify-center">
              <div className="rotate-180 text-4xl font-bold tracking-[0em] text-white [writing-mode:vertical-rl] sm:text-5xl">
                STUDENT
              </div>
            </div>
          </div>

          <div className="col-span-8 flex w-full flex-col items-center justify-center gap-6 pt-12 sm:ml-[-32px] sm:w-72 sm:gap-8 sm:pt-16 sm:pr-5">
            <div>
              <CanadoreWordmark size="lg" />
            </div>

            <div className="w-full overflow-hidden border border-[#e4e8ee]">
              <img
                src={photoSrc}
                alt={fullName}
                className="h-60 w-full object-cover sm:h-64"
              />
            </div>
          </div>
        </div>

        <div className="grid w-full max-w-[20rem] grid-cols-3 self-center">
          <div className="col-span-1 flex justify-center">
            <span className="pl-1 text-[1.05rem] font-semibold text-[#1a1b1b]">
              {academicYear}
            </span>
          </div>
          <div className="col-span-2 flex flex-col justify-center">
            <span className="text-center text-xl font-semibold">{fullName}</span>
            <div className="ml-[-24px] space-y-1 sm:ml-[-32px]">
              <Barcode className="w-full" height={82} />
              <div className="text-center text-sm font-medium uppercase tracking-[0.24em] text-[#373f4d]">
                {studentId}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center pt-4">
        <NorthBayTransitLogo className="h-24 w-auto max-w-[240px]" size={96} />
      </div>
    </div>
  );
}
