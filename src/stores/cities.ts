import { defineStore } from "pinia";
import type { City } from "@/types/types";
import citiesData from "@/data/db.json";

interface CitiesState {
  cities: City[];
  selectedCity: City | null;
}

export const useCitiesStore = defineStore("cities", {
  state: (): CitiesState => ({
    cities: citiesData.cities,
    selectedCity: null,
  }),
  actions: {
    selectCity(city: City) {
      this.selectedCity = city;
    },
    clearSelectedCity() {
      this.selectedCity = null;
    },
    addCity(city: City) {
      this.cities.push(city);
    },
    deleteCity(city: City) {
      this.cities = this.cities.filter(c => c.id !== city.id);
    },
    updateCity(city: City) {
      const index = this.cities.findIndex(c => c.id === city.id);
      if (index !== -1) {
        this.cities[index] = city;
      }
    },
  },
});

