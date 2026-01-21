"use client";

import { useState } from "react";

export function CookieNotice() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-lg bg-slate-900 px-4 py-3 text-xs text-white shadow-lg md:left-auto md:right-6 md:max-w-sm">
      <p>
        We use cookies to enhance your experience and support analytics. By continuing, you agree to
        our cookie notice.
      </p>
      <button
        className="mt-2 inline-flex items-center rounded bg-njilo-orange px-3 py-1 text-xs font-semibold"
        onClick={() => setVisible(false)}
      >
        स्वीकार / Accept
      </button>
    </div>
  );
}
