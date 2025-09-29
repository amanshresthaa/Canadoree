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
    <div className="flex justify-center flex-col border-[4px] border-[#d51f36] bg-white shadow-[0_12px_32px_rgba(15,40,60,0.12)] p-1 rounded-md">
      <div className="grid grid-cols-12 justify-center gap-0 w-full overflow-hidden ">
        <div className="w-20 bg-[#d51f36] col-span-4">
          <div className="flex h-full items-center justify-center ">
            <div className="rotate-180 text-5xl font-bold tracking-[0em] text-white [writing-mode:vertical-rl]">
              STUDENT
            </div>
          </div>
        </div>

        <div className="flex flex-col  w-72 justify-center items-center gap-8 pt-16 col-span-8 ml-[-32px] pr-5">
          <div className="">
            <CanadoreWordmark size="lg" />
          </div>

          <div className="overflow-hidden border w-full border-[#e4e8ee]">
            <img
              src={photoSrc}
              alt={fullName}
              className="h-60 w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 w-full max-w-[20rem]">
        <div className="col-span-1 w-[90px] justify-self-center">
          <span className="text-xl font-bold text-[#1a1b1b] pl-1">
            {academicYear}
          </span>
        </div>
        <div className="col-span-2 flex flex-col justify-center">
          <span className="text-xl font-semibold text-center">{fullName}</span>
          <div className="space-y-1  ml-[-32px]">
            <Barcode className="w-full" height={82} />
            <div className="text-center text-sm font-medium uppercase tracking-[0.24em] text-[#373f4d]">
              {studentId}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center pt-2">
        <NorthBayTransitLogo className="h-20 w-auto" size={80} />
      </div>
    </div>
  );
}
