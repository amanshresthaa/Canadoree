import React from "react";
import { ChevronRight, Settings, UserRound } from "lucide-react";
import CanadoreWordmark from "../components/CanadoreWordmark.jsx";

// Standalone base mobile screen using existing assets/components.
// Does not alter app flow; not imported elsewhere.
export default function BasePrototype() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[375px] bg-white font-sans text-[#1f2a37]">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white px-5 pt-5 pb-4">
        <div
          aria-hidden
          className="relative flex h-12 w-12 items-center justify-center rounded-full"
          style={{
            background:
              "linear-gradient(45deg, rgb(46,125,138) 0%, rgb(74,155,168) 100%)",
          }}
        >
          <div className="relative h-5 w-6 rounded-t-full bg-white" />
          <div className="absolute left-1/2 top-1/2 h-4 w-[18px] -translate-x-1/2 -translate-y-[45%] rounded-t-full bg-[rgb(46,125,138)]" />
        </div>
        <div className="text-[#2E7D8A]">
          <Settings className="h-7 w-7" fill="currentColor" strokeWidth={0} />
        </div>
      </div>

      {/* Main Logo */}
      <div className="bg-white px-5 py-5 text-center">
        <div className="mb-1 flex items-center justify-center gap-2">
          {/* Use app asset via component */}
          <CanadoreWordmark size="lg" />
        </div>
        <div className="-mt-0.5 text-base font-normal text-[#666]">college.ca</div>
      </div>

      {/* ID Card Button */}
      <div className="bg-white px-5 pb-7">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-xl bg-[#f8f9fa] px-5 py-5 text-left shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#2E7D8A] text-white">
              <UserRound className="h-6 w-6" strokeWidth={1.8} />
            </div>
            <div className="text-[18px] font-medium text-[#2E7D8A]">View ID card</div>
          </div>
          <ChevronRight className="h-5 w-5 text-[#999]" strokeWidth={1.6} />
        </button>
      </div>

      {/* Content Sections */}
      <div className="space-y-2 bg-[#f8f9fa] px-5 py-6">
        <h2 className="mb-4 text-[24px] font-semibold text-[#2E7D8A]">Announcements</h2>
        <p className="text-[16px] leading-snug text-[#999]">There are no announcements at this time.</p>
      </div>

      <div className="space-y-2 bg-[#f8f9fa] px-5 py-6">
        <h2 className="mb-4 text-[24px] font-semibold text-[#2E7D8A]">Resources</h2>
        <p className="text-[16px] leading-snug text-[#999]">There are no available resources at this time.</p>
      </div>

      {/* Bottom Navigation Indicator */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-md bg-black" />
    </div>
  );
}

