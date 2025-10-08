<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCarStore } from "../stores/cars";

onMounted(async () => {});
const carsStore = useCarStore();

const isModalVisible = ref(false);
const carName = ref("");
const carModel = ref("");
const carYear = ref<number>(2000);
const carColor = ref("");
const carPrice = ref<number>(40000);
const errorName = ref(false);

function openModal() {
  isModalVisible.value = true;
  errorName.value = false;
}

function handleCancel() {
  isModalVisible.value = false;
}

async function handleOk() {
  if (!carName.value.trim()) {
    errorName.value = true;
    return;
  }

  try {
    const newCar = {
      id: Date.now(),
      name: carName.value,
      model: carModel.value,
      year: carYear.value,
      color: carColor.value,
      price: carPrice.value,
      latitude: 0,
      longitude: 0,
    };

    await carsStore.createCar(newCar);

    carName.value = "";
    carModel.value = "";
    carYear.value = 2000;
    carColor.value = "";
    carPrice.value = 400000;
    isModalVisible.value = false;
  } catch (err) {
    console.error(err);
  }
}
</script>

<template>
  <div>
    <a-button type="primary" @click="openModal">Создать машину</a-button>

    <a-modal title="Новая машина" v-model:open="isModalVisible" :footer="null">
      <a-input
        v-model:value="carName"
        placeholder="Название машины"
        @input="errorName = false"
      />
      <p v-if="errorName" style="color: red">Введите название задачи</p>

      <a-input
        v-model:value="carModel"
        placeholder="Модель машины"
        style="margin-top: 12px"
      />

      <a-input
        v-model:value="carYear"
        style="margin-top: 12px; width: 100%"
        placeholder="Год выпуска"
      />
      <a-input
        v-model:value="carColor"
        style="margin-top: 12px; width: 100%"
        placeholder="Цвет"
      />
      <a-input
       v-model:value="carPrice"
        style="margin-top: 12px; width: 100%"
        placeholder="Стоимость"
      />

      <div style="margin-top: 16px; text-align: right">
        <a-button @click="handleCancel" style="margin-right: 8px"
          >Отмена</a-button
        >
        <a-button type="primary" @click="handleOk">OK</a-button>
      </div>
    </a-modal>
  </div>
</template>
