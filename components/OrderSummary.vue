<script setup lang="ts">
import { useOrderStore } from '~/stores/order'
import { storeToRefs } from 'pinia'

const orderStore = useOrderStore()
const { items, subtotal, total, totalItems } = storeToRefs(orderStore)
const { removeItem, updateItemQuantity, clearOrder } = orderStore

const { t } = useI18n()
</script>

<template>
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
</template> 