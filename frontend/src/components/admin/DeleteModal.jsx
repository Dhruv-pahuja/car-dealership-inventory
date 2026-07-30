import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";

const DeleteModal = ({
  open,
  vehicle,
  loading,
  onClose,
  onConfirm,
}) => {
  if (!open || !vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-start justify-between border-b border-slate-200 p-6 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-red-100 p-3 text-red-600 dark:bg-red-500/15 dark:text-red-400">
              <AlertTriangle size={28} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Delete Vehicle
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-zinc-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-500/20 dark:bg-red-500/10">
            <p className="text-sm leading-7 text-slate-700 dark:text-zinc-300">
              Are you sure you want to permanently remove
              <span className="mx-1 font-semibold text-slate-900 dark:text-white">
                {vehicle.make} {vehicle.model}
              </span>
              from your inventory?
            </p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-4 dark:bg-zinc-800">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500 dark:text-zinc-400">
                  Category
                </p>

                <p className="mt-1 font-semibold">
                  {vehicle.category}
                </p>
              </div>

              <div>
                <p className="text-slate-500 dark:text-zinc-400">
                  Stock
                </p>

                <p className="mt-1 font-semibold">
                  {vehicle.quantity}
                </p>
              </div>

              <div>
                <p className="text-slate-500 dark:text-zinc-400">
                  Price
                </p>

                <p className="mt-1 font-semibold">
                  ₹{Number(vehicle.price).toLocaleString("en-IN")}
                </p>
              </div>

              <div>
                <p className="text-slate-500 dark:text-zinc-400">
                  ID
                </p>

                <p className="mt-1 truncate font-medium">
                  {vehicle._id}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-300 px-5 py-3 font-medium transition hover:bg-slate-100 disabled:opacity-60 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={18} />
                  Delete Vehicle
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;