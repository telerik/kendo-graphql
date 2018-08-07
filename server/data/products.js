import faker from 'faker';

let id = 1;
let products = [];
for(let i = 0; i < 500; i++) {
    let product = {
        ProductID: id++,
        ProductName: faker.commerce.productName,
        UnitsInStock: faker.random.number,
        UnitPrice: faker.random.number
    };

    products.push(product);
}

export default products;