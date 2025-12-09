<template>
  <div class="product-card-wrapper">
    <div class="product-card">
      <router-link :to="`/product/${product.id}`" class="text-decoration-none">
        <div class="image-container">
          <img :src="product.image" alt="product" class="product-image">
        </div>
        <div class="card-body p-3">
          <h6 class="product-name mb-2">{{ product.name }}</h6>
          <p class="product-desc text-muted small mb-3">{{ truncate(product.description, 50) }}</p>
          <div class="d-flex justify-content-between align-items-end">
            <div>
              <span class="price fw-bold text-danger fs-5">{{ formatPrice(product.price) }}đ</span>
            </div>
            <button @click.prevent="addToCart" class="btn btn-danger btn-sm rounded-pill px-3 shadow-sm">
              <i class="fas fa-cart-plus me-1"></i>Thêm
            </button>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ product: Object })

const formatPrice = (price) => Number(price).toLocaleString('vi-VN')
const truncate = (str, n) => str?.length > n ? str.substr(0, n-1) + '...' : str

const addToCart = () => {
  alert(`Đã thêm "${props.product.name}" vào giỏ hàng!`)
}
</script>

<style scoped>
.product-card-wrapper {
  padding: 10px;
}

.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  transition: all 0.4s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.18) !important;
}

.image-container {
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: #f8f9fa;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.08);
}

.product-name {
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.3;
}

.product-desc {
  line-height: 1.4;
  color: #777;
}

.price {
  font-weight: 700 !important;
}
</style>