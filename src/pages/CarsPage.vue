<script setup lang="ts">
import { onMounted } from "vue";
import { useCarStore, type Car } from "../stores/cars";
import CarCard from "../components/CarCard.vue";
import CarCreateModal from "../components/CarCreateModal.vue";
import CarMap from "../components/CarMap.vue";

const carStore = useCarStore();
onMounted(async () => {
  await carStore.fetchCars();
});
</script>

<template>
  <div class="dashboard-detail-page">
    <div style="display: flex; justify-content: space-between">
      <CarCreateModal />
      <div class="sort-controls">
        <select v-model="carStore.sortField" class="select">
          <option value="year">Год выпуска</option>
          <option value="price">Цена</option>
        </select>

        <select v-model="carStore.sortOrder" class="select">
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>
    </div>
    <div class="tasks-list">
      <CarCard v-for="c in carStore.sortedCars" :key="c.id" :carId="c.id" />
      <CarMap style="margin-bottom: 24px" />
    </div>
  </div>
</template>

<style scoped>
.dashboard-detail-page {
  padding: 16px;
}

.sort-controls {
  display: flex;
  gap: 10px;
}

.select {
  padding: 15px;
  border: none;
}

.select:focus-visible {
  border: black;
}
.tasks-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
}
</style>
