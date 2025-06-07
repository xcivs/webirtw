import http from './http'

// Получить детали одного товара
export function fetchProductDetails(productId) {
  return http.get(`/product/${productId}`)
}

// Получить похожие 
export function fetchRelatedProducts(productId) {
  return http.get(`/product/${productId}/related`)
}
