<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useOrderStore } from '~/stores/order'
import type { MenuContent, MenuItem } from '~/types'
import MenuItemComponent from '~/components/MenuItem.vue'
import MenuItemSelectModal from '~/components/MenuItemSelectModal.vue'

const orderStore = useOrderStore()

// State
const menuData = ref<MenuContent | null>(null)
const selectedCategory = ref<string | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const selectedItem = ref<MenuItem | null>(null)

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
</template> 