import React, { useEffect, useState } from "react";
import HomeScreen from "./screens/HomeScreen.jsx";
import IdCardScreen from "./screens/IdCardScreen.jsx";
import SettingsScreen from "./screens/SettingsScreen.jsx";
import InstallPrompt from "./components/InstallPrompt.jsx";
import defaultSelfie from "./assets/deepika.jpg";

const STORAGE_KEY = "canadore-profile";
const INSTALL_DISMISSED_KEY = "canadore-install-dismissed";

const defaultProfile = {
  institution: "Canadore College",
  fullName: "Deepika Dhital",
  academicYear: "25/26",
  studentId: "A00185449",
  issuedOn: "Sep 11, 2025, 9:40am",
  downloadedOn: "Sep 11, 2025, 10:42am",
  refreshOn: "Sep 18, 2025, 10:42am",
  photoSrc: defaultSelfie,
  announcements: [],
  resources: [],
};

export default function App() {
  const [view, setView] = useState("home");
  const [profile, setProfile] = useState(defaultProfile);
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [installMode, setInstallMode] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfile({
          ...defaultProfile,
          ...parsed,
          announcements: parsed.announcements ?? [],
          resources: parsed.resources ?? [],
          photoSrc: parsed.photoSrc ?? defaultSelfie,
        });
      }
    } catch (error) {
      console.error("Failed to restore profile", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error("Failed to persist profile", error);
    }
  }, [profile]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPromptEvent(event);
      setInstallMode("default");
      if (!window.localStorage.getItem(INSTALL_DISMISSED_KEY)) {
        setTimeout(() => setShowInstallPrompt(true), 600);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = window.localStorage.getItem(INSTALL_DISMISSED_KEY);
    if (dismissed) return;

    const userAgent = window.navigator.userAgent;
    const isiOS = /iphone|ipad|ipod/i.test(userAgent);
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isiOS && !isStandalone) {
      setInstallMode("ios");
      setTimeout(() => setShowInstallPrompt(true), 800);
    }
  }, []);

  const handleProfileSave = (changes) => {
    setProfile((prev) => {
      const next = {
        ...prev,
        ...changes,
      };
      next.photoSrc = changes.photoSrc ?? prev.photoSrc;
      next.announcements = changes.announcements ?? prev.announcements;
      next.resources = changes.resources ?? prev.resources;
      return next;
    });
  };

  const handlePhotoUpdate = (photoDataUrl) => {
    if (!photoDataUrl) return;
    setProfile((prev) => ({ ...prev, photoSrc: photoDataUrl }));
  };

  const closeInstallPrompt = () => {
    setShowInstallPrompt(false);
    setInstallPromptEvent(null);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(INSTALL_DISMISSED_KEY, "1");
    }
  };

  const handleInstall = async () => {
    if (installMode === "default" && installPromptEvent) {
      installPromptEvent.prompt();
      try {
        await installPromptEvent.userChoice;
      } catch (error) {
        console.error("Install prompt failed", error);
      }
    }
    closeInstallPrompt();
  };

  return (
    <div className="flex w-full max-w-[430px] flex-col bg-[#f5f7f8]">
      {view === "home" && (
        <HomeScreen
          profile={profile}
          onOpenId={() => setView("card")}
          onOpenSettings={() => setView("settings")}
        />
      )}
      {view === "card" && (
        <IdCardScreen
          profile={profile}
          onBack={() => setView("home")}
          onPhotoUpdate={handlePhotoUpdate}
        />
      )}
      {view === "settings" && (
        <SettingsScreen
          profile={profile}
          onSave={(data) => {
            handleProfileSave(data);
            setView("home");
          }}
          onCancel={() => setView("home")}
        />
      )}

      {showInstallPrompt && installMode && (
        <InstallPrompt
          mode={installMode}
          onInstall={handleInstall}
          onDismiss={closeInstallPrompt}
        />
      )}
    </div>
  );
}
