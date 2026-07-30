import api from "./api";

export const getVehicles = async (params = {}) => {
  const { data } = await api.get("/vehicles", { params });
  return data.vehicles;
};

export const purchaseVehicle = async (id) => {
  const { data } = await api.post(`/vehicles/${id}/purchase`);
  return data.vehicle;
};

export const addVehicle = async (vehicle) => {
  const { data } = await api.post("/vehicles", vehicle);
  return data.vehicle;
};

export const updateVehicle = async (id, vehicle) => {
  const { data } = await api.put(`/vehicles/${id}`, vehicle);
  return data.vehicle;
};

export const deleteVehicle = async (id) => {
  await api.delete(`/vehicles/${id}`);
};

export const restockVehicle = async (id, quantity) => {
  const { data } = await api.post(`/vehicles/${id}/restock`, {
    quantity,
  });

  return data.vehicle;
};