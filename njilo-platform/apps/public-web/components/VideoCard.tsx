"use client";

import { useState } from "react";

function toEmbedUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return "";

  const youtubeMatch = trimmed.match(/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/))([\w-]{6,})/i);
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  const vimeoMatch = trimmed.match(/vimeo.com\/(\d+)/i);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return trimmed;
}

type VideoCardProps = {
  title: string;
  url: string;
};

export function VideoCard({ title, url }: VideoCardProps) {
  const [status, setStatus] = useState<"idle" | "copied">("idle");
  const embedUrl = toEmbedUrl(url);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (error) {
      setStatus("idle");
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-slate-100">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">Paste a video link</div>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-300">{url}</p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 transition hover:border-blue-600 hover:text-blue-700 dark:border-slate-700 dark:text-slate-200"
        >
          {status === "copied" ? "Copied" : "Share"}
        </button>
      </div>
    </div>
  );
}
