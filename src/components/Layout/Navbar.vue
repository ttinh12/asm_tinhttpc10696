<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light bg-white shadow-sm sticky-top">
    <div class="container">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav mx-auto fw-bold">
          <li class="nav-item"><router-link to="/" class="nav-link">TRANG CHỦ</router-link></li>
          <li class="nav-item"><router-link to="/products" class="nav-link">SẢN PHẨM</router-link></li>
          <li class="nav-item"><router-link to="/cart" class="nav-link">GIỎ HÀNG</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup></script>