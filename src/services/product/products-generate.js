import faker from 'faker';

export default function productsGenerate() {
  const products = [];
  const status = ['PROD_ACTIVE', 'PROD_ACTIVE', 'PROD_ACTIVE', 'PROD_INACTIVE'];
  for (let index = 0; index < 50; index++) {
    products.push({
      id: faker.random.uuid(),
      name: faker.commerce.product(),
      department: faker.commerce.department(),
      price: faker.commerce.price(),
      date: faker.date.past().getTime(),
      status: status[Math.floor(Math.random() * 4)],
    });
  }
  return products;
}
