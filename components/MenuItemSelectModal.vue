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

      <div v-if="item.image" class="mb-4">
        <NuxtImg :src="item.image" :alt="t(item.name)" class="h-48 w-full rounded-lg object-cover" />
      </div>

      <div v-if="!item.forbidSpecialRequests" class="mb-6">
        <textarea
          id="notes"
          v-model="itemNotes"
          rows="2"
          class="w-full rounded-md border border-gray-300 p-2"
          :placeholder="t('order.notesPlaceholder')"
        ></textarea>
      </div>

      <div class="flex gap-3">
        <Button variant="secondary" @click="closeModal">{{ t("common.cancel") }}</Button>
        <Button variant="primary" @click="addToOrder">{{ t("order.addToOrder") }}</Button>
      </div>
    </div>
  </div>
</template>
