import { CarFront } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 p-16 text-center backdrop-blur-xl">

      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
        <CarFront
          size={48}
          className="text-blue-600 dark:text-cyan-400"
        />
      </div>

      <h2 className="text-3xl font-bold">
        No Vehicles Found
      </h2>

      <p className="mt-3 text-slate-500 dark:text-zinc-400">
        Try changing your search filters or add a new vehicle.
      </p>

    </div>
  );
};

export default EmptyState;