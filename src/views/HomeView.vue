<template>
  <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://i.pinimg.com/736x/ec/6a/85/ec6a85f49f587f53071d9c03beb31c1a.jpg" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="https://i.pinimg.com/1200x/d6/e3/e5/d6e3e5b684955d789a046cccf8249bdb.jpg" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="https://i.pinimg.com/1200x/cd/e4/97/cde497357b6f0e55eb3feb2f2393d6fa.jpg" class="d-block w-100" alt="...">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <div class="container">
    <section class="py-5">
      <h2 class="text-center mb-5 text-primary fw-bold fs-1">
        <i class="fas fa-crown text-warning me-2"></i>SẢN PHẨM NỔI BẬT
      </h2>
      <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4 g-lg-5 justify-content-center">
        <ProductCard v-for="p in featured" :key="p.id" :product="p" />
      </div>
    </section>

    <section class="py-5 bg-light rounded-4">
      <h2 class="text-center mb-5 text-success fw-bold fs-1">
        <i class="fas fa-star text-primary me-2"></i>HÀNG MỚI VỀ
      </h2>
      <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4 g-lg-5 justify-content-center">
        <ProductCard v-for="p in newest" :key="p.id" :product="p" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from '@/components/Product/ProductCard.vue'
import ProductService from '@/services/ProductService.js'
const ProductModel = ProductService
const featured = ref([])
const newest = ref([])

onMounted(async () => {
  try {
   const res = await ProductModel.list();
    featured.value = res.data.slice(0, 8)
    newest.value = res.data.slice(-8).reverse()
  } catch (err) {
    console.error('Lỗi tải sản phẩm:', err)
  }
})
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>