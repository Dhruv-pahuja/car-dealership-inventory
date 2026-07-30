import { useEffect, useState } from "react";
import { CarFront, Save, X } from "lucide-react";

const initialState = {
    make: "",
    model: "",
    category: "",
    price: "",
    quantity: "",
};

const categories = [
    "Sedan",
    "SUV",
    "Hatchback",
    "Coupe",
    "Truck",
    "Van",
    "Bike",
];

const VehicleForm = ({
    selectedVehicle,
    onSubmit,
    onCancel,
    loading,
}) => {
    const [formData, setFormData] = useState(() =>
        selectedVehicle
            ? {
                make: selectedVehicle.make,
                model: selectedVehicle.model,
                category: selectedVehicle.category,
                price: selectedVehicle.price,
                quantity: selectedVehicle.quantity,
            }
            : initialState
    );

    useEffect(() => {
        queueMicrotask(() => {
            setFormData(
                selectedVehicle
                    ? {
                        make: selectedVehicle.make,
                        model: selectedVehicle.model,
                        category: selectedVehicle.category,
                        price: selectedVehicle.price,
                        quantity: selectedVehicle.quantity,
                    }
                    : initialState
            );
        });
    }, [selectedVehicle]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "price" || name === "quantity"
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(formData);

        if (!selectedVehicle) {
            setFormData(initialState);
        }
    };

    return (
        <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl shadow-xl p-8">

            <div className="mb-8 flex items-center gap-4">

                <div className="rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 p-3 text-white">
                    <CarFront size={28} />
                </div>

                <div>
                    <h2 className="text-2xl font-bold">
                        {selectedVehicle ? "Update Vehicle" : "Add New Vehicle"}
                    </h2>

                    <p className="text-slate-500 dark:text-zinc-400">
                        Manage dealership inventory
                    </p>
                </div>

            </div>

            <form
                onSubmit={handleSubmit}
                className="grid gap-6 md:grid-cols-2"
            >

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Make
                    </label>

                    <input
                        required
                        name="make"
                        value={formData.make}
                        onChange={handleChange}
                        placeholder="Toyota"
                        className="w-full rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Model
                    </label>

                    <input
                        required
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder="Corolla"
                        className="w-full rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Category
                    </label>

                    <select
                        required
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">
                            Select Category
                        </option>

                        {categories.map((category) => (
                            <option
                                key={category}
                                value={category}
                            >
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Price
                    </label>

                    <input
                        required
                        min={1}
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="1800000"
                        className="w-full rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Quantity
                    </label>

                    <input
                        required
                        min={0}
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="10"
                        className="w-full rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-end gap-3">

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-60"
                    >
                        <Save size={18} />

                        {selectedVehicle ? "Update Vehicle" : "Add Vehicle"}
                    </button>

                    {selectedVehicle && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-zinc-700 px-6 py-3 font-medium transition hover:bg-slate-100 dark:hover:bg-zinc-800"
                        >
                            <X size={18} />
                            Cancel
                        </button>
                    )}

                </div>

            </form>

        </div>
    );
};

export default VehicleForm;