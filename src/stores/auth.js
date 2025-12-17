// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAdmin = ref(localStorage.getItem('isAdmin') === 'true')

  const login = () => {
    isAdmin.value = true
    localStorage.setItem('isAdmin', 'true')
  }

  const logout = () => {
    isAdmin.value = false
    localStorage.removeItem('isAdmin')
  }

  return { isAdmin, login, logout }
})