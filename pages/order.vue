<script setup lang="ts">
import type { OrderContent, MenuContent, MenuItem } from '~/types';
import { useOrderStore } from '~/stores/order'
import { storeToRefs } from 'pinia'
import MenuItemComponent from '~/components/MenuItem.vue'
import MenuItemSelectModal from '~/components/MenuItemSelectModal.vue'

const { t } = useI18n();
const { data: orderData } = await useAsyncData(() => queryContent<OrderContent>("/order").findOne());
const { data: menuData } = await useAsyncData(() => queryContent<MenuContent>("/menu").findOne());
const order = computed(() => orderData.value);
const menu = computed(() => menuData.value);

// Menu item selection state
const selectedCategory = ref<string | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const selectedItem = ref<MenuItem | null>(null)

// Computed
const categories = computed(() => menu.value?.categories || [])

const allItems = computed(() => {
  if (!menu.value) return []
  
  return menu.value.categories.flatMap(category => 
    category.items.map(item => ({
      ...item,
      category: category.name
    }))
  )
})

// Set the first category as selected by default when menu loads
watchEffect(() => {
  if (menu.value?.categories && menu.value.categories.length > 0 && !selectedCategory.value) {
    selectedCategory.value = menu.value.categories[0].name
  }
})

function setSelectedCategory(categoryName: string) {
  selectedCategory.value = categoryName
}

function handleItemClick(item: MenuItem) {
  selectedItem.value = item
}

function handleCloseModal() {
  selectedItem.value = null
}

function handleAddItem({ name, price, dishChoice, notes }: { 
  name: string; 
  price: number; 
  dishChoice?: string; 
  notes?: string 
}) {
  orderStore.addItem(
    { name, price },
    dishChoice,
    notes
  )
  selectedItem.value = null
}

const orderStore = useOrderStore()
const { items, subtotal, total, totalItems } = storeToRefs(orderStore)
const { removeItem, updateItemQuantity, clearOrder } = orderStore

useSeoMeta({
  title: t("order.pageTitle") + " - Samui Kitchen",
  description: t("order.pageSubtitle")
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
          
          <!-- Category selection -->
          <div v-if="!isLoading && categories.length > 0" class="mb-6">
            <div class="flex overflow-x-auto gap-2 pb-2">
              <button
                v-for="category in categories"
                :key="category.name"
                @click="setSelectedCategory(category.name)"
                class="px-4 py-2 whitespace-nowrap rounded-full transition-colors"
                :class="[
                  selectedCategory === category.name 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                {{ t(category.name) }}
              </button>
            </div>
          </div>

          <!-- Loading state -->
          <div v-if="isLoading" class="py-12 text-center">
            <p class="text-lg text-gray-600">{{ t('menu.loading') }}</p>
          </div>

          <!-- Item selection -->
          <div v-else-if="allItems.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MenuItemComponent
              v-for="item in allItems.filter(i => i.category === selectedCategory)"
              :key="item.name"
              :item="item"
              @click="handleItemClick"
            />
          </div>

          <!-- No items message -->
          <div v-else class="py-12 text-center">
            <p class="text-lg text-gray-600">{{ t('menu.noItems') }}</p>
          </div>

          <!-- Item customization modal -->
          <MenuItemSelectModal
            :item="selectedItem"
            @close="handleCloseModal"
            @add-item="handleAddItem"
          />
        </div>

        <!-- Order Summary Column -->
        <div class="lg:col-span-1">
          <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <h2 class="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
              {{ t('order.yourOrder') }}
              <span v-if="totalItems" class="text-secondary ml-2">({{ totalItems }})</span>
            </h2>

            <div v-if="items.length === 0" class="text-center py-6 text-gray-500">
              {{ t('order.emptyCart') }}
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
                      <p v-if="item.notes" class="text-sm text-gray-600 italic">
                        {{ item.notes }}
                      </p>
                    </div>
                    
                    <div class="flex items-center">
                      <div class="flex items-center mr-4">
                        <button 
                          @click="updateItemQuantity(item.id, item.quantity - 1)"
                          class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span class="w-8 h-8 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                          {{ item.quantity }}
                        </span>
                        <button 
                          @click="updateItemQuantity(item.id, item.quantity + 1)"
                          class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      
                      <div class="text-right min-w-[60px]">
                        € {{ (item.price * item.quantity).toFixed(2) }}
                      </div>
                      
                      <button 
                        @click="removeItem(item.id)" 
                        class="ml-2 text-red-500 hover:text-red-700"
                        title="Remove item"
                      >
                        <span class="sr-only">Remove</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              </ul>

              <div class="mt-4 pt-4 border-t border-gray-200">
                <div class="flex justify-between mb-2">
                  <span>{{ t('order.subtotal') }}</span>
                  <span>€ {{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between font-bold text-lg">
                  <span>{{ t('order.total') }}</span>
                  <span>€ {{ total.toFixed(2) }}</span>
                </div>
              </div>

              <div class="mt-6 flex gap-4">
                <button 
                  @click="clearOrder" 
                  class="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  {{ t('order.clearOrder') }}
                </button>
                <button 
                  class="flex-1 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  {{ t('order.checkout') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 