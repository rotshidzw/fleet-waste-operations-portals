export default function LoadingPublications() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="h-8 w-64 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
      <div className="mt-3 h-4 w-96 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
      <div className="mt-8 space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-16 animate-pulse rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
          />
        ))}
      </div>
    </div>
  );
}
