import { CarFront } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-700 via-cyan-600 to-sky-500 p-8 md:p-12 text-white shadow-2xl">

      <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">

        <div className="max-w-2xl">

          <p className="mb-3 inline-flex rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur">
            Vehicle Inventory Management
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Welcome to <span className="text-cyan-200">AutoShelf</span>
          </h1>

          <p className="mt-5 text-blue-100 text-lg leading-relaxed">
            Manage your dealership inventory with a modern dashboard,
            real-time stock updates, and effortless vehicle management.
          </p>

        </div>

        <div className="hidden lg:flex h-44 w-44 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20">

          <CarFront size={90} />

        </div>

      </div>

    </section>
  );
};

export default Hero;