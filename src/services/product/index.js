import faker from 'faker';
import productsGenerate from './products-generate';

function getProductsFromStorage() {
  const localStorageProducts = localStorage.getItem('sc-products');
  if (localStorageProducts) {
    console.log(JSON.parse(localStorageProducts))
    return JSON.parse(localStorageProducts);
  }
  const startupProducts = productsGenerate();
  syncProductsToStorage(startupProducts);
  return startupProducts;
}

function syncProductsToStorage(products) {
  localStorage.setItem('sc-products', JSON.stringify(products));
}

export default {
  get(id) {
    return getProductsFromStorage().find(product => product.id === id);
  },

  list() {
    return getProductsFromStorage();
  },

  create(product) {
    const products = getProductsFromStorage();
    product.id = faker.random.uuid();
    product.date = Date.now();
    products.push(product);
    syncProductsToStorage(products);
    return product;
  },

  update(product) {
    const products = getProductsFromStorage();
    const productIndex = products.findIndex(p => p.id === product.id);
    if (productIndex >= 0) {
      product.date = Date.now();
      products[productIndex] = product;
    }
    syncProductsToStorage(products);
    return product;
  },

  remove(product) {
    const products = getProductsFromStorage();
    const productIndex = products.findIndex(p => p.id === product.id);
    if (productIndex >= 0) {
      products.splice(productIndex, 1);
    }
    syncProductsToStorage(products);
    return true;
  },
};
