<script setup lang="ts">
import { ref } from "vue";
import { type Car } from "../stores/cars";

const props = defineProps<{
  car: Car;
}>();

const emit = defineEmits<{
  (e: "save", car: Car): void;
  (e: "cancel"): void;
}>();

const localCar = ref<Car>({ ...props.car });

function onSave() {
  emit("save", {
    ...localCar.value,
  });
}
</script>

<template>
  <a-form layout="vertical" class="edit-form">
    <a-form-item label="Название задачи">
      <a-input v-model:value="localCar.name" />
    </a-form-item>

    <a-form-item label="Цена">
      <a-input v-model:value="localCar.price" />
    </a-form-item>
    <div class="form-actions">
      <a-button type="primary" @click.stop="onSave">Сохранить</a-button>
      <a-button @click.stop="$emit('cancel')">Отмена</a-button>
    </div>
  </a-form>
</template>

<style scoped>
.edit-form {
  padding: 12px;
}
.form-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
</style>
