import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, MoreVertical } from "lucide-react";
import Header from "../components/Header.jsx";
import StudentIdCard from "../components/StudentIdCard.jsx";
import InfoPopover from "../components/InfoPopover.jsx";
import ActionSheet from "../components/ActionSheet.jsx";

export default function IdCardScreen({ profile, onBack, onPhotoUpdate }) {
  const [showInfo, setShowInfo] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [selfiePreview, setSelfiePreview] = useState(profile.photoSrc);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setSelfiePreview(profile.photoSrc);
  }, [profile.photoSrc]);

  const blurred = showInfo || showSheet;

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
        onPhotoUpdate(reader.result);
        setShowSheet(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const cardProfile = { ...profile, photoSrc: selfiePreview };

  return (
    <div className="relative min-h-screen bg-[#f5f7f8] text-[#1f2a37]">
      <Header
        left={
          <button
            onClick={onBack}
            className="flex h-12 w-12 items-center justify-center rounded-full text-[#0f7f8e] hover:bg-[#0f7f8e]/10"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={1.8} />
          </button>
        }
        title="My ID card"
        right={
          <button
            onClick={() => setShowSheet(true)}
            className="flex h-12 w-12 items-center justify-center rounded-full text-[#0f7f8e] hover:bg-[#0f7f8e]/10"
            aria-label="More actions"
          >
            <MoreVertical className="h-5 w-5" strokeWidth={1.8} />
          </button>
        }
      />

      <div className="relative mx-auto w-full max-w-md px-6 pb-28 pt-4">
        <div
          className={`transition duration-300 ease-out ${
            blurred ? "scale-[0.98] opacity-60 blur-[1.5px]" : "scale-100 opacity-100 blur-0"
          }`}
        >
          <StudentIdCard profile={cardProfile} />
        </div>

        <button
          onClick={() => setShowInfo((value) => !value)}
          aria-pressed={showInfo}
          aria-label="Show card information"
          className={`info-pulse absolute right-10 top-10 z-20 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0f7f8e] bg-white text-lg font-semibold text-[#0f7f8e] shadow-[0_10px_24px_rgba(15,40,60,0.15)] transition ${
            showInfo ? "bg-[#0f7f8e]/10" : ""
          }`}
        >
          <span className="-mt-0.5">i</span>
        </button>

        <InfoPopover open={showInfo} profile={profile} />
      </div>

      <ActionSheet
        open={showSheet}
        onClose={() => setShowSheet(false)}
        onRetake={handleRetakeRequest}
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
