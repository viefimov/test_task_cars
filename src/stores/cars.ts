import axios from "axios";
import { defineStore } from "pinia";

export interface Car {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
}

export const useCarStore = defineStore("cars", {
  state: () => ({
    cars: [] as Car[],
    sortField: "year" as "year" | "price",
    sortOrder: "asc" as "asc" | "desc",
  }),
  getters: {
    getCarById: (state) => (id: number) => {
      return state.cars.find((car) => car.id === id);
    },
    sortedCars: (state) => {
      return [...state.cars].sort((a, b) => {
        const field = state.sortField;
        const direction = state.sortOrder === "asc" ? 1 : -1;
        return (a[field] - b[field]) * direction;
      });
    },
  },
  actions: {
    async fetchCars() {
      try {
        const { data } = await axios.get<Car[]>(
          `${import.meta.env.VITE_API_UR}/vehicles`
        );
        this.cars = data;
      } catch (err) {
        console.error("Failed to fetch cars:", err);
      }
    },
    async createCar(car: Car) {
      this.cars.unshift(car);
    },
    async updateCar(updated: Car) {
      const idx = this.cars.findIndex((c) => c.id === updated.id);
      if (idx !== -1) this.cars[idx] = { ...updated };
    },
    async deleteCar(id: string) {
      this.cars = this.cars.filter((c) => String(c.id) !== id);
    },
  },
});
