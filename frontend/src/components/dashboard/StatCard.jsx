const StatCard = ({
  title,
  value,
  icon,
  color,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-lg shadow-md hover:shadow-xl transition-all duration-300 p-6">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-sm text-slate-500 dark:text-zinc-400">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

        </div>

        <div
          className={`rounded-2xl p-4 ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
};

export default StatCard;