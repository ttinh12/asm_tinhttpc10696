// src/stores/cart.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([]) // [{ product, variant, quantity }]

  const cartCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const totalPrice = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

  const addToCart = (product, selectedVariant = null) => {
    const price = selectedVariant?.price || product.price
    const image = selectedVariant?.image || product.image
    const color = selectedVariant?.color || null

    const key = `${product.id}-${color || 'default'}`
    const existing = items.value.find(i => i.key === key)

    if (existing) {
      existing.quantity += 1
    } else {
      items.value.push({
        key,
        product,
        variant: selectedVariant,
        price,
        image,
        color,
        quantity: 1
      })
    }
  }

  const updateQuantity = (key, quantity) => {
    if (quantity <= 0) {
      items.value = items.value.filter(i => i.key !== key)
    } else {
      const item = items.value.find(i => i.key === key)
      if (item) item.quantity = quantity
    }
  }

  const removeItem = (key) => {
    items.value = items.value.filter(i => i.key !== key)
  }

  const clearCart = () => {
    items.value = []
  }

  return { items, cartCount, totalPrice, addToCart, updateQuantity, removeItem, clearCart }
}, {
  persist: true
})