import React, { useMemo, useState } from "react";
import IdCardScreen from "./screens/IdCardScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import SettingsScreen from "./screens/SettingsScreen.jsx";
import defaultStudentPhotoUrl from "./assets/deepika.jpg";

const initialProfile = {
  fullName: "Pratiksha Manandhar",
  studentId: "C12345678",
  academicYear: "25/26",
  institution: "Canadore College",
  issuedOn: "Aug 21, 2024",
  downloadedOn: "Aug 21, 2024",
  refreshOn: "Jan 21, 2025",
  announcements: [
    { id: "fall-orientation", text: "Fall orientation begins September 3rd." },
    { id: "library-hours", text: "Library extended hours during midterms." },
  ],
  resources: [
    { id: "student-portal", text: "Access the student portal at portal.canadorecollege.ca." },
  ],
  photoSrc: defaultStudentPhotoUrl,
};

const formatDate = (date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function App() {
  const [profile, setProfile] = useState(initialProfile);
  const [screenStack, setScreenStack] = useState(["home", "id"]);

  const activeScreen = useMemo(
    () => screenStack[screenStack.length - 1] ?? "id",
    [screenStack]
  );

  const navigateTo = (screen) => {
    setScreenStack((prev) =>
      prev[prev.length - 1] === screen ? prev : [...prev, screen]
    );
  };

  const goBack = () => {
    setScreenStack((prev) =>
      prev.length > 1 ? prev.slice(0, prev.length - 1) : prev
    );
  };

  const handlePhotoUpdate = (nextPhotoSrc) => {
    if (!nextPhotoSrc) return;
    setProfile((prev) => ({ ...prev, photoSrc: nextPhotoSrc }));
  };

  const handleProfileRefresh = () => {
    const now = new Date();
    const fourMonthsLater = new Date(now);
    fourMonthsLater.setMonth(fourMonthsLater.getMonth() + 4);

    setProfile((prev) => ({
      ...prev,
      downloadedOn: formatDate(now),
      refreshOn: formatDate(fourMonthsLater),
    }));
  };

  if (activeScreen === "home") {
    return (
      <HomeScreen
        profile={profile}
        onOpenId={() => navigateTo("id")}
        onOpenSettings={() => navigateTo("settings")}
      />
    );
  }

  if (activeScreen === "settings") {
    return (
      <SettingsScreen
        profile={profile}
        onOpenId={() => navigateTo("id")}
        onCancel={goBack}
      />
    );
  }

  return (
    <IdCardScreen
      profile={profile}
      onBack={goBack}
      onPhotoUpdate={handlePhotoUpdate}
      onRefresh={handleProfileRefresh}
    />
  );
}
