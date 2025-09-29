import React from "react";
import { ChevronRight, Fingerprint, Settings, UserRound } from "lucide-react";
import Header from "../components/Header.jsx";
import SectionCard from "../components/SectionCard.jsx";
import CanadoreWordmark from "../components/CanadoreWordmark.jsx";

const surfaceClass =
  "rounded-2xl border border-[#dfe5ea] bg-white px-5 py-5 text-sm text-[#3b4758] shadow-[0_6px_18px_rgba(15,40,60,0.05)]";

export default function SettingsScreen({ profile, onOpenId, onCancel }) {
  const hasAnnouncements = profile.announcements?.length > 0;
  const hasResources = profile.resources?.length > 0;

  return (
    <div className="min-h-screen bg-[#f5f7f8] font-sans text-[#1f2a37]">
      <Header
        left={
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f7f8e]/10 text-[#0f7f8e]">
            <Fingerprint className="h-6 w-6" strokeWidth={1.8} />
          </div>
        }
        title=""
        right={
          <button
            aria-label="Settings"
            onClick={onCancel}
            className="flex h-12 w-12 items-center justify-center rounded-full text-[#0f7f8e] transition hover:bg-[#0f7f8e]/10"
          >
            <Settings className="h-5 w-5" strokeWidth={1.6} />
          </button>
        }
      />

      <main className="mx-auto flex w-full max-w-md flex-col gap-7 px-5 pb-16">
        <div className="flex flex-col items-center gap-1 pt-2">
          <CanadoreWordmark size="lg" className="drop-shadow-sm" />
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0f7f8e]">
            {profile.institution}
          </span>
        </div>

        <SectionCard
          title="View ID card"
          subtitle="Access your digital student ID"
          onClick={onOpenId}
          icon={<UserRound className="h-6 w-6" strokeWidth={1.7} />}
          trailing={<ChevronRight className="h-5 w-5" strokeWidth={1.5} />}
        />

        <section className="flex flex-col gap-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-[#0f7f8e]">Announcements</h2>
            <div className="grid gap-3">
              {hasAnnouncements
                ? profile.announcements.map((item) => (
                    <div key={item.id} className={`${surfaceClass} leading-relaxed`}>
                      {item.text}
                    </div>
                  ))
                : (
                    <div className={`${surfaceClass} text-center text-[#6c798b]`}>
                      There are no announcements at this time.
                    </div>
                  )}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-[#0f7f8e]">Resources</h2>
            <div className="grid gap-3">
              {hasResources
                ? profile.resources.map((item) => (
                    <div key={item.id} className={`${surfaceClass} leading-relaxed`}>
                      {item.text}
                    </div>
                  ))
                : (
                    <div className={`${surfaceClass} text-center text-[#6c798b]`}>
                      There are no available resources at this time.
                    </div>
                  )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
