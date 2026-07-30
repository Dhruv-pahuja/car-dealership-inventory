import { Link } from "react-router-dom";
import { TriangleAlert, House } from "lucide-react";

const NotFound = () => {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6">

      <div className="w-full max-w-xl rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 p-10 text-center shadow-xl backdrop-blur-xl">

        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-r from-blue-600 via-cyan-500 to-sky-500 text-white">

          <TriangleAlert size={48} />

        </div>

        <p className="text-lg font-medium text-blue-600 dark:text-cyan-400">
          Error 404
        </p>

        <h1 className="mt-3 text-5xl font-bold">
          Page Not Found
        </h1>

        <p className="mt-5 text-slate-500 dark:text-zinc-400">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 via-cyan-500 to-sky-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <House size={18} />
          Back to Dashboard
        </Link>

      </div>

    </section>
  );
};

export default NotFound;