import { useEffect, useMemo, useState } from "react";
import {
    CarFront,
    Boxes,
    IndianRupee,
    Layers3,
    PlusCircle,
    Search,
} from "lucide-react";

import VehicleForm from "../components/admin/VehicleForm";
import VehicleTable from "../components/admin/VehicleTable";
import DeleteModal from "../components/admin/DeleteModal";
import RestockModal from "../components/admin/RestockModal";

import {
    getVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    restockVehicle,
} from "../services/vehicleService";

const Admin = () => {
    const [vehicles, setVehicles] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [search, setSearch] = useState("");

    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const [deleteVehicleData, setDeleteVehicleData] = useState(null);
    const [restockVehicleData, setRestockVehicleData] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [restockOpen, setRestockOpen] = useState(false);

    const fetchVehicles = async () => {
        try {
            setLoading(true);

            const data = await getVehicles();

            setVehicles(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const load = async () => {
            await fetchVehicles();
        };

        load();
    }, []);

    const filteredVehicles = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return vehicles;

        return vehicles.filter((vehicle) => {
            return (
                vehicle.make.toLowerCase().includes(query) ||
                vehicle.model.toLowerCase().includes(query) ||
                vehicle.category.toLowerCase().includes(query)
            );
        });
    }, [vehicles, search]);

    const handleSubmit = async (vehicleData) => {
        try {
            setSaving(true);

            if (selectedVehicle) {
                await updateVehicle(selectedVehicle._id, vehicleData);
            } else {
                await addVehicle(vehicleData);
            }

            setSelectedVehicle(null);

            await fetchVehicles();
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteVehicleData) return;

        try {
            setSaving(true);

            await deleteVehicle(deleteVehicleData._id);

            setDeleteOpen(false);
            setDeleteVehicleData(null);

            await fetchVehicles();
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleRestock = async (quantity) => {
        if (!restockVehicleData) return;

        try {
            setSaving(true);

            await restockVehicle(restockVehicleData._id, quantity);

            setRestockOpen(false);
            setRestockVehicleData(null);

            await fetchVehicles();
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const stats = useMemo(() => {
        const totalVehicles = vehicles.length;

        const totalStock = vehicles.reduce(
            (sum, vehicle) => sum + vehicle.quantity,
            0
        );

        const inventoryValue = vehicles.reduce(
            (sum, vehicle) => sum + vehicle.price * vehicle.quantity,
            0
        );

        const categories = new Set(
            vehicles.map((vehicle) => vehicle.category)
        ).size;

        return [
            {
                title: "Vehicles",
                value: totalVehicles,
                icon: CarFront,
                gradient: "from-blue-600 to-cyan-500",
            },
            {
                title: "Stock",
                value: totalStock,
                icon: Boxes,
                gradient: "from-cyan-500 to-sky-500",
            },
            {
                title: "Categories",
                value: categories,
                icon: Layers3,
                gradient: "from-indigo-500 to-blue-500",
            },
            {
                title: "Inventory Value",
                value: `₹${inventoryValue.toLocaleString("en-IN")}`,
                icon: IndianRupee,
                gradient: "from-emerald-500 to-cyan-500",
            },
        ];
    }, [vehicles]);

    return (
        <>
            <DeleteModal
                open={deleteOpen}
                vehicle={deleteVehicleData}
                loading={saving}
                onClose={() => {
                    if (saving) return;
                    setDeleteOpen(false);
                    setDeleteVehicleData(null);
                }}
                onConfirm={handleDelete}
            />

            <RestockModal
                open={restockOpen}
                vehicle={restockVehicleData}
                loading={saving}
                onClose={() => {
                    if (saving) return;
                    setRestockOpen(false);
                    setRestockVehicleData(null);
                }}
                onConfirm={handleRestock}
            />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-linear-to-r from-blue-600 via-cyan-500 to-sky-500 p-8 text-white shadow-2xl">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <span className="rounded-full bg-white/15 px-4 py-1 text-sm font-medium backdrop-blur">
                                Admin Dashboard
                            </span>

                            <h1 className="mt-4 text-4xl font-bold">
                                Inventory Management
                            </h1>

                            <p className="mt-3 max-w-2xl text-blue-100">
                                Manage vehicles, monitor stock levels, update inventory and
                                maintain your dealership with a modern dashboard.
                            </p>
                        </div>

                        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">
                            <CarFront size={48} />
                        </div>
                    </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/70"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-zinc-400">
                                            {stat.title}
                                        </p>

                                        <h2 className="mt-3 text-3xl font-bold">
                                            {stat.value}
                                        </h2>
                                    </div>

                                    <div
                                        className={`rounded-2xl bg-linear-to-r ${stat.gradient} p-4 text-white`}
                                    >
                                        <Icon size={24} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/70">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            placeholder="Search by make, model or category..."
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
                        />
                    </div>
                </div>

                <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
                    <VehicleForm
                        selectedVehicle={selectedVehicle}
                        loading={saving}
                        onCancel={() => setSelectedVehicle(null)}
                        onSubmit={handleSubmit}
                    />

                    {loading ? (
                        <div className="flex min-h-125 items-center justify-center rounded-3xl border border-slate-200 bg-white/80 shadow-xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/70">
                            <div className="flex flex-col items-center gap-4">
                                <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

                                <p className="text-slate-500 dark:text-zinc-400">
                                    Loading inventory...
                                </p>
                            </div>
                        </div>
                    ) : (
                        <VehicleTable
                            vehicles={filteredVehicles}
                            onEdit={(vehicle) => setSelectedVehicle(vehicle)}
                            onDelete={(vehicle) => {
                                setDeleteVehicleData(vehicle);
                                setDeleteOpen(true);
                            }}
                            onRestock={(vehicle) => {
                                setRestockVehicleData(vehicle);
                                setRestockOpen(true);
                            }}
                        />
                    )}
                </div>

                <div className="rounded-3xl border border-blue-100 bg-linear-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-xl">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">
                                AutoShelf Inventory
                            </h2>

                            <p className="mt-2 text-blue-100">
                                {vehicles.length} vehicles •{" "}
                                {vehicles.reduce((sum, v) => sum + v.quantity, 0)} total stock
                            </p>
                        </div>

                        <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 backdrop-blur">
                            <PlusCircle size={20} />

                            <span className="font-medium">
                                {selectedVehicle
                                    ? "Editing Existing Vehicle"
                                    : "Ready to Add New Vehicle"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;