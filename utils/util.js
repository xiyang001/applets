// Dev
let baseUrl = 'https://djs.juheyinhang.com'

const api = {
  fetchIndex: baseUrl + '/mini/index',
  fetchCategory: baseUrl + '/mini/product/index',
  fetchProductProperty: baseUrl + '/mini/product/category/{id}/properties',
  fetchProductDetail: baseUrl + '/mini/product/{id}',
  createdOrder: baseUrl + '/mini/order/place-order',
  addCard: baseUrl + '/mini/order/add-cart',
  checkoutCard: baseUrl + '/mini/order/cart',
  updateCard: baseUrl + '/mini/order/cart/{id}',
  getToken: baseUrl + '/mini/validate-access-token',
  getProperties: baseUrl + '/mini/product/category/{id}/properties'
}
export default api;
