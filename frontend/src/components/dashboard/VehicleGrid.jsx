import VehicleCard from "./VehicleCard";

const VehicleGrid = ({
  vehicles,
  onPurchase,
}) => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle._id}
          vehicle={vehicle}
          onPurchase={onPurchase}
        />
      ))}

    </div>
  );
};

export default VehicleGrid;