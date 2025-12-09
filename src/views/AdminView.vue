<template>
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-primary fw-bold">
        <i class="fas fa-cogs me-2"></i>Quản lý sản phẩm
      </h2>
      <button @click="showAddModal = true" class="btn btn-success btn-lg shadow">
        <i class="fas fa-plus me-2"></i>Thêm sản phẩm mới
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
                  <img :src="p.image" class="rounded" width="60" height="60" style="object-fit: cover;">
                </td>
                <td class="fw-bold">{{ p.name }}</td>
                <td class="text-danger fw-bold">{{ formatPrice(p.price) }}đ</td>
                <td><span class="badge bg-info">{{ p.category || 'Chưa phân loại' }}</span></td>
                <td class="text-center">
                  <button @click="editProduct(p)" class="btn btn-warning btn-sm me-2">
                    <i class="fas fa-edit">Sửa</i>
                  </button>
                  <button @click="deleteProduct(index)" class="btn btn-danger btn-sm">
                    <i class="fas fa-trash">Xóa</i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Thêm / Sửa -->
    <div class="modal fade" :class="{ 'show d-block': showAddModal || editingProduct }" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">
              <i class="fas fa-box me-2"></i>
              {{ editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới' }}
            </h5>
            <button @click="closeModal" class="btn-close btn-close-white"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveProduct">
              <div class="row g-3">
                <div class="col-md-8">
                  <label class="form-label">Tên sản phẩm</label>
                  <input v-model="form.name" type="text" class="form-control" required>
                </div>
                <div class="col-md-4">
                  <label class="form-label">Giá (VNĐ)</label>
                  <input v-model.number="form.price" type="number" class="form-control" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Link ảnh</label>
                  <input v-model="form.image" type="text" class="form-control" placeholder="https://..." required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Danh mục</label>
                  <input v-model="form.category" type="text" class="form-control" placeholder="Áo thun, Quần jeans...">
                </div>
                <div class="col-12">
                  <label class="form-label">Mô tả ngắn</label>
                  <textarea v-model="form.description" class="form-control" rows="3"></textarea>
                </div>
              </div>
              <div class="mt-4 text-end">
                <button type="button" @click="closeModal" class="btn btn-secondary me-2">Hủy</button>
                <button type="submit" class="btn btn-primary px-4">
                  <i class="fas fa-save me-2"></i>{{ editingProduct ? 'Cập nhật' : 'Thêm mới' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showAddModal || editingProduct" class="modal-backdrop fade show" @click="closeModal"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([
  { id: 1, name: "Áo Thun Nam Cao Cấp", price: 299000, description: "Chất cotton mềm mại, thoáng mát, form chuẩn", image: "data:image/jpeg;base64,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" },
  { id: 2, name: "Quần Jean Rách Nhẹ", price: 449000, description: "Phong cách trẻ trung, co giãn tốt", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRV1_VsX2Euj-3kK0v_SzWcn0fXjCp5IXns1rlE_Pk1IM4XRzufBJicY4pZbb3Wn2DqT3keO4wzrjiQ8O0bn3gKCeYTaMIx5DyntRuJdK633JnVW5J08j__X3fCjn1-MzVgccuPpzE9Dnlt&usqp=CAc" },
  { id: 3, name: "Giày Sneaker Trắng", price: 699000, description: "Đế cao su chống trơn, cực bền", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSjFFujUoGOeryTq-q6L0N4tnnqghEbAZZyfyrkXMLPeQVaaL_D-MqMnWl6jO4CmHneDGD8lptAC_EhXoN4Dz9eHSc4QAMl9zO_dCKP6BM&usqp=CAc" },
  { id: 4, name: "Túi Đeo Chéo Mini", price: 199000, description: "Nhỏ gọn, nhiều ngăn tiện lợi", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRa433yPACgUdysVuO8BXbAB0tHEvbZF83OckF0xJPDlpHoiqKCUux9_vuQQv8B90n1XvqDz36kgvy6JV8Iy2inXdzVtj6PxGaxzl0OK97w-Ot5CVicKjhXk0mGuX2KXI0wax-r88u5&usqp=CAc" },
  { id: 5, name: "Đồng Hồ Nam Chính Hãng", price: 1299000, description: "Máy Nhật, chống nước 50m", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS8eG6INg9fET4XHeOuOTjd8fdQg-BuQbOuXObxS8bUm6TVLoldTNzBuGEd46Y3-muIcNIYt65aU467DHXI6mmUssD2xdmzXMeS5Q9JpQzIhBYWkYtH1DqfNikDmkyNIeEtQwy8SedTlA&usqp=CAc" },
  { id: 6, name: "Áo Khoác Kaki Form Rộng", price: 529000, description: "Chống nắng, chống gió cực tốt", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT3p2lHo7IKEeWunu3zE0DAZzolLwiDf_wnWUL0NW-mEkt9UsU9nErKDJ5TLhHe2o-KAlBYPXOaZ1XtjOoczFXwQ_aE7XT111Q5Gp4tfIJ5DQbaGBA6qChgFg&usqp=CAc" },
  { id: 7, name: "Mũ Lưỡi Trai Thêu Logo", price: 159000, description: "Form đẹp, chất kaki dày dặn", image: "data:image/webp;base64,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" },
  { id: 8, name: "Dây Nịt Da Thật 100%", price: 399000, description: "Khóa inox không gỉ, bền bỉ", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTbeEoT8COdvI9viPJKH_EdTVlPim41_vZJCoSthxS3cbyNCDT4pYgLq1HBjV3qlZUUbfYXzAbt38gL8jsdYnJbarjKOWT8MUdLPvbRE2VEW_KCPSbLK8JFVmmdFEgOz3fCkoBBB7SU&usqp=CAc" },
  { id: 9, name: "Set Bộ Thể Thao Nam", price: 599000, description: "Thoáng mát, thấm hút mồ hôi", image: "data:image/jpeg;base64,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" },
  { id: 10, name: "Áo Sơ Mi Nam Dài Tay", price: 379000, description: "Vải kate mềm, không nhăn", image: "data:image/webp;base64,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" },
  { id: 11, name: "Quần Short Kaki Nam", price: 279000, description: "Mặc hè cực mát, form trẻ trung", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSZ3mrqEtS6a8OCPGaEThkPaY_24ZzK2-t7RF8qNViIDJl5w-hSYZ-CleS2mwKr2g8NJZV_g0S-5iJOTrg1bS6JToCNuMuutkL9-dVwrWbhGNaEFe6DpqGFmAAZ1rR_hc64bKmOps49iPw&usqp=CAc" },
  { id: 12, name: "Balo Laptop Chống Nước", price: 499000, description: "Ngăn riêng laptop 15.6 inch", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSvwsBWBP2N6Z5YQ6l10x9C3J68WSADnFJ2lbwiZLIaEc7PZLxiGZKlHvjElDgZpN9QvPXujxmjmiBRcnnLu0TtpPtjTt1gJ8-_et790z-dgnaD-Un43oQMHgK5cUJwC9fuJTjEjVaAYz0&usqp=CAc" }
])

const showAddModal = ref(false)
const editingProduct = ref(null)
const form = ref({
  name: '', price: 0, image: '', category: '', description: ''
})

const editProduct = (p) => {
  editingProduct.value = p
  form.value = { ...p }
  showAddModal.value = true
}

const saveProduct = () => {
  if (editingProduct.value) {
    // Sửa
    Object.assign(editingProduct.value, form.value)
  } else {
    // Thêm mới
    const newProduct = {
      id: Date.now(),
      ...form.value
    }
    products.value.push(newProduct)
  }
  closeModal()
}

const deleteProduct = (index) => {
  if (confirm('Xóa sản phẩm này thật nhé?')) {
    products.value.splice(index, 1)
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
  background: rgba(0,0,0,0.5);
}
.card {
  border-radius: 16px;
}
.btn:hover {
  transform: translateY(-2px);
}
</style>