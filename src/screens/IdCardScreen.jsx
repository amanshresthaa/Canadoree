import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, MoreVertical } from "lucide-react";
import Header from "../components/Header.jsx";
import StudentIdCard from "../components/StudentIdCard.jsx";
import InfoPopover from "../components/InfoPopover.jsx";
import ActionSheet from "../components/ActionSheet.jsx";

export default function IdCardScreen({ profile, onBack, onPhotoUpdate, onRefresh }) {
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoButtonVisible, setInfoButtonVisible] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [selfiePreview, setSelfiePreview] = useState(profile.photoSrc);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setSelfiePreview(profile.photoSrc);
  }, [profile.photoSrc]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setInfoButtonVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const blurred = infoOpen || showSheet;
  const canGoBack = typeof onBack === "function";
  const canUpdatePhoto = typeof onPhotoUpdate === "function";

  const handleRetakeRequest = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleSelfieSelected = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSelfiePreview(reader.result);
        if (canUpdatePhoto) {
          onPhotoUpdate(reader.result);
        }
        setShowSheet(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const cardProfile = { ...profile, photoSrc: selfiePreview };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col bg-[#f5f7f8] text-[#1f2a37]">
      <Header
        variant="mobile"
        left={
          canGoBack ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onBack}
              aria-label="Go back"
              className="rounded-full text-[hsl(var(--teal))] hover:bg-[hsl(var(--teal))]/10"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={1.8} />
            </Button>
          ) : null
        }
        title="My ID card"
        right={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowSheet(true)}
            aria-label="More actions"
            className="rounded-full text-[hsl(var(--teal))] hover:bg-[hsl(var(--teal))]/10"
          >
            <MoreVertical className="h-5 w-5" strokeWidth={1.8} />
          </Button>
        }
      />

      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-28 pt-4">
        <div
          className={`transition duration-300 ease-out ${
            blurred ? "scale-[0.98] opacity-60 blur-[1.5px]" : "scale-100 opacity-100 blur-0"
          }`}
        >
          <StudentIdCard profile={cardProfile} />
        </div>

        <Popover open={infoOpen} onOpenChange={setInfoOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="pulse"
              size="pulse"
              aria-pressed={infoOpen}
              aria-label="Show card information"
              className={`absolute right-12 top-0 z-20 ${
                infoButtonVisible ? "opacity-100" : "opacity-0"
              } transition-all duration-300 ease-out`}
              style={{
                transform: infoButtonVisible ? "scale(1)" : "scale(0.75)",
                transformOrigin: "center",
              }}
            >
              <span className="info-pulse__inner flex h-full w-full items-center justify-center">
                <span className="-mt-0.5 icon-i">i</span>
              </span>
            </Button>
          </PopoverTrigger>
          <InfoPopover profile={profile} />
        </Popover>
      </div>

      <ActionSheet
        open={showSheet}
        onClose={() => setShowSheet(false)}
        onRetake={handleRetakeRequest}
        onRefresh={onRefresh}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={handleSelfieSelected}
      />
    </div>
  );
}
