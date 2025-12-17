<template>
  <div class="container py-5">
    <h1 class="mb-5 text-center text-primary fw-bold display-4">GIỎ HÀNG CỦA BẠN</h1>

    <div v-if="cartStore.items.length > 0" class="card shadow">
      <div class="card-body">
        <table class="table align-middle">
          <thead class="table-light">
            <tr>
              <th>Ảnh</th>
              <th>Sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Tổng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cartStore.items" :key="item.key">
              <td><img :src="item.image" width="80" class="rounded" alt="item.product.name"></td>
              <td class="fw-bold">
                {{ item.product.name }}
                <small v-if="item.color" class="text-muted d-block">Màu: {{ item.color }}</small>
              </td>
              <td>{{ formatPrice(item.price) }}đ</td>
              <td>
                <div class="input-group w-75">
                  <button class="btn btn-outline-secondary" @click="cartStore.updateQuantity(item.key, item.quantity - 1)">-</button>
                  <input type="text" class="form-control text-center" :value="item.quantity" readonly>
                  <button class="btn btn-outline-secondary" @click="cartStore.updateQuantity(item.key, item.quantity + 1)">+</button>
                </div>
              </td>
              <td class="text-danger fw-bold">{{ formatPrice(item.price * item.quantity) }}đ</td>
              <td>
                <button @click="cartStore.removeItem(item.key)" class="btn btn-danger btn-sm">
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="text-end mt-4">
          <h4>Tổng tiền: <span class="text-danger">{{ formatPrice(cartStore.totalPrice) }}đ</span></h4>
          <router-link to="/checkout" class="btn btn-success btn-lg px-5 mt-3">Thanh toán</router-link>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <h3>Giỏ hàng trống</h3>
      <router-link to="/products" class="btn btn-primary btn-lg mt-3">Tiếp tục mua sắm</router-link>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart.js'

const cartStore = useCartStore()

const formatPrice = (price) => price.toLocaleString('vi-VN')
</script>