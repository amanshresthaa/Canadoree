import React from "react";

export default function InfoPopover({ open, profile }) {
  if (!open) return null;

  const {
    institution,
    issuedOn,
    downloadedOn,
    refreshOn,
  } = profile;

  return (
    <div className="pointer-events-auto absolute inset-x-6 top-4 z-30">
      <div className="rounded-2xl border border-[#0f7f8e] bg-white/95 px-5 py-4 text-sm text-[#1f2a37] shadow-[0_16px_36px_rgba(11,42,62,0.15)]">
        <div className="space-y-3">
          <div>
            <h3 className="text-base font-semibold text-[#0f7f8e]">Issued By</h3>
            <p className="mt-1 text-sm text-[#3b4758]">{institution}</p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#0f7f8e]">Digital ID Validity Period</h3>
            <dl className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-sm text-[#3b4758]">
                <dt className="font-medium text-[#6b7a89]">Issued on</dt>
                <dd>{issuedOn}</dd>
              </div>
              <div className="flex items-center justify-between text-sm text-[#3b4758]">
                <dt className="font-medium text-[#6b7a89]">Downloaded</dt>
                <dd>{downloadedOn}</dd>
              </div>
              <div className="flex items-center justify-between text-sm text-[#3b4758]">
                <dt className="font-medium text-[#6b7a89]">Refreshes on</dt>
                <dd>{refreshOn}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
