import {
  BadgeIndianRupee,
  Boxes,
  Pencil,
  RotateCcw,
  Trash2,
} from "lucide-react";

const VehicleTable = ({
  vehicles,
  onEdit,
  onDelete,
  onRestock,
}) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 shadow-xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/70">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-slate-200 bg-slate-100/80 dark:border-zinc-800 dark:bg-zinc-800/70">
            <tr className="text-left text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-zinc-300">
              <th className="px-6 py-4">Vehicle</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-20 text-center"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="rounded-3xl bg-slate-100 p-5 dark:bg-zinc-800">
                      <Boxes
                        size={42}
                        className="text-slate-400"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">
                        No vehicles found
                      </h3>

                      <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                        Add your first vehicle to begin managing inventory.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              vehicles.map((vehicle) => (
                <tr
                  key={vehicle._id}
                  className="border-b border-slate-100 transition hover:bg-blue-50/50 dark:border-zinc-800 dark:hover:bg-zinc-800/40"
                >
                  <td className="px-6 py-5">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {vehicle.make} {vehicle.model}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                        #{vehicle._id.slice(-6).toUpperCase()}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300">
                      {vehicle.category}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1 font-semibold">
                      <BadgeIndianRupee size={16} />
                      {Number(vehicle.price).toLocaleString("en-IN")}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        vehicle.quantity === 0
                          ? "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300"
                          : vehicle.quantity < 5
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                      }`}
                    >
                      {vehicle.quantity} in stock
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(vehicle)}
                        className="rounded-xl border border-slate-200 p-2 transition hover:border-blue-500 hover:bg-blue-500 hover:text-white dark:border-zinc-700 dark:hover:border-blue-500"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onRestock(vehicle)}
                        className="rounded-xl border border-slate-200 p-2 transition hover:border-cyan-500 hover:bg-cyan-500 hover:text-white dark:border-zinc-700 dark:hover:border-cyan-500"
                      >
                        <RotateCcw size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(vehicle)}
                        className="rounded-xl border border-slate-200 p-2 transition hover:border-red-500 hover:bg-red-500 hover:text-white dark:border-zinc-700 dark:hover:border-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleTable;