<script setup lang="ts">
  import { ref } from "vue";
  import { useOrderStore } from "~/stores/order";
  import type { MenuContent } from "~/types";

  const { t } = useI18n();
  const orderStore = useOrderStore();

  const { data } = await useAsyncData(() => queryContent<MenuContent>("menu").findOne());
  const menu = computed(() => data.value);

  // State for item selection and customization
  const selectedItem = ref<{
    name: string;
    price: number;
    dishChoices?: string[];
  } | null>(null);
  const selectedDishChoice = ref<string | null>(null);
  const itemNotes = ref("");

  // Select an item to customize before adding to cart
  function selectItem(item: any) {
    selectedItem.value = {
      name: item.name,
      price: item.price,
      dishChoices: item.dishChoices
    };

    // Reset selections
    selectedDishChoice.value = item.dishChoices && item.dishChoices.length > 0 ? item.dishChoices[0] : null;
    itemNotes.value = "";
  }

  // Add the selected item to the order
  function addToOrder() {
    if (selectedItem.value) {
      orderStore.addItem(
        {
          name: selectedItem.value.name,
          price: selectedItem.value.price
        },
        selectedDishChoice.value || undefined,
        itemNotes.value || undefined
      );

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
          <MenuItem
            v-for="(item, itemIndex) in category.items"
            :key="itemIndex"
            :item="item"
            @click="selectItem(item)"
          />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="py-12 text-center">
    <p class="text-lg text-gray-600">{{ t("menu.loading") }}</p>
  </div>

  <MenuItemSelectModal 
    :selected-item="selectedItem"
    :selected-dish-choice="selectedDishChoice"
    :item-notes="itemNotes"
    @close="selectedItem = null"
    @update-dish-choice="selectedDishChoice = $event"
    @update-notes="itemNotes = $event"
    @add-to-order="addToOrder"
  />
</template>
