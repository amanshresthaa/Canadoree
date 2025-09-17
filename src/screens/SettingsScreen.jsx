import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, CheckCircle2, Plus, Trash2, Upload, X } from "lucide-react";
import Header from "../components/Header.jsx";
import defaultSelfie from "../assets/deepika.jpg";

const FIELD_CLASSES =
  "w-full rounded-xl border border-[#cfd7de] bg-white px-4 py-3 text-sm text-[#1f2a37] shadow-[0_4px_12px_rgba(15,40,60,0.04)] focus:border-[#0f7f8e] focus:outline-none focus:ring-2 focus:ring-[#0f7f8e]/30";

const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const ensureList = (items) => (Array.isArray(items) ? items.map((item) => ({ ...item })) : []);

export default function SettingsScreen({ profile, onSave, onCancel }) {
  const fileInputRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState(profile.photoSrc || defaultSelfie);

  const [formState, setFormState] = useState(() => ({
    institution: profile.institution,
    fullName: profile.fullName,
    academicYear: profile.academicYear,
    studentId: profile.studentId,
    issuedOn: profile.issuedOn,
    downloadedOn: profile.downloadedOn,
    refreshOn: profile.refreshOn,
    announcements: ensureList(profile.announcements),
    resources: ensureList(profile.resources),
    photoSrc: profile.photoSrc || defaultSelfie,
  }));

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPhotoPreview(profile.photoSrc || defaultSelfie);
    setFormState({
      institution: profile.institution,
      fullName: profile.fullName,
      academicYear: profile.academicYear,
      studentId: profile.studentId,
      issuedOn: profile.issuedOn,
      downloadedOn: profile.downloadedOn,
      refreshOn: profile.refreshOn,
      announcements: ensureList(profile.announcements),
      resources: ensureList(profile.resources),
      photoSrc: profile.photoSrc || defaultSelfie,
    });
  }, [profile]);

  const listHandlers = useMemo(
    () => ({
      add: (key) => {
        setSaved(false);
        setFormState((prev) => ({
          ...prev,
          [key]: [...prev[key], { id: createId(), text: "" }],
        }));
      },
      update: (key, index, value) => {
        setSaved(false);
        setFormState((prev) => ({
          ...prev,
          [key]: prev[key].map((item, idx) =>
            idx === index ? { ...item, text: value } : item
          ),
        }));
      },
      remove: (key, index) => {
        setSaved(false);
        setFormState((prev) => ({
          ...prev,
          [key]: prev[key].filter((_, idx) => idx !== index),
        }));
      },
    }),
    []
  );

  const handleChange = (key) => (event) => {
    setSaved(false);
    setFormState((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPhotoPreview(reader.result);
        setFormState((prev) => ({ ...prev, photoSrc: reader.result }));
        setSaved(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetPhoto = () => {
    setPhotoPreview(defaultSelfie);
    setFormState((prev) => ({ ...prev, photoSrc: defaultSelfie }));
    setSaved(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const sanitizeList = (items) =>
    items
      .map((item) => ({ ...item, text: item.text.trim() }))
      .filter((item) => item.text.length > 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      ...formState,
      announcements: sanitizeList(formState.announcements),
      resources: sanitizeList(formState.resources),
    };
    onSave(payload);
    setFormState(payload);
    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f7f8] text-[#1f2a37]">
      <Header
        left={
          <button
            onClick={onCancel}
            className="flex h-12 w-12 items-center justify-center rounded-full text-[#0f7f8e] hover:bg-[#0f7f8e]/10"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={1.8} />
          </button>
        }
        title="Settings"
        right={
          saved ? (
            <div className="flex items-center gap-1 text-sm font-medium text-[#1e7f54]">
              <CheckCircle2 className="h-4 w-4" /> Saved
            </div>
          ) : null
        }
      />

      <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-md flex-col gap-6 px-5 pb-20">
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7a89]">Profile photo</h2>
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#dfe5ea] bg-white p-5 shadow-[0_6px_18px_rgba(15,40,60,0.05)]">
            <div className="h-32 w-32 overflow-hidden rounded-3xl border border-[#e6ebf0] bg-[#f5f7f8] shadow-inner">
              <img src={photoPreview} alt="Profile preview" className="h-full w-full object-cover" />
            </div>
            <div className="flex w-full flex-col gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 rounded-full border border-[#0f7f8e] px-4 py-2 text-sm font-semibold text-[#0f7f8e] shadow-[0_8px_20px_rgba(15,40,60,0.08)] transition hover:-translate-y-[1px] hover:shadow-[0_12px_24px_rgba(15,40,60,0.12)]"
              >
                <Upload className="h-4 w-4" /> Upload new
              </button>
              <button
                type="button"
                onClick={handleResetPhoto}
                className="flex items-center justify-center gap-2 rounded-full border border-[#cfd7de] px-4 py-2 text-sm font-semibold text-[#6b7a89] transition hover:bg-[#f4f7fa]"
              >
                <X className="h-4 w-4" /> Reset to default
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="user"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7a89]">Institution</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0f4051]" htmlFor="institution">Institution name</label>
            <input
              id="institution"
              type="text"
              value={formState.institution}
              onChange={handleChange("institution")}
              className={FIELD_CLASSES}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7a89]">Student</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0f4051]" htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              type="text"
              value={formState.fullName}
              onChange={handleChange("fullName")}
              className={FIELD_CLASSES}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0f4051]" htmlFor="academicYear">Academic year</label>
            <input
              id="academicYear"
              type="text"
              value={formState.academicYear}
              onChange={handleChange("academicYear")}
              className={FIELD_CLASSES}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0f4051]" htmlFor="studentId">Student ID number</label>
            <input
              id="studentId"
              type="text"
              value={formState.studentId}
              onChange={handleChange("studentId")}
              className={FIELD_CLASSES}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7a89]">Digital ID validity</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0f4051]" htmlFor="issuedOn">Issued on</label>
            <input
              id="issuedOn"
              type="text"
              value={formState.issuedOn}
              onChange={handleChange("issuedOn")}
              className={FIELD_CLASSES}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0f4051]" htmlFor="downloadedOn">Downloaded</label>
            <input
              id="downloadedOn"
              type="text"
              value={formState.downloadedOn}
              onChange={handleChange("downloadedOn")}
              className={FIELD_CLASSES}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0f4051]" htmlFor="refreshOn">Refreshes on</label>
            <input
              id="refreshOn"
              type="text"
              value={formState.refreshOn}
              onChange={handleChange("refreshOn")}
              className={FIELD_CLASSES}
            />
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7a89]">Announcements</h2>
            <button
              type="button"
              onClick={() => listHandlers.add("announcements")}
              className="flex items-center gap-1 rounded-full border border-[#0f7f8e] px-3 py-1 text-xs font-semibold text-[#0f7f8e] shadow-[0_4px_10px_rgba(15,40,60,0.12)] transition hover:-translate-y-[1px]"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          </div>
          <div className="space-y-3">
            {formState.announcements.length === 0 ? (
              <p className="text-sm text-[#6b7a89]">No announcements yet. Add one to keep students informed.</p>
            ) : null}
            {formState.announcements.map((item, index) => (
              <div key={item.id} className="flex gap-3">
                <textarea
                  value={item.text}
                  onChange={(event) => listHandlers.update("announcements", index, event.target.value)}
                  rows={3}
                  className={`${FIELD_CLASSES} resize-none`}
                  placeholder="Announcement copy"
                />
                <button
                  type="button"
                  onClick={() => listHandlers.remove("announcements", index)}
                  className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-[#f0b4b4] text-[#d51f36] transition hover:bg-[#fff1f1]"
                  aria-label="Remove announcement"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7a89]">Resources</h2>
            <button
              type="button"
              onClick={() => listHandlers.add("resources")}
              className="flex items-center gap-1 rounded-full border border-[#0f7f8e] px-3 py-1 text-xs font-semibold text-[#0f7f8e] shadow-[0_4px_10px_rgba(15,40,60,0.12)] transition hover:-translate-y-[1px]"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          </div>
          <div className="space-y-3">
            {formState.resources.length === 0 ? (
              <p className="text-sm text-[#6b7a89]">No resources added. List helpful links or contacts here.</p>
            ) : null}
            {formState.resources.map((item, index) => (
              <div key={item.id} className="flex gap-3">
                <textarea
                  value={item.text}
                  onChange={(event) => listHandlers.update("resources", index, event.target.value)}
                  rows={3}
                  className={`${FIELD_CLASSES} resize-none`}
                  placeholder="Resource details"
                />
                <button
                  type="button"
                  onClick={() => listHandlers.remove("resources", index)}
                  className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-[#f0b4b4] text-[#d51f36] transition hover:bg-[#fff1f1]"
                  aria-label="Remove resource"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="sticky bottom-5 mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border border-[#cfd7de] bg-white px-4 py-3 text-sm font-semibold text-[#6b7a89] shadow-[0_8px_16px_rgba(15,40,60,0.08)] transition hover:-translate-y-[1px] hover:shadow-[0_12px_20px_rgba(15,40,60,0.12)] active:scale-[0.99]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded-full border border-[#0f7f8e] bg-[#0f7f8e] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,40,60,0.18)] transition hover:-translate-y-[1px] hover:shadow-[0_14px_28px_rgba(15,40,60,0.22)] active:scale-[0.99]"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
