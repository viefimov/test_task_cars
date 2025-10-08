<script setup lang="ts">
import { computed, ref } from "vue";
import { useCarStore, type Car } from "../stores/cars";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import CarEditForm from "./CarEditForm.vue";
import CarDetailsModal from "./CarDetailsModal.vue";
const props = defineProps<{ carId: number }>();

const carStore = useCarStore();
const editing = ref(false);
const isDetailModalVisible = ref(false);
const car = computed(() => carStore.getCarById(props.carId));
function toggleEdit() {
  editing.value = !editing.value;
}
function handleCardClick() {
  if (!editing.value) {
    isDetailModalVisible.value = true;
  }
}
async function handleSave(newCar: Car) {
  await carStore.updateCar(newCar);
  editing.value = false;
}

async function handleDelete() {
  await carStore.deleteCar(String(props.carId));
}
</script>

<template>
  <a-card hoverable class="car-card" @click="handleCardClick">
    <template #title>
      <CarDetailsModal
        :open="isDetailModalVisible"
        @update:open="isDetailModalVisible = $event"
        :car="car!"
      />
      <div class="car-header">
        <span class="car-title">{{ car!.name }}</span>
        <div class="car-actions">
          <a-button type="link" size="small" @click.stop="toggleEdit">
            <EditOutlined />
          </a-button>
          <a-popconfirm
            title="Удалить задачу?"
            ok-text="Да"
            cancel-text="Нет"
            @confirm="handleDelete"
          >
            <a-button danger type="link" size="small" @click.stop>
              <DeleteOutlined />
            </a-button>
          </a-popconfirm>
        </div>
      </div>
    </template>

    <CarEditForm
      v-if="editing"
      :car="car!"
      @save="handleSave"
      @cancel="toggleEdit"
    />

    <div v-else class="car-view">
      <div class="car-details">
        <p class="desc" style="font-weight: 500;">{{ car!.model + " " + car!.color }}</p>
        <p class="deadline">
          <strong>Год выпуска:</strong> {{ car!.year || "—" }}
        </p>
        <p class="price">Стоимсть: <strong>{{ car!.price + "$" }}</strong></p>
      </div>
    </div>
  </a-card>
</template>

<style scoped>
.car-card {
  width: fit-content;
  box-sizing: border-box;
}

/* Заголовок */
.car-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.car-title {
  font-weight: 700;
  font-size: 34px;
  word-break: break-word;
}
.car-actions {
  display: flex;
  gap: 8px;
}

.car-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: start;
}

.car-details {
  min-width: 0;
}
.desc {
  margin-bottom: 8px;
  color: black;
}
.deadline {
  color: #555;
}

.car-workers {
  text-align: right;
  min-width: 0;
}
.names {
  display: inline-block;
  color: #333;
}

.desc,
.deadline,
.names,
.price {
  display: block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
}
.car-actions {
  min-width: 0;
}

.car-actions .a-button {
  flex: 1 1 auto; /* разрешить сжатие */
  min-width: 0; /* нужно для работы text-overflow */
  font-size: 14px; /* базовый размер */
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px; /* ограничиваем ширину для длинных слов */
}

/* 🔹 адаптация для маленьких экранов */
@media (max-width: 480px) {
  .car-actions .a-button {
    font-size: 12px; /* уменьшаем шрифт */
    max-width: 90px; /* ещё чуть меньше */
  }
  .ant-card-head {
    padding-inline: 15px;
  }
}

@media (max-width: 360px) {
  .car-actions .a-button {
    font-size: 11px;
    max-width: 70px;
    width: fit-content;
  }
}
/* 🔹 Адаптивность */
@media (max-width: 768px) {
  .car-view {
    grid-template-columns: 1fr; /* одна колонка на узком экране */
    text-align: left;
  }
  .car-workers {
    text-align: left;
  }
}
</style>
