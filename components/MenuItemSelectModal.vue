<script setup lang="ts">
  import type { DishChoice, MenuItem, OrderItem } from "~/types";
  const { t } = useI18n();

  const props = defineProps<{
    item: MenuItem | null;
  }>();

  const emit = defineEmits<{
    close: [];
    addItem: [OrderItem];
  }>();

  const selectedDishChoice = ref<DishChoice | null>(null);
  const itemNotes = ref("");

  watch(
    () => props.item,
    (newItem) => {
      selectedDishChoice.value = newItem?.dishChoices?.[0] || null;
    },
    { immediate: true }
  );

  function resetForm() {
    selectedDishChoice.value = props.item?.dishChoices?.[0] || null;
    itemNotes.value = "";
  }

  function closeModal() {
    resetForm();
    emit("close");
  }

  function addToOrder() {
    if (props.item) {
      emit("addItem", {
        name: props.item.name,
        price: props.item.price,
        dishChoice: selectedDishChoice.value || undefined,
        notes: itemNotes.value || undefined
      });
      resetForm();
    }
  }
</script>

<template>
  <div v-if="item" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div class="w-full max-w-md rounded-lg bg-white p-6">
      <h3 class="mb-2 text-xl font-bold">{{ t(item.name) }}</h3>

      <div v-if="item.dishChoices && item.dishChoices.length > 0" class="mb-4">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="choice in item.dishChoices"
            :key="choice"
            class="rounded-full border px-3 py-1"
            :class="[
              selectedDishChoice === choice
                ? 'border-primary bg-primary text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
            ]"
            @click="selectedDishChoice = choice"
          >
            {{ t(`menu.dishChoices.${choice}`) }}
          </button>
        </div>
      </div>

      <div v-if="!item.forbidSpecialRequests" class="mb-6">
        <label for="notes" class="mb-2 block font-medium">{{ t("order.specialRequests") }}</label>
        <textarea
          id="notes"
          v-model="itemNotes"
          rows="2"
          class="w-full rounded-md border border-gray-300 p-2"
          :placeholder="t('order.notesPlaceholder')"
        ></textarea>
      </div>

      <div class="flex gap-3">
        <button
          class="flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
          @click="closeModal"
        >
          {{ t("common.cancel") }}
        </button>
        <button class="hover:bg-primary-dark flex-1 rounded-md bg-primary px-4 py-2 text-white" @click="addToOrder">
          {{ t("order.addToOrder") }}
        </button>
      </div>
    </div>
  </div>
</template>
