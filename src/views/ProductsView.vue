<template>
  <div class="container py-5">
    <h1 class="text-center mb-5 text-primary fw-bold display-4">
      TẤT CẢ SẢN PHẨM
    </h1>

    <div v-if="products.length > 0" class="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4 g-lg-5">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>

    <div v-else class="text-center py-5">
      <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;"></div>
      <p class="mt-4 fs-4">Đang tải sản phẩm...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from '@/components/Product/ProductCard.vue'
import ProductService from '@/services/ProductService.js'  

const products = ref([])

onMounted(async () => {
  try {
    const res = await ProductService.list()  
    products.value = res.data
  } catch (err) {
    console.error('Lỗi tải sản phẩm:', err)
    alert('Không thể tải sản phẩm. Kiểm tra json-server!')
  }
})
</script>