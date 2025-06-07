import http from './http'

// Получить список «featured items» для главной
export function fetchFeaturedItems() {
  return http.get('/home/featured')
}


export function fetchHomePromo() {
  return http.get('/home/promo')
}
