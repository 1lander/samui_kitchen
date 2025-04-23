<script setup lang="ts">
  import { ref } from "vue";
  import { useOrderStore } from "~/stores/order";
  import type { MenuContent, MenuItem } from "~/types";

  const { t } = useI18n();
  const orderStore = useOrderStore();

  const { data } = await useAsyncData(() => queryContent<MenuContent>("menu").findOne());
  const menu = computed(() => data.value);

  const selectedItem = ref<MenuItem | null>(null);

  function selectItem(item: MenuItem) {
    selectedItem.value = {
      name: item.name,
      price: item.price,
      dishChoices: item.dishChoices
    };
  }

  function handleAddItem(itemData: { name: string; price: number; dishChoice?: string; notes?: string }) {
    orderStore.addItem(
      {
        name: itemData.name,
        price: itemData.price
      },
      itemData.dishChoice,
      itemData.notes
    );

    selectedItem.value = null;
  }

  useSeoMeta({
    title: t("menu.pageTitle") + " - Samui Kitchen",
    description: t("menu.pageSubtitle")
  });
</script>

<template>
  <div v-if="menu">
    <PageHeader :image="menu.pageHeader.image" :title="t('menu.pageTitle')" :subtitle="t('menu.pageSubtitle')" />

    <div class="mx-auto max-w-5xl">
      <div class="mx-auto mb-12 max-w-3xl text-center">
        <p class="text-lg text-gray-700">{{ t("menu.description") }}</p>
      </div>

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
    <MenuItemSelectModal :item="selectedItem" @close="selectedItem = null" @add-item="handleAddItem" />
  </div>
</template>
