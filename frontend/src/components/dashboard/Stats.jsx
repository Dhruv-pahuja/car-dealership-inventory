import {
  CarFront,
  Boxes,
  BadgeDollarSign,
  Tags,
} from "lucide-react";

import StatCard from "./StatCard";

const Stats = ({ vehicles }) => {
  const totalVehicles = vehicles.length;

  const totalStock = vehicles.reduce(
    (sum, vehicle) => sum + vehicle.quantity,
    0
  );

  const categories = new Set(
    vehicles.map((vehicle) => vehicle.category)
  ).size;

  const inventoryValue = vehicles.reduce(
    (sum, vehicle) =>
      sum + vehicle.price * vehicle.quantity,
    0
  );

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Vehicles"
        value={totalVehicles}
        icon={<CarFront size={26} className="text-white" />}
        color="bg-blue-600"
      />

      <StatCard
        title="Stock"
        value={totalStock}
        icon={<Boxes size={26} className="text-white" />}
        color="bg-emerald-600"
      />

      <StatCard
        title="Categories"
        value={categories}
        icon={<Tags size={26} className="text-white" />}
        color="bg-amber-500"
      />

      <StatCard
        title="Inventory Value"
        value={`₹${inventoryValue.toLocaleString()}`}
        icon={<BadgeDollarSign size={26} className="text-white" />}
        color="bg-red-500"
      />

    </section>
  );
};

export default Stats;