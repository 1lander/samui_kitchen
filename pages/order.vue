<script setup lang="ts">
import type { OrderContent } from '~/types';

const { t } = useI18n();
const { data } = await useAsyncData(() => queryContent<OrderContent>("/order").findOne());
const order = computed(() => data.value);
useSeoMeta({
  title: t("order.pageTitle") + " - Samui Kitchen",
  description: t("order.pageDescription")
});
</script>

<template>
  <div v-if="order">
    <PageHeader
      :image="order.pageHeader.image"
      :title="t('order.pageTitle')"
      :subtitle="t('order.pageSubtitle')"
    />

    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Menu Items Column -->
        <div class="lg:col-span-2">
          <h2 class="text-2xl font-bold mb-6">{{ t('order.selectItems') }}</h2>
          <MenuItemSelection />
        </div>

        <!-- Order Summary Column -->
        <div class="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  </div>
</template> 