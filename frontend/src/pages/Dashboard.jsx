import { useEffect, useMemo, useState } from "react";

import Hero from "../components/dashboard/Hero";
import Stats from "../components/dashboard/Stats";
import SearchBar from "../components/dashboard/SearchBar";
import VehicleGrid from "../components/dashboard/VehicleGrid";
import LoadingGrid from "../components/dashboard/LoadingGrid";
import EmptyState from "../components/dashboard/EmptyState";

import {
  getVehicles,
  purchaseVehicle,
} from "../services/vehicleService";

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const loadVehicles = async () => {
    try {
      setLoading(true);

      const vehicleData = await getVehicles();

      setVehicles(vehicleData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const vehicleData = await getVehicles();

        if (mounted) {
          setVehicles(vehicleData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const handlePurchase = async (id) => {
    try {
      await purchaseVehicle(id);

      await loadVehicles();
    } catch (error) {
      alert(error.response?.data?.message || "Purchase failed.");
    }
  };

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const search = filters.search.toLowerCase();

      const matchesSearch =
        vehicle.make.toLowerCase().includes(search) ||
        vehicle.model.toLowerCase().includes(search);

      const matchesCategory =
        !filters.category ||
        vehicle.category === filters.category;

      const matchesMin =
        !filters.minPrice ||
        vehicle.price >= Number(filters.minPrice);

      const matchesMax =
        !filters.maxPrice ||
        vehicle.price <= Number(filters.maxPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMin &&
        matchesMax
      );
    });
  }, [vehicles, filters]);

  const categories = useMemo(() => {
    return [...new Set(vehicles.map((v) => v.category))];
  }, [vehicles]);

  return (
    <div className="space-y-8">

      <Hero />

      <Stats vehicles={vehicles} />

      <SearchBar
        filters={filters}
        setFilters={setFilters}
        categories={categories}
      />

      {loading ? (
        <LoadingGrid />
      ) : filteredVehicles.length === 0 ? (
        <EmptyState />
      ) : (
        <VehicleGrid
          vehicles={filteredVehicles}
          onPurchase={handlePurchase}
        />
      )}

    </div>
  );
};

export default Dashboard;