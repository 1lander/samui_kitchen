<script setup lang="ts">
  import { ref } from "vue";
  import { useOrderStore } from "~/stores/order";
  import type { MenuContent, MenuItem, OrderItem } from "~/types";

  const { t } = useI18n();
  const orderStore = useOrderStore();

  const { data } = await useAsyncData(() => queryContent<MenuContent>("/menu").findOne());
  const menu = computed(() => data.value);

  const selectedMenuItem = ref<MenuItem | null>(null);

  function handleItemClick(item: MenuItem) {
    selectedMenuItem.value = item;
  }

  function handleCloseModal() {
    selectedMenuItem.value = null;
  }

  function handleAddItem(item: OrderItem) {
    orderStore.addItem(item);
    selectedMenuItem.value = null;
  }

  useSeoMeta({
    title: t("menu.pageTitle") + " - Koh Samui kitchen",
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
            @click="handleItemClick(item)"
          />
        </div>
      </div>
    </div>
    <MenuItemSelectModal :item="selectedMenuItem" @close="handleCloseModal" @add-item="handleAddItem" />
  </div>
</template>
