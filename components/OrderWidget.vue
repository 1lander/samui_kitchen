<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useOrderStore } from "~/stores/order";

  const orderStore = useOrderStore();
  const { items, subtotal, totalItems } = storeToRefs(orderStore);

  const { t } = useI18n();
  const isVisible = ref(false);

  function toggleVisibility() {
    isVisible.value = !isVisible.value;
  }
</script>

<template>
  <div class="fixed bottom-4 right-4 z-40">
    <button
      class="hover:bg-primary-dark flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-white shadow-md transition-colors"
      @click="toggleVisibility"
    >
      <span class="font-bold">{{ totalItems }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    </button>

    <div
      v-if="isVisible"
      class="absolute bottom-14 right-0 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
    >
      <h3 v-if="items.length === 0" class="text-center text-gray-500">{{ t("order.emptyCart") }}</h3>

      <div v-if="items.length > 0">
        <h3 class="mb-3 border-b border-gray-200 pb-2 text-lg font-bold">{{ t("order.yourOrder") }}</h3>

        <div class="max-h-60 overflow-y-auto">
          <ul class="divide-y divide-gray-100">
            <li v-for="item in items.slice(0, 3)" :key="item.id" class="flex justify-between py-2">
              <div>
                <span class="font-medium">{{ item.quantity }}x</span>
                {{ t(item.name) }}
                <span v-if="item.dishChoice" class="block text-xs text-gray-600">
                  {{ t(`menu.dishChoices.${item.dishChoice}`) }}
                </span>
              </div>
              <div class="text-gray-700">€ {{ (item.price * item.quantity).toFixed(2) }}</div>
            </li>

            <li v-if="items.length > 3" class="py-2 text-center text-sm italic text-gray-500">
              {{ t("order.andMoreItems", { count: items.length - 3 }) }}
            </li>
          </ul>
        </div>

        <div class="mt-3 border-t border-gray-200 pt-2">
          <div class="mb-2 flex justify-between">
            <span class="font-medium">{{ t("order.subtotal") }}</span>
            <span>€ {{ subtotal.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <NuxtLink
        to="/order"
        class="hover:bg-primary-dark mt-3 block w-full rounded-md bg-primary px-4 py-2 text-center text-white transition-colors"
      >
        {{ items.length > 0 ? t("order.viewOrder") : t("order.startOrdering") }}
      </NuxtLink>
    </div>
  </div>
</template>
