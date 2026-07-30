const LoadingGrid = () => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 shadow-lg"
        >
          <div className="h-44 animate-pulse bg-slate-200 dark:bg-zinc-800" />

          <div className="space-y-4 p-6">
            <div className="h-6 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />

            <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />

            <div className="h-10 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />

            <div className="h-12 animate-pulse rounded-xl bg-slate-200 dark:bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingGrid;