import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Fingerprint, Settings, UserRound } from "lucide-react";
import Header from "../components/Header.jsx";
import SectionCard from "../components/SectionCard.jsx";
import CanadoreWordmark from "../components/CanadoreWordmark.jsx";

export default function HomeScreen({ profile, onOpenId, onOpenSettings }) {
  const hasAnnouncements = profile.announcements?.length > 0;
  const hasResources = profile.resources?.length > 0;

  return (
    <div className="flex min-h-[100dvh] w-full flex-col bg-[#f5f7f8] font-sans text-[#1f2a37]">
      <Header
        left={
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--teal))]/10 text-[hsl(var(--teal))]">
            <Fingerprint className="h-6 w-6" strokeWidth={1.8} />
          </div>
        }
        title=""
        right={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Settings"
            onClick={onOpenSettings}
            className="rounded-full text-[hsl(var(--teal))] hover:bg-[hsl(var(--teal))]/10"
          >
            <Settings className="h-5 w-5" strokeWidth={1.6} />
          </Button>
        }
      />

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-7 px-5 pb-16">
        <div className="flex flex-col items-center gap-1 pt-2">
          <CanadoreWordmark size="lg" className="drop-shadow-sm" />
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(var(--teal))]">
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
            <h2 className="text-lg font-semibold text-[hsl(var(--teal))]">Announcements</h2>
            <div className="grid gap-3">
              {hasAnnouncements
                ? profile.announcements.map((item) => (
                    <Card
                      key={item.id}
                      className="rounded-2xl border-[#dfe5ea] bg-white px-5 py-5 text-sm text-[#3b4758] shadow-[0_6px_18px_rgba(15,40,60,0.05)]"
                    >
                      {item.text}
                    </Card>
                  ))
                : (
                    <Alert className="rounded-2xl border-[#dfe5ea] bg-white/90 px-5 py-5 text-[#6c798b] shadow-[0_6px_18px_rgba(15,40,60,0.05)]">
                      <AlertDescription>
                        There are no announcements at this time.
                      </AlertDescription>
                    </Alert>
                  )}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-[hsl(var(--teal))]">Resources</h2>
            <div className="grid gap-3">
              {hasResources
                ? profile.resources.map((item) => (
                    <Card
                      key={item.id}
                      className="rounded-2xl border-[#dfe5ea] bg-white px-5 py-5 text-sm text-[#3b4758] shadow-[0_6px_18px_rgba(15,40,60,0.05)]"
                    >
                      {item.text}
                    </Card>
                  ))
                : (
                    <Alert className="rounded-2xl border-[#dfe5ea] bg-white/90 px-5 py-5 text-[#6c798b] shadow-[0_6px_18px_rgba(15,40,60,0.05)]">
                      <AlertDescription>
                        There are no available resources at this time.
                      </AlertDescription>
                    </Alert>
                  )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
