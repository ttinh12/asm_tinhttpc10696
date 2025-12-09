import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import AdminView from '../views/AdminView.vue'        // THÊM DÒNG NÀY

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/products', name: 'products', component: ProductsView },
  { path: '/product/:id', name: 'product-detail', component: ProductDetailView },
  { path: '/cart', name: 'cart', component: CartView },
  { path: '/checkout', name: 'checkout', component: CheckoutView },
  
  { path: '/admin', name: 'admin', component: AdminView },

  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router