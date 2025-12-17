<template>
  <div class="container py-5">
    <h1 class="text-center mb-5 text-primary fw-bold display-4">
      TẤT CẢ SẢN PHẨM
    </h1>

    <div v-if="products.length > 0" class="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4 g-lg-5">
      <div v-for="p in products" :key="p.id" class="col">
        <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
          <router-link :to="`/product/${p.id}`">
            <img :src="p.image" class="card-img-top" style="height: 300px; object-fit: cover;" :alt="p.name">
          </router-link>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold">{{ p.name }}</h5>
            <p class="card-text text-danger fw-bold fs-4 mt-auto">{{ formatPrice(p.price) }}đ</p>
            <button @click.stop="addToCart(p)" class="btn btn-danger mt-3 rounded-pill">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;"></div>
      <p class="mt-4 fs-4">Đang tải sản phẩm...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductService from '@/services/ProductService.js'
import { useCartStore } from '@/stores/cart.js'  // <-- THÊM DÒNG NÀY

const products = ref([])
const cartStore = useCartStore()  // <-- THÊM DÒNG NÀY

onMounted(async () => {
  try {
    const res = await ProductService.list()  
    products.value = res.data
  } catch (err) {
    console.error('Lỗi tải sản phẩm:', err)
    alert('Không thể tải sản phẩm. Kiểm tra json-server!')
  }
})

const addToCart = (product) => {
  cartStore.addToCart(product)  // <-- THAY ALERT THÀNH DÒNG NÀY
}

const formatPrice = (price) => price.toLocaleString('vi-VN')
</script>

<style scoped>
.card:hover {
  transform: translateY(-8px);
  transition: transform 0.3s ease;
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}
</style>