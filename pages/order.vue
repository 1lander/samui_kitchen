<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { formatPrice } from "~/helpers";
  import { useOrderStore } from "~/stores/order";
  import type { MenuContent, MenuItem, OrderContent, OrderItem } from "~/types";

  const { t } = useI18n();
  const { data: orderData } = await useAsyncData(() => queryContent<OrderContent>("/order").findOne());
  const { data: menuData } = await useAsyncData(() => queryContent<MenuContent>("/menu").findOne());

  const order = computed(() => orderData.value);
  const categories = computed(() => menuData.value?.categories);

  const selectedCategory = ref<string | null>(null);
  const selectedMenuItem = ref<MenuItem | null>(null);
  const paymentError = ref<string | null>(null);
  const isProcessing = ref(false);

  watchEffect(() => {
    if (categories.value?.length && !selectedCategory.value) {
      selectedCategory.value = categories.value[0].name;
    }
  });

  function setSelectedCategory(categoryName: string) {
    selectedCategory.value = categoryName;
  }

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

  const orderStore = useOrderStore();
  const { items, subtotal, total, totalItems } = storeToRefs(orderStore);
  const { removeItem, updateItemQuantity, clearOrder } = orderStore;

  useSeoMeta({
    title: t("order.pageTitle") + " - Samui Kitchen",
    description: t("order.pageSubtitle")
  });

  const handleCheckout = async () => {
    try {
      paymentError.value = null;
      isProcessing.value = true;

      const response = await $fetch("/api/payment", {
        method: "POST",
        body: {
          items: items.value,
          subtotal: subtotal.value,
          totalItems: totalItems.value,
          total: total.value
        }
      });

      // Redirect to payment URL if available
      if (response._links?.checkout?.href) {
        navigateTo(response._links.checkout.href, { external: true });
      } else {
        paymentError.value = t("order.paymentLinkError");
      }
    } catch (error: any) {
      paymentError.value = error.message;
      console.error("Payment error:", error);
    } finally {
      isProcessing.value = false;
    }
  };
</script>

<template>
  <div v-if="order">
    <PageHeader :image="order.pageHeader.image" :title="t('order.pageTitle')" :subtitle="t('order.pageSubtitle')" />

    <div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
      <div class="order-2 lg:order-1 lg:col-span-2">
        <h2 class="mb-4 text-2xl font-bold">{{ t("order.selectItems") }}</h2>
        <div class="mb-4">
          <div class="flex gap-2 overflow-x-auto pb-2">
            <button
              v-for="category in categories"
              :key="category.name"
              class="whitespace-nowrap rounded-full px-4 py-2 transition-colors"
              :class="[
                selectedCategory === category.name
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
              @click="setSelectedCategory(category.name)"
            >
              {{ t(category.name) }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <MenuItem
            v-for="item in categories?.find(({ name }) => name === selectedCategory)?.items"
            :key="item.name"
            :item="item"
            @click="handleItemClick"
          />
        </div>

        <MenuItemSelectModal :item="selectedMenuItem" @close="handleCloseModal" @add-item="handleAddItem" />
      </div>

      <div class="order-1 lg:order-2 lg:col-span-1">
        <div class="border border-gray-200 bg-white p-4 shadow-sm md:rounded-lg">
          <h2 class="mb-4 border-b border-gray-200 pb-2 text-xl font-bold">
            {{ t("order.yourOrder") }}
            <span v-if="totalItems" class="ml-2 text-secondary">({{ totalItems }})</span>
          </h2>

          <div v-if="items.length === 0" class="py-6 text-center text-gray-500">
            {{ t("order.emptyCart") }}
          </div>

          <div v-else>
            <ul class="divide-y divide-gray-200">
              <li v-for="item in items" :key="item.id" class="py-3">
                <div class="flex justify-between">
                  <div class="flex-1">
                    <h3 class="font-medium">{{ t(item.name) }}</h3>
                    <p v-if="item.dishChoice" class="text-sm text-gray-600">
                      {{ t(`menu.dishChoices.${item.dishChoice}`) }}
                    </p>
                    <p v-if="item.notes" class="text-sm italic text-gray-600">
                      {{ item.notes }}
                    </p>
                  </div>

                  <div class="flex items-center">
                    <div class="mr-4 flex items-center">
                      <button
                        class="flex h-8 w-8 items-center justify-center rounded-l border border-gray-300 text-gray-600 hover:bg-gray-100"
                        @click="updateItemQuantity(item.id, item.quantity - 1)"
                      >
                        -
                      </button>
                      <span class="flex h-8 w-8 items-center justify-center border-b border-t border-gray-300 bg-white">
                        {{ item.quantity }}
                      </span>
                      <button
                        class="flex h-8 w-8 items-center justify-center rounded-r border border-gray-300 text-gray-600 hover:bg-gray-100"
                        @click="updateItemQuantity(item.id, item.quantity + 1)"
                      >
                        +
                      </button>
                    </div>

                    <div class="min-w-[60px] text-right">{{ formatPrice(item.price * item.quantity) }}</div>

                    <button
                      class="ml-2 text-red-500 hover:text-red-700"
                      title="Remove item"
                      @click="removeItem(item.id)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            </ul>

            <div class="mt-4 border-t border-gray-200 pt-4">
              <div class="mb-2 flex justify-between">
                <span>{{ t("order.subtotal") }}</span>
                <span>{{ formatPrice(subtotal) }}</span>
              </div>
              <div class="flex justify-between text-lg font-bold">
                <span>{{ t("order.total") }}</span>
                <span>{{ formatPrice(total) }}</span>
              </div>
            </div>

            <div v-if="paymentError" class="mt-4 rounded-md bg-red-50 p-3 text-red-600">
              {{ paymentError }}
            </div>

            <div class="mt-6 flex gap-4">
              <Button variant="secondary" @click="clearOrder">{{ t("order.clearOrder") }}</Button>
              <Button variant="primary" :loading="isProcessing" @click="handleCheckout">
                <span v-if="isProcessing">{{ t("common.processing") }}</span>
                <span v-else>{{ t("order.checkout") }}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
