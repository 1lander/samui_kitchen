<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useOrderStore } from '~/stores/order'
import type { MenuContent } from '~/types'

const orderStore = useOrderStore()
const { addItem } = orderStore

// State
const menuData = ref<MenuContent | null>(null)
const selectedCategory = ref<string | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

// Computed
const categories = computed(() => menuData.value?.categories || [])

const allItems = computed(() => {
  if (!menuData.value) return []
  
  return menuData.value.categories.flatMap(category => 
    category.items.map(item => ({
      ...item,
      category: category.name
    }))
  )
})

const categoryItems = computed(() => {
  if (!selectedCategory.value || !menuData.value) return []
  return menuData.value.categories.find(c => c.name === selectedCategory.value)?.items || []
})

// Selected item state
const selectedDishChoice = ref<string | null>(null)
const itemNotes = ref('')
const selectedItem = ref<{
  name: string, 
  price: number,
  dishChoices?: string[]
} | null>(null)

// Load menu data when component is mounted
async function fetchMenu() {
  isLoading.value = true
  error.value = null
  
  try {
    const { data } = await useAsyncData(() => queryContent<MenuContent>("menu").findOne())
    menuData.value = data.value
    
    // Set the first category as selected by default if there are categories
    if (menuData.value?.categories && menuData.value.categories.length > 0) {
      selectedCategory.value = menuData.value.categories[0].name
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load menu'
    console.error('Error loading menu:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchMenu()
})

function setSelectedCategory(categoryName: string) {
  selectedCategory.value = categoryName
}

function selectItem(item: any) {
  selectedItem.value = {
    name: item.name,
    price: item.price,
    dishChoices: item.dishChoices
  }
  
  // Reset selections
  selectedDishChoice.value = item.dishChoices && item.dishChoices.length > 0 
    ? item.dishChoices[0] 
    : null
  itemNotes.value = ''
}

function confirmAddToOrder() {
  if (selectedItem.value) {
    orderStore.addItem({
      name: selectedItem.value.name,
      price: selectedItem.value.price
    }, selectedDishChoice.value || undefined, itemNotes.value || undefined)
    
    selectedItem.value = null
  }
}

const { t } = useI18n()
</script>

<template>
  <div>
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
      <div
        v-for="item in allItems.filter(i => i.category === selectedCategory)"
        :key="item.name"
        @click="selectItem(item)"
        class="border border-gray-200 p-4 rounded-lg cursor-pointer transition-all hover:shadow-md"
        :class="{ 'border-primary': selectedItem?.name === item.name }"
      >
        <div class="flex justify-between">
          <h3 class="text-lg font-medium">{{ t(item.name) }}</h3>
          <span class="text-lg font-medium text-secondary">€ {{ item.price.toFixed(2) }}</span>
        </div>
        <p v-if="item.description" class="mt-1 text-sm text-gray-600">
          {{ t(item.description) }}
        </p>
        <div v-if="item.dishChoices && item.dishChoices.length > 0" class="mt-2 text-sm">
          <span v-for="choice in item.dishChoices" :key="choice" class="ml-1">
            {{ t(`menu.dishChoices.${choice}`) }}
            <template v-if="choice !== item.dishChoices[item.dishChoices.length - 1]">/</template>
          </span>
        </div>
      </div>
    </div>

    <!-- No items message -->
    <div v-else class="py-12 text-center">
      <p class="text-lg text-gray-600">{{ t('menu.noItems') }}</p>
    </div>

    <!-- Item customization modal -->
    <div v-if="selectedItem" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-xl font-bold mb-4">{{ t(selectedItem.name) }}</h3>
        
        <div v-if="selectedItem.dishChoices && selectedItem.dishChoices.length > 0" class="mb-4">
          <p class="font-medium mb-2">{{ t('menu.dishChoices.choice') }}:</p>
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
            @click="confirmAddToOrder"
            class="flex-1 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            {{ t('order.addToOrder') }} - € {{ selectedItem.price.toFixed(2) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template> 