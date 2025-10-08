<script setup lang="ts">
import type { Car } from "../stores/cars";


const props = defineProps<{
  car: Car;
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
}>();
</script>

<template>
  <a-modal
    :open="open"
    title="Подробности о машине"
    :footer="null"
    @cancel="emit('update:open', false)"
  >
    <p><strong>Название:</strong> {{ props.car.name }}</p>
    <p><strong>Описание:</strong> {{ props.car.model + " " + props.car.color }}</p>
    <p><strong>Стоимость:</strong> {{ props.car.price + "$"}}</p>
  </a-modal>
</template>
