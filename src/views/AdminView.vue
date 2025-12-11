<template>
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-primary fw-bold">
        Quản lý sản phẩm
      </h2>
      <button @click="showAddModal = true" class="btn btn-success btn-lg shadow">
        Thêm sản phẩm mới
      </button>
    </div>

    <div class="card shadow border-0">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-primary">
              <tr>
                <th>#</th>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Danh mục</th>
                <th class="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, index) in products" :key="p.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <img :src="p.image" class="rounded" width="60" height="60" style="object-fit: cover;" alt="product">
                </td>
                <td class="fw-bold">{{ p.name }}</td>
                <td class="text-danger fw-bold">{{ formatPrice(p.price) }}đ</td>
                <td><span class="badge bg-info">{{ p.category || 'Chưa phân loại' }}</span></td>
                <td class="text-center">
                  <button @click="editProduct(p)" class="btn btn-warning btn-sm me-2">Sửa</button>
                  <button @click="removeProduct(p.id)" class="btn btn-danger btn-sm">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Thông báo khi chưa có dữ liệu -->
          <div v-if="products.length === 0" class="text-center py-5 text-muted">
            <h4>Chưa có sản phẩm nào</h4>
            <p>Hãy thêm sản phẩm đầu tiên!</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Thêm/Sửa -->
    <div class="modal fade" :class="{ 'show d-block': showAddModal }" tabindex="-1" v-if="showAddModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">
              {{ editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới' }}
            </h5>
            <button @click="closeModal" class="btn-close btn-close-white"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveProduct">
              <div class="row g-3">
                <div class="col-md-8">
                  <input v-model="form.name" class="form-control" placeholder="Tên sản phẩm" required>
                </div>
                <div class="col-md-4">
                  <input v-model.number="form.price" type="number" class="form-control" placeholder="Giá" required>
                </div>
                <div class="col-12">
                  <input v-model="form.image" class="form-control" placeholder="URL ảnh" required>
                </div>
                <div class="col-md-6">
                  <input v-model="form.category" class="form-control" placeholder="Danh mục (tùy chọn)">
                </div>
                <div class="col-12">
                  <textarea v-model="form.description" class="form-control" rows="3" placeholder="Mô tả"></textarea>
                </div>
              </div>
              <div class="mt-4 text-end">
                <button type="button" @click="closeModal" class="btn btn-secondary me-2">Hủy</button>
                <button type="submit" class="btn btn-primary px-4">
                  {{ editingProduct ? 'Cập nhật' : 'Thêm mới' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showAddModal" class="modal-backdrop fade show" @click="closeModal"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductService from '@/services/ProductService.js'  // Đảm bảo đường dẫn đúng

const products = ref([])
const showAddModal = ref(false)
const editingProduct = ref(null)
const form = ref({
  name: '',
  price: 0,
  image: '',
  category: '',
  description: ''
})

const loadProducts = async () => {
  try {
    const res = await ProductService.list()
    products.value = res.data
    console.log('Admin load sản phẩm thành công:', products.value)  // Debug để bạn thấy
  } catch (err) {
    console.error('Lỗi load sản phẩm:', err)
    alert('Không thể tải sản phẩm. Kiểm tra json-server!')
  }
}

// BẮT BUỘC PHẢI GỌI loadProducts TRONG onMounted
onMounted(() => {
  loadProducts()
})

const saveProduct = async () => {
  try {
    if (editingProduct.value) {
      await ProductService.update(editingProduct.value.id, form.value)
    } else {
      await ProductService.create(form.value)
    }
    closeModal()
    loadProducts()
  } catch (err) {
    console.error('Lỗi lưu:', err)
    alert('Lưu thất bại!')
  }
}

const editProduct = (p) => {
  editingProduct.value = p
  form.value = { ...p }
  showAddModal.value = true
}

const removeProduct = async (id) => {
  if (confirm('Xóa thật chứ?')) {
    try {
      await ProductService.delete(id)
      loadProducts()
    } catch (err) {
      console.error('Lỗi xóa:', err)
      alert('Xóa thất bại!')
    }
  }
}

const closeModal = () => {
  showAddModal.value = false
  editingProduct.value = null
  form.value = { name: '', price: 0, image: '', category: '', description: '' }
}

const formatPrice = (price) => price.toLocaleString('vi-VN')
</script>

<style scoped>
.modal-backdrop {
  background: rgba(0, 0, 0, 0.5);
}
.card {
  border-radius: 16px;
}
.btn:hover {
  transform: translateY(-2px);
}
</style>