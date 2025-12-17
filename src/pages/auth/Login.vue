<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow border-0">
          <div class="card-header bg-primary text-white text-center py-4">
            <h3 class="mb-0">ĐĂNG NHẬP QUẢN TRỊ</h3>
          </div>
          <div class="card-body p-5">
            <form @submit.prevent="handleLogin">
              <div class="mb-4">
                <label class="form-label fw-bold">Tên đăng nhập</label>
                <input v-model="username" type="text" class="form-control form-control-lg" placeholder="admin" required>
              </div>
              <div class="mb-4">
                <label class="form-label fw-bold">Mật khẩu</label>
                <input v-model="password" type="password" class="form-control form-control-lg" placeholder="123456" required>
              </div>
              <button type="submit" class="btn btn-primary btn-lg w-100 shadow">
                Đăng nhập
              </button>
            </form>

            <div class="mt-4 text-center text-muted">
              <small>Tài khoản thử: admin / 123456</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const username = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = () => {
  // Giả lập đăng nhập (thực tế sẽ gọi API)
  if (username.value === 'admin' && password.value === '123456') {
    authStore.login('fake-jwt-token-123', 'admin')
    router.push('/admin')
  } else {
    alert('Sai tên đăng nhập hoặc mật khẩu!')
  }
}
</script>

<style scoped>
.card {
  border-radius: 16px;
}
</style>