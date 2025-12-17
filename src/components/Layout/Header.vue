<template>
  <header class="bg-dark text-white py-3 shadow-sm">
    <div class="container d-flex justify-content-between align-items-center">
      <h1 class="h3 mb-0">
        <router-link to="/" class="text-white text-decoration-none fw-bold">
          TTT Shop
        </router-link>
      </h1>

      <div class="d-flex align-items-center gap-3">
        <router-link to="/admin" class="btn btn-warning btn-sm">
          Quản trị
        </router-link>

        <router-link to="/cart" class="btn btn-outline-light position-relative">
          Giỏ hàng
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {{ cartStore.cartCount }}
          </span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useCartStore } from '@/stores/cart.js'
const cartStore = useCartStore()
</script>