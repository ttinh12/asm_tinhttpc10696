import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'   // ← dòng này bắt buộc phải có

// ← ĐÂY LÀ CÁI QUAN TRỌNG NHẤT
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')   // ← dòng này làm cho @ = src
    }
  }
})