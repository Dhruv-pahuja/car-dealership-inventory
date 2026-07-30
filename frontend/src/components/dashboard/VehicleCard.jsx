import {
  CarFront,
  IndianRupee,
  Package,
  BadgeCheck,
  CircleOff,
} from "lucide-react";

const VehicleCard = ({ vehicle, onPurchase }) => {
  const inStock = vehicle.quantity > 0;

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <div className="relative overflow-hidden bg-linear-to-r from-blue-700 via-cyan-600 to-sky-500 p-8">

        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        <div className="flex justify-between items-start">

          <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur">
            {vehicle.category}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${
              inStock
                ? "bg-emerald-500/20 text-white"
                : "bg-red-500/20 text-white"
            }`}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </span>

        </div>

        <div className="mt-8 flex justify-center">

          <CarFront
            size={96}
            className="text-white transition duration-300 group-hover:scale-110 group-hover:rotate-2"
          />

        </div>

      </div>

      <div className="space-y-5 p-6">

        <div>

          <h2 className="text-2xl font-bold">
            {vehicle.make}
          </h2>

          <p className="mt-1 text-slate-500 dark:text-zinc-400">
            {vehicle.model}
          </p>

        </div>

        <div className="flex items-center gap-2 text-3xl font-bold text-emerald-600">

          <IndianRupee size={28} />

          {vehicle.price.toLocaleString("en-IN")}

        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-100 dark:bg-zinc-800 px-4 py-3">

          <div className="flex items-center gap-2">

            <Package
              size={18}
              className="text-blue-600"
            />

            <span className="font-medium">
              Stock
            </span>

          </div>

          <span className="font-bold">
            {vehicle.quantity}
          </span>

        </div>

        <button
          onClick={() => onPurchase(vehicle._id)}
          disabled={!inStock}
          className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3 font-semibold transition-all duration-300 ${
            inStock
              ? "bg-linear-to-r from-blue-700 via-cyan-600 to-sky-500 text-white hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02]"
              : "cursor-not-allowed bg-slate-300 dark:bg-zinc-700 text-slate-500"
          }`}
        >
          {inStock ? (
            <>
              <BadgeCheck size={18} />
              Purchase Vehicle
            </>
          ) : (
            <>
              <CircleOff size={18} />
              Out of Stock
            </>
          )}
        </button>

      </div>

    </article>
  );
};

export default VehicleCard;