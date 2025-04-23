<script setup lang="ts">
import { useOrderStore } from '~/stores/order'
import { storeToRefs } from 'pinia'

const orderStore = useOrderStore()
const { items, subtotal, totalItems } = storeToRefs(orderStore)

const { t } = useI18n()
const isVisible = ref(false)

watch(totalItems, (newValue) => {
  if (newValue > 0) {
    isVisible.value = true
    
    // Auto-hide after 3 seconds if the user hasn't interacted with it
    setTimeout(() => {
      isVisible.value = false
    }, 3000)
  }
})

function toggleVisibility() {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <div 
    v-if="totalItems > 0"
    class="fixed bottom-4 right-4 z-40"
  >
    <!-- Collapsed version (always visible) -->
    <button 
      @click="toggleVisibility"
      class="flex items-center justify-center gap-2 bg-primary text-white rounded-full px-4 py-2 shadow-md hover:bg-primary-dark transition-colors"
    >
      <span class="font-bold">{{ totalItems }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    </button>

    <!-- Expanded version (shows when clicked) -->
    <div v-if="isVisible" class="absolute bottom-14 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-72">
      <h3 class="text-lg font-bold mb-3 border-b border-gray-200 pb-2">{{ t('order.yourOrder') }}</h3>
      
      <div class="max-h-60 overflow-y-auto">
        <ul class="divide-y divide-gray-100">
          <li v-for="item in items.slice(0, 3)" :key="item.id" class="py-2 flex justify-between">
            <div>
              <span class="font-medium">{{ item.quantity }}x</span> {{ t(item.name) }}
              <span v-if="item.dishChoice" class="text-xs text-gray-600 block">
                {{ t(`menu.dishChoices.${item.dishChoice}`) }}
              </span>
            </div>
            <div class="text-gray-700">
              € {{ (item.price * item.quantity).toFixed(2) }}
            </div>
          </li>
          
          <li v-if="items.length > 3" class="py-2 text-center text-gray-500 italic text-sm">
            {{ t('order.andMoreItems', { count: items.length - 3 }) }}
          </li>
        </ul>
      </div>
      
      <div class="mt-3 pt-2 border-t border-gray-200">
        <div class="flex justify-between mb-2">
          <span class="font-medium">{{ t('order.subtotal') }}</span>
          <span>€ {{ subtotal.toFixed(2) }}</span>
        </div>
      </div>
      
      <NuxtLink 
        to="/order" 
        class="mt-3 block w-full text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
      >
        {{ t('order.viewOrder') }}
      </NuxtLink>
    </div>
  </div>
</template> 