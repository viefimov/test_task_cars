<template>
  <div class="map-container">
    <l-map 
      ref="map"
      :zoom="zoom" 
      :center="center"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      
      <l-marker
        v-for="car in cars"
        :key="car.id"
        :lat-lng="[car.latitude, car.longitude]"
      >
        <l-popup>
          {{ car.name }} - {{ car.price }}$
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import { useCarStore } from "../stores/cars";
import { computed, onMounted } from "vue";
import "leaflet/dist/leaflet.css";

const carStore = useCarStore();
const cars = computed(() => carStore.cars);

const center = computed(() => {
  if (cars.value.length === 0) return [55.75, 37.61];
  
  const avgLat = cars.value.reduce((sum, car) => sum + car.latitude, 0) / cars.value.length;
  const avgLng = cars.value.reduce((sum, car) => sum + car.longitude, 0) / cars.value.length;
  
  return [avgLat, avgLng];
});

const zoom = computed(() => cars.value.length > 0 ? 10 : 5);

onMounted(() => {
  if (cars.value.length === 0) {
    carStore.fetchCars();
  }
});
</script>

<style scoped>
.map-container {

  height: 600px;
  width: 100%;
  margin-top: 40px;
}
</style>