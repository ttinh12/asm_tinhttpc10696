// src/services/ProductService.js
import axios from "axios";
import { API_URL } from "@/environments/environment.js";
import { API_ENDPOINT } from "@/config/api-endpoint.config.js";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

class ProductService {
  list() {
    return api.get(API_ENDPOINT.products);  // Sửa: dùng api.get + endpoint đúng
  }

  getById(id) {
    return api.get(`${API_ENDPOINT.products}/${id}`);
  }

  create(data) {
    return api.post(API_ENDPOINT.products, data);
  }

  update(id, data) {
    return api.put(`${API_ENDPOINT.products}/${id}`, data);
  }

  delete(id) {
    return api.delete(`${API_ENDPOINT.products}/${id}`);
  }
}

export default new ProductService();