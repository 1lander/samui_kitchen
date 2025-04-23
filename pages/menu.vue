<script setup lang="ts">
  import type { MenuContent } from "~/types";
  import { useOrderStore } from '~/stores/order';
  import { ref } from 'vue';
  
  const { t } = useI18n();
  const orderStore = useOrderStore();

  const { data } = await useAsyncData(() => queryContent<MenuContent>("menu").findOne());
  const menu = computed(() => data.value);

  // State for item selection and customization
  const selectedItem = ref<{
    name: string, 
    price: number,
    dishChoices?: string[]
  } | null>(null);
  const selectedDishChoice = ref<string | null>(null);
  const itemNotes = ref('');

  // Select an item to customize before adding to cart
  function selectItem(item: any) {
    selectedItem.value = {
      name: item.name,
      price: item.price,
      dishChoices: item.dishChoices
    };
    
    // Reset selections
    selectedDishChoice.value = item.dishChoices && item.dishChoices.length > 0 
      ? item.dishChoices[0] 
      : null;
    itemNotes.value = '';
  }

  // Add the selected item to the order
  function addToOrder() {
    if (selectedItem.value) {
      orderStore.addItem({
        name: selectedItem.value.name,
        price: selectedItem.value.price
      }, selectedDishChoice.value || undefined, itemNotes.value || undefined);
      
      selectedItem.value = null;
    }
  }

  useSeoMeta({
    title: t("menu.pageTitle") + " - Samui Kitchen",
    description: t("menu.pageSubtitle")
  });
</script>

<template>
  <div v-if="menu">
    <PageHeader :image="menu.pageHeader.image" :title="t('menu.pageTitle')" :subtitle="t('menu.pageSubtitle')" />

    <div class="mx-auto mb-12 max-w-3xl text-center">
      <p class="text-lg text-gray-700">{{ t("menu.description") }}</p>
    </div>

    <div class="mx-auto max-w-5xl">
      <div v-for="(category, index) in menu.categories" :key="index" class="mb-12">
        <h2 class="mb-6 border-b-2 border-secondary pb-2 text-center text-3xl font-bold">
          {{ t(category.name) }}
        </h2>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <MenuItem v-for="(item, itemIndex) in category.items" :key="itemIndex" :item="item" @click="selectItem(item)" />
        </div>
      </div>
    </div>

    <!-- Order Widget -->
  </div>

  <div v-else class="py-12 text-center">
    <p class="text-lg text-gray-600">{{ t("menu.loading") }}</p>
  </div>

  <!-- Item customization modal -->
  <div v-if="selectedItem" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <h3 class="text-xl font-bold mb-2">{{ t(selectedItem.name) }}</h3>
      
      <div v-if="selectedItem.dishChoices && selectedItem.dishChoices.length > 0" class="mb-4">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="choice in selectedItem.dishChoices"
            :key="choice"
            @click="selectedDishChoice = choice"
            class="px-3 py-1 rounded-full border"
            :class="[
              selectedDishChoice === choice
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            ]"
          >
            {{ t(`menu.dishChoices.${choice}`) }}
          </button>
        </div>
      </div>
      
      <div class="mb-6">
        <label for="notes" class="block font-medium mb-2">{{ t('order.specialRequests') }}</label>
        <textarea
          id="notes"
          v-model="itemNotes"
          rows="2"
          class="w-full border border-gray-300 rounded-md p-2"
          :placeholder="t('order.notesPlaceholder')"
        ></textarea>
      </div>
      
      <div class="flex gap-3">
        <button
          @click="selectedItem = null"
          class="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
        >
          {{ t('common.cancel') }}
        </button>
        <button
          @click="addToOrder"
          class="flex-1 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          {{ t('order.addToOrder') }} - € {{ selectedItem.price.toFixed(2) }}
        </button>
      </div>
    </div>
  </div>
</template>
