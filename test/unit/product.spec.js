'use strict';

const {app, expect} = require('../common');

const Product = app.models.Product;

describe('It should resolve', () => {
  it('a Product.find', () => {
    return Product
      .find()
      .then(res => console.log(res));
  });
});

describe('Custom methods', () => {
  it('should allow buying a product', () => {
    const product = new Product({name: 'buy-product', price: 299});
    return product.buy(10, (err, res) => {
      expect(res.status).to.contain('You bought 10 product(s)');
    });
  });

  it('should not allow buying a negative product qunatity', () => {
    const product = new Product({name: 'buy-product', price: 299});
    return product.buy(-10, (err, res) => {
      expect(err).to.contain('Invalid quantity -10');
    });
  });
});

describe('Validation', () => {
  it('should reject a name < 3 chars', () => {
    return Product.create({name: 'a', price: 299})
      .then((res) => Promise.reject('Product should not be created'))
      .catch((err) => {
        expect(err.message).to.contain('Name should be at least 3 characters');
        expect(err.statusCode).to.be.equal(422);
      });
  });

  it('should reject a duplicate name', () => {
    return Promise.resolve()
      .then(() => Product.create({name: 'abc', price: 299}))
      .then(() => Product.create({name: 'abc', price: 299}))
      .then((res) => Promise.reject('Product should not be created'))
      .catch((err) => {
        expect(err.message).to.contain('Details: `name` is not unique');
        expect(err.statusCode).to.be.equal(422);
      });
  });

  it('should reject a price < 0', () => {
    return Product.create({name: 'lowPrice', price: -1})
      .then((res) => Promise.reject('Product should not be created'))
      .catch((err) => {
        expect(err.message).to.contain('Price should be a positive integer');
        expect(err.statusCode).to.be.equal(422);
      });
  });

  it('should reject a price below the minimum 99', () => {
    return Product.create({name: 'lowPrice', price: 98})
      .then((res) => Promise.reject('Product should not be created'))
      .catch((err) => {
        expect(err.message).to.contain('Price should be higher than the normal price in the db (value: 98)');
        expect(err.statusCode).to.be.equal(422);
      });
  });

  it('should store a correct product', () => {
    return Product.create({name: 'all good', price: 100})
      .then((res) => {
        expect(res.name).to.equal('all good');
        expect(res.price).to.be.equal(100);
      });
  });
});
