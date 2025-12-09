<template>
  <div class="container py-5">
    <h1 class="text-center mb-5 text-primary fw-bold">TẤT CẢ SẢN PHẨM</h1>
    
    <div class="row">
      <div class="col-md-3 mb-4">
        <div class="list-group">
          <a href="#" class="list-group-item list-group-item-action active">Tất cả</a>
          <a href="#" class="list-group-item list-group-item-action">Áo thun</a>
          <a href="#" class="list-group-item list-group-item-action">Quần jeans</a>
          <a href="#" class="list-group-item list-group-item-action">Giày sneaker</a>
          <a href="#" class="list-group-item list-group-item-action">Phụ kiện</a>
        </div>
      </div>

      <div class="col-md-9">
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <ProductCard v-for="p in products" :key="p.id" :product="p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductCard from '../components/Product/ProductCard.vue'

const products = [
  { id: 1, name: "Áo Thun Nam Cao Cấp", price: 299000, description: "Chất cotton mềm mại, thoáng mát, form chuẩn", image: "data:image/jpeg;base64,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" },
  { id: 2, name: "Quần Jean Rách Nhẹ", price: 449000, description: "Phong cách trẻ trung, co giãn tốt", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRV1_VsX2Euj-3kK0v_SzWcn0fXjCp5IXns1rlE_Pk1IM4XRzufBJicY4pZbb3Wn2DqT3keO4wzrjiQ8O0bn3gKCeYTaMIx5DyntRuJdK633JnVW5J08j__X3fCjn1-MzVgccuPpzE9Dnlt&usqp=CAc" },
  { id: 3, name: "Giày Sneaker Trắng", price: 699000, description: "Đế cao su chống trơn, cực bền", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSjFFujUoGOeryTq-q6L0N4tnnqghEbAZZyfyrkXMLPeQVaaL_D-MqMnWl6jO4CmHneDGD8lptAC_EhXoN4Dz9eHSc4QAMl9zO_dCKP6BM&usqp=CAc" },
  { id: 4, name: "Túi Đeo Chéo Mini", price: 199000, description: "Nhỏ gọn, nhiều ngăn tiện lợi", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRa433yPACgUdysVuO8BXbAB0tHEvbZF83OckF0xJPDlpHoiqKCUux9_vuQQv8B90n1XvqDz36kgvy6JV8Iy2inXdzVtj6PxGaxzl0OK97w-Ot5CVicKjhXk0mGuX2KXI0wax-r88u5&usqp=CAc" },
  { id: 5, name: "Đồng Hồ Nam Chính Hãng", price: 1299000, description: "Máy Nhật, chống nước 50m", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS8eG6INg9fET4XHeOuOTjd8fdQg-BuQbOuXObxS8bUm6TVLoldTNzBuGEd46Y3-muIcNIYt65aU467DHXI6mmUssD2xdmzXMeS5Q9JpQzIhBYWkYtH1DqfNikDmkyNIeEtQwy8SedTlA&usqp=CAc" },
  { id: 6, name: "Áo Khoác Kaki Form Rộng", price: 529000, description: "Chống nắng, chống gió cực tốt", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT3p2lHo7IKEeWunu3zE0DAZzolLwiDf_wnWUL0NW-mEkt9UsU9nErKDJ5TLhHe2o-KAlBYPXOaZ1XtjOoczFXwQ_aE7XT111Q5Gp4tfIJ5DQbaGBA6qChgFg&usqp=CAc" },
]
</script>