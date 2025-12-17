<template>
  <div class="container py-5" v-if="product">
    <div class="row g-5">
      <!-- Ảnh chính + thumbnail -->
      <div class="col-lg-6">
        <img 
          :src="currentImage" 
          class="img-fluid rounded-4 shadow-lg mb-4" 
          style="max-height: 560px; object-fit: cover; width: 100%;"
          :alt="product.name"
        >

        <!-- Thumbnail: ảnh chính + các biến thể -->
        <div class="d-flex gap-3 flex-wrap justify-content-center">
          <!-- Ảnh chính (mặc định) -->
          <div 
            @click="resetToDefault"
            class="border rounded p-1 cursor-pointer"
            :class="{ 'border-primary border-3': selectedVariant === null }"
          >
            <img :src="product.image" width="80" height="80" class="rounded object-fit-cover">
          </div>

          <!-- Các biến thể -->
          <div 
            v-for="variant in product.variants || []" 
            :key="variant.color"
            @click="selectVariant(variant)"
            class="border rounded p-1 cursor-pointer"
            :class="{ 'border-primary border-3': selectedVariant === variant }"
          >
            <img :src="variant.image || product.image" width="80" height="80" class="rounded object-fit-cover">
          </div>
        </div>
      </div>

      <!-- Thông tin sản phẩm -->
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold mb-3">{{ product.name }}</h1>

        <div class="d-flex align-items-center mb-3">
          <div class="text-warning fs-4 me-2">★★★★☆</div>
          <span class="text-muted">| Đã bán 1.2k+</span>
        </div>

        <div class="bg-light p-4 rounded-4 mb-4">
          <p class="display-6 text-danger fw-bold mb-0">
            {{ formatPrice(currentPrice) }}đ
          </p>
        </div>

        <!-- Chọn màu -->
        <div class="mb-4">
          <strong>Màu sắc:</strong>
          <div class="d-flex gap-3 mt-2 flex-wrap">
            <button 
              @click="resetToDefault"
              class="btn btn-outline-secondary"
              :class="{ 'btn-primary': selectedVariant === null }"
            >
              Mặc định
            </button>
            <button 
              v-for="variant in product.variants || []" 
              :key="variant.color"
              @click="selectVariant(variant)"
              class="btn btn-outline-secondary"
              :class="{ 'btn-primary': selectedVariant === variant }"
            >
              {{ variant.color }}
            </button>
          </div>
        </div>

        <!-- Chọn size -->
        <div v-if="currentSizes.length > 0" class="mb-4">
          <strong>Kích thước:</strong>
          <div class="d-flex gap-3 mt-2 flex-wrap">
            <button v-for="size in currentSizes" :key="size" class="btn btn-outline-dark">
              {{ size }}
            </button>
          </div>
        </div>

        <p class="fs-5 text-muted mb-5">{{ product.description }}</p>

        <button @click="addToCart" class="btn btn-danger btn-lg px-5 rounded-pill shadow">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-5">
    <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;"></div>
    <p class="mt-4 fs-4">Đang tải chi tiết sản phẩm...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductService from '@/services/ProductService.js'
import { useCartStore } from '@/stores/cart.js'  // <-- THÊM DÒNG NÀY

const route = useRoute()
const product = ref(null)
const selectedVariant = ref(null)
const currentImage = ref('')
const currentPrice = ref(0)
const currentSizes = ref([])

const cartStore = useCartStore()  // <-- THÊM DÒNG NÀY

onMounted(async () => {
  try {
    const res = await ProductService.getById(route.params.id)
    product.value = res.data
    resetToDefault()
  } catch (err) {
    console.error('Không tìm thấy sản phẩm:', err)
    alert('Sản phẩm không tồn tại!')
  }
})

const resetToDefault = () => {
  selectedVariant.value = null
  currentImage.value = product.value.image
  currentPrice.value = product.value.price
  currentSizes.value = []
}

const selectVariant = (variant) => {
  selectedVariant.value = variant
  currentImage.value = variant.image || product.value.image
  currentPrice.value = variant.price || product.value.price
  currentSizes.value = variant.sizes || []
}

const formatPrice = (price) => Number(price).toLocaleString('vi-VN')

const addToCart = () => {
  cartStore.addToCart(product.value, selectedVariant.value)  // <-- THAY ALERT THÀNH DÒNG NÀY
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.object-fit-cover {
  object-fit: cover;
}
</style>