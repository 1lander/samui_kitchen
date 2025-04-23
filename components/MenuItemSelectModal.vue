<script setup lang="ts">
const { t } = useI18n();

defineProps<{
  selectedItem: {
    name: string;
    price: number;
    dishChoices?: string[];
  } | null;
  selectedDishChoice: string | null;
  itemNotes: string;
}>();

const emit = defineEmits<{
  close: [];
  updateDishChoice: [choice: string];
  updateNotes: [notes: string];
  addToOrder: [];
}>();
</script>

<template>
  <div v-if="selectedItem" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div class="w-full max-w-md rounded-lg bg-white p-6">
      <h3 class="mb-2 text-xl font-bold">{{ t(selectedItem.name) }}</h3>

      <div v-if="selectedItem.dishChoices && selectedItem.dishChoices.length > 0" class="mb-4">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="choice in selectedItem.dishChoices"
            :key="choice"
            @click="emit('updateDishChoice', choice)"
            class="rounded-full border px-3 py-1"
            :class="[
              selectedDishChoice === choice
                ? 'border-primary bg-primary text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
            ]"
          >
            {{ t(`menu.dishChoices.${choice}`) }}
          </button>
        </div>
      </div>

      <div class="mb-6">
        <label for="notes" class="mb-2 block font-medium">{{ t("order.specialRequests") }}</label>
        <textarea
          id="notes"
          :value="itemNotes"
          @input="emit('updateNotes', ($event.target as HTMLTextAreaElement).value)"
          rows="2"
          class="w-full rounded-md border border-gray-300 p-2"
          :placeholder="t('order.notesPlaceholder')"
        ></textarea>
      </div>

      <div class="flex gap-3">
        <button
          @click="emit('close')"
          class="flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          {{ t("common.cancel") }}
        </button>
        <button @click="emit('addToOrder')" class="hover:bg-primary-dark flex-1 rounded-md bg-primary px-4 py-2 text-white">
          {{ t("order.addToOrder") }} - € {{ selectedItem.price.toFixed(2) }}
        </button>
      </div>
    </div>
  </div>
</template>
