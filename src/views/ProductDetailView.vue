<template>
  <div class="container py-5" v-if="product">
    <div class="row g-5">
      <!-- Ảnh sản phẩm -->
      <div class="col-lg-6">
        <img
          :src="product.image"
          class="img-fluid rounded-4 shadow-lg"
          alt="product.name"
          style="max-height: 560px; object-fit: cover; width: 100%;"
        />
      </div>

      <!-- Thông tin sản phẩm -->
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold mb-3">{{ product.name }}</h1>

        <div class="d-flex align-items-center mb-4">
          <div class="text-warning fs-4 me-2">★★★★☆</div>
          <span class="text-muted">| Đã bán 1.2k+</span>
        </div>

        <div class="bg-light p-4 rounded-4 mb-4">
          <p class="display-6 text-danger fw-bold mb-0">
            {{ formatPrice(product.price) }}đ
          </p>
        </div>

        <p class="fs-5 text-muted mb-4">{{ product.description }}</p>

        <div class="d-flex gap-3">
          <button @click="addToCart" class="btn btn-danger btn-lg px-5 rounded-pill shadow">
            <i class="fas fa-cart-plus me-2"></i>Thêm vào giỏ hàng
          </button>
        </div>

        <hr class="my-5" />

        <div class="row text-muted">
          <div class="col-sm-6 mb-3">
            <strong>Danh mục:</strong> {{ product.category || 'Thời trang nam' }}
          </div>
          <div class="col-sm-6 mb-3">
            <strong>Giao hàng:</strong> Toàn quốc – Freeship từ 300k
          </div>
          <div class="col-sm-6">
            <strong>Thương hiệu:</strong> TTT Shop
          </div>
          <div class="col-sm-6">
            <strong>Bảo hành:</strong> Đổi trả 7 ngày
          </div>
        </div>
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
import { getProductById } from '@/api.js'

const route = useRoute()
const product = ref(null)

onMounted(async () => {
  try {
    const res = await getProductById(route.params.id)
    product.value = res.data
  } catch (err) {
    console.error('Không tìm thấy sản phẩm:', err)
    alert('Sản phẩm không tồn tại!')
  }
})

const formatPrice = (price) => {
  return Number(price).toLocaleString('vi-VN')
}

const addToCart = () => {
  alert(`Đã thêm "${product.value.name}" vào giỏ hàng!`)
  // Sau này sẽ dùng Pinia
}
</script>

<style scoped>
.img-fluid {
  transition: transform 0.4s ease;
}
.img-fluid:hover {
  transform: scale(1.03);
}
</style>