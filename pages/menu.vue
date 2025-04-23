<script setup lang="ts">
  import type { MenuContent } from "~/types";
  const { t } = useI18n();

  const { data } = await useAsyncData(() => queryContent<MenuContent>("menu").findOne());
  const menu = computed(() => data.value);

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
          <div
            v-for="(item, itemIndex) in category.items"
            :key="itemIndex"
            class="border border-gray-200 p-4 transition-shadow hover:shadow-md md:rounded-lg"
          >
            <div class="flex items-start justify-between">
              <h3 class="text-xl font-semibold">
                {{ t(item.name) }}
                <span v-if="item.dishChoices && item.dishChoices.length > 0" class="mt-1 block text-sm text-gray-600">
                  {{ t("menu.dishChoices.choice") }}:
                  <span v-for="(choice, choiceIndex) in item.dishChoices" :key="choiceIndex" class="mr-1">
                    {{ t(`menu.dishChoices.${choice}`) }}
                    <template v-if="choiceIndex < item.dishChoices.length - 1">/</template>
                  </span>
                </span>
              </h3>
              <div class="text-right">
                <span class="text-lg font-medium text-secondary">€ {{ item.price.toFixed(2) }}</span>
              </div>
            </div>
            <p v-if="item.description" class="mt-1 text-secondary">
              {{ t(item.description) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="py-12 text-center">
    <p class="text-lg text-gray-600">{{ t("menu.loading") }}</p>
  </div>
</template>
