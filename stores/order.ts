import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  dishChoice?: string
  notes?: string
}

export const useOrderStore = defineStore('order', () => {
  // State
  const items = ref<OrderItem[]>([])
  const customerName = ref('')
  const customerContact = ref('')
  const isPickup = ref(true)
  const deliveryAddress = ref('')

  // Getters
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const total = computed(() => {
    // Could add delivery fee, tax, etc. here if needed
    return subtotal.value
  })

  const hasItems = computed(() => items.value.length > 0)

  // Actions
  function addItem(item: Omit<OrderItem, 'id' | 'quantity'>, dishChoice?: string, notes?: string) {
    // Generate a unique ID for the item
    const id = Date.now().toString()
    
    // Check if the same item with the same options already exists
    const existingItemIndex = items.value.findIndex(i => 
      i.name === item.name && i.dishChoice === dishChoice
    )
    
    if (existingItemIndex !== -1) {
      // If the item already exists, increment its quantity
      items.value[existingItemIndex].quantity++
    } else {
      // Otherwise, add it as a new item
      items.value.push({
        id,
        ...item,
        quantity: 1,
        dishChoice,
        notes
      })
    }
  }

  function removeItem(itemId: string) {
    const index = items.value.findIndex(item => item.id === itemId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  function updateItemQuantity(itemId: string, quantity: number) {
    const index = items.value.findIndex(item => item.id === itemId)
    if (index !== -1) {
      if (quantity <= 0) {
        removeItem(itemId)
      } else {
        items.value[index].quantity = quantity
      }
    }
  }

  function updateItemNotes(itemId: string, notes: string) {
    const index = items.value.findIndex(item => item.id === itemId)
    if (index !== -1) {
      items.value[index].notes = notes
    }
  }

  function clearOrder() {
    items.value = []
    customerName.value = ''
    customerContact.value = ''
    deliveryAddress.value = ''
    isPickup.value = true
  }

  function setCustomerInfo(name: string, contact: string) {
    customerName.value = name
    customerContact.value = contact
  }

  function setDeliveryOption(pickup: boolean, address: string = '') {
    isPickup.value = pickup
    deliveryAddress.value = address
  }

  return {
    // State
    items,
    customerName,
    customerContact,
    isPickup,
    deliveryAddress,
    
    // Getters
    totalItems,
    subtotal,
    total,
    hasItems,
    
    // Actions
    addItem,
    removeItem,
    updateItemQuantity,
    updateItemNotes,
    clearOrder,
    setCustomerInfo,
    setDeliveryOption
  }
}) 