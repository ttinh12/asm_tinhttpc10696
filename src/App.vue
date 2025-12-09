<template>
  <div class="d-flex flex-column min-vh-100">
    <Header />
    <Navbar />
    <main class="flex-fill">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/Layout/Header.vue'
import Navbar from '@/components/Layout/Navbar.vue'
import Footer from '@/components/Layout/Footer.vue'
</script>