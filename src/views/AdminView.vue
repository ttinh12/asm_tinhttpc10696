<template>
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-primary fw-bold">
        Quản lý sản phẩm
      </h2>
      <button @click="openAddModal" class="btn btn-success btn-lg shadow">
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
                <th>Biến thể</th>
                <th class="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, index) in products" :key="p.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <img :src="p.image" class="rounded" width="60" height="60" style="object-fit: cover;">
                </td>
                <td class="fw-bold">{{ p.name }}</td>
                <td class="text-danger fw-bold">{{ formatPrice(p.price) }}đ</td>
                <td><span class="badge bg-info">{{ p.category || 'Chưa phân loại' }}</span></td>
                <td>
                  <span class="badge bg-secondary">{{ (p.variants || []).length }} màu</span>
                </td>
                <td class="text-center">
                  <button @click="openEditModal(p)" class="btn btn-warning btn-sm me-2">Sửa</button>
                  <button @click="removeProduct(p.id)" class="btn btn-danger btn-sm">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="products.length === 0" class="text-center py-5 text-muted">
            <h4>Chưa có sản phẩm nào</h4>
            <p>Hãy thêm sản phẩm đầu tiên!</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Thêm/Sửa -->
    <div class="modal fade" :class="{ 'show d-block': showModal }" tabindex="-1" v-if="showModal">
      <div class="modal-dialog modal-xl">
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
                  <label class="form-label fw-bold">Tên sản phẩm</label>
                  <input v-model="form.name" class="form-control" required>
                </div>
                <div class="col-md-4">
                  <label class="form-label fw-bold">Giá chính (VNĐ)</label>
                  <input v-model.number="form.price" type="number" class="form-control" required>
                </div>
                <div class="col-12">
                  <label class="form-label fw-bold">Ảnh chính (URL)</label>
                  <input v-model="form.image" class="form-control" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold">Danh mục</label>
                  <input v-model="form.category" class="form-control">
                </div>
                <div class="col-12">
                  <label class="form-label fw-bold">Mô tả</label>
                  <textarea v-model="form.description" class="form-control" rows="3"></textarea>
                </div>
              </div>

              <!-- PHẦN BIẾN THỂ (TÙY CHỌN) -->
              <hr class="my-4">
              <h5 class="text-primary">Biến thể màu sắc (tùy chọn)</h5>
              <div v-for="(variant, index) in form.variants" :key="index" class="row g-3 mb-3 align-items-end border p-3 rounded bg-light">
                <div class="col-md-3">
                  <label class="form-label">Màu</label>
                  <input v-model="variant.color" class="form-control" placeholder="Ví dụ: Trắng">
                </div>
                <div class="col-md-4">
                  <label class="form-label">Ảnh biến thể (URL)</label>
                  <input v-model="variant.image" class="form-control">
                </div>
                <div class="col-md-2">
                  <label class="form-label">Giá biến thể</label>
                  <input v-model.number="variant.price" type="number" class="form-control">
                </div>
                <div class="col-md-2">
                  <label class="form-label">Size (cách nhau dấu phẩy)</label>
                  <input v-model="variant.sizesStr" class="form-control" placeholder="M,L,XL">
                </div>
                <div class="col-md-1">
                  <button type="button" @click="removeVariant(index)" class="btn btn-danger btn-sm">
                    Xóa
                  </button>
                </div>
              </div>

              <button type="button" @click="addVariant" class="btn btn-outline-primary mb-3">
                + Thêm biến thể màu
              </button>

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
    <div v-if="showModal" class="modal-backdrop fade show" @click="closeModal"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductService from '@/services/ProductService.js'

const products = ref([])
const showModal = ref(false)
const editingProduct = ref(null)
const form = ref({
  name: '',
  price: 0,
  image: '',
  category: '',
  description: '',
  variants: []
})

const loadProducts = async () => {
  try {
    const res = await ProductService.list()
    products.value = res.data
  } catch (err) {
    console.error('Lỗi load:', err)
    alert('Không thể tải sản phẩm!')
  }
}

onMounted(loadProducts)

const openAddModal = () => {
  editingProduct.value = null
  form.value = {
    name: '',
    price: 0,
    image: '',
    category: '',
    description: '',
    variants: []
  }
  showModal.value = true
}

const openEditModal = (p) => {
  editingProduct.value = p
  form.value = {
    ...p,
    variants: p.variants ? p.variants.map(v => ({
      ...v,
      sizesStr: v.sizes ? v.sizes.join(', ') : ''
    })) : []
  }
  showModal.value = true
}

const addVariant = () => {
  form.value.variants.push({
    color: '',
    image: '',
    price: form.value.price,
    sizesStr: ''
  })
}

const removeVariant = (index) => {
  form.value.variants.splice(index, 1)
}

const saveProduct = async () => {
  try {
    const processedVariants = form.value.variants.map(v => ({
      color: v.color,
      image: v.image || form.value.image,
      price: v.price || form.value.price,
      sizes: v.sizesStr ? v.sizesStr.split(',').map(s => s.trim()).filter(s => s) : []
    })).filter(v => v.color)

    const dataToSave = {
      ...form.value,
      variants: processedVariants.length > 0 ? processedVariants : undefined
    }

    if (editingProduct.value) {
      await ProductService.update(editingProduct.value.id, dataToSave)
    } else {
      await ProductService.create(dataToSave)
    }
    closeModal()
    loadProducts()
  } catch (err) {
    console.error('Lỗi lưu:', err)
    alert('Lưu thất bại!')
  }
}

const removeProduct = async (id) => {
  if (confirm('Xóa sản phẩm này thật chứ?')) {
    try {
      await ProductService.delete(id)
      loadProducts()
    } catch (err) {
      alert('Xóa thất bại!')
    }
  }
}

const closeModal = () => {
  showModal.value = false
}

const formatPrice = (price) => price.toLocaleString('vi-VN')
</script>

<style scoped>
.cursor-pointer { cursor: pointer; }
</style>