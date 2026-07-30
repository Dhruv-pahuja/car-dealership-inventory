import { useState } from "react";
import {
  Boxes,
  Loader2,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";

const RestockModal = ({
  open,
  vehicle,
  loading,
  onClose,
  onConfirm,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!open || !vehicle) return null;

  const handleClose = () => {
    setQuantity(1);
    onClose();
  };

  const handleSubmit = () => {
    if (quantity <= 0) return;

    onConfirm(quantity);
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-start justify-between border-b border-slate-200 p-6 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 p-3 text-white">
              <RotateCcw size={26} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Restock Vehicle
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                Increase available inventory.
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            disabled={loading}
            className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-zinc-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-cyan-500/20 dark:bg-cyan-500/10">
            <h3 className="font-semibold">
              {vehicle.make} {vehicle.model}
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500 dark:text-zinc-400">
                  Category
                </p>

                <p className="mt-1 font-medium">
                  {vehicle.category}
                </p>
              </div>

              <div>
                <p className="text-slate-500 dark:text-zinc-400">
                  Current Stock
                </p>

                <div className="mt-1 flex items-center gap-2 font-semibold">
                  <Boxes size={16} />
                  {vehicle.quantity}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Quantity to Add
            </label>

            <div className="flex items-center overflow-hidden rounded-2xl border border-slate-300 dark:border-zinc-700">
              <button
                type="button"
                disabled={loading || quantity <= 1}
                onClick={() =>
                  setQuantity((prev) => Math.max(1, prev - 1))
                }
                className="px-5 py-4 text-xl transition hover:bg-slate-100 disabled:opacity-50 dark:hover:bg-zinc-800"
              >
                −
              </button>

              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.max(1, Number(e.target.value) || 1)
                  )
                }
                className="w-full border-x border-slate-300 bg-transparent py-4 text-center text-lg font-semibold outline-none dark:border-zinc-700"
              />

              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  setQuantity((prev) => prev + 1)
                }
                className="px-5 py-4 transition hover:bg-slate-100 dark:hover:bg-zinc-800"
              >
                <Plus size={18} />
              </button>
            </div>

            <p className="mt-3 text-sm text-slate-500 dark:text-zinc-400">
              New stock after restocking:{" "}
              <span className="font-semibold text-blue-600 dark:text-cyan-400">
                {vehicle.quantity + quantity}
              </span>
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleClose}
              disabled={loading}
              className="rounded-xl border border-slate-300 px-5 py-3 font-medium transition hover:bg-slate-100 disabled:opacity-60 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-5 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Restocking...
                </>
              ) : (
                <>
                  <RotateCcw size={18} />
                  Restock Vehicle
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestockModal;