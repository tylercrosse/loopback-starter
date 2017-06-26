'use strict';

const {app, expect, request} = require('../common');

describe('ACL', () => {
  describe('Category', () => {
    it('should return 200 when listing Categories', () => (
      request
        .get('/api/Categories')
        .expect(200)
    ));

    it('should return 401 when creating Categories', () => (
      request
        .post('/api/Categories')
        .send({name: 'My category'})
        .expect(401)
    ));

    it('should return 401 when updating Categories', () => (
      request
        .patch('/api/Categories/1')
        .send({name: 'My category'})
        .expect(401)
    ));

    it('should return 401 when deleting Categories', () => (
      request
        .delete('/api/Categories/1')
        .expect(401)
    ));
  });

  describe('Product', () => {
    it('should return 200 when listing Products', () => (
      request
        .get('/api/Products')
        .expect(200)
    ));

    it('should return 401 when creating Products', () => (
      request
        .post('/api/Products')
        .send({name: 'My product', price: 199})
        .expect(401)
    ));

    it('should return 401 when updating Products', () => (
      request
        .patch('/api/Products/1')
        .send({name: 'My product', price: 199})
        .expect(401)
    ));

    it('should return 401 when deleting Products', () => (
      request
        .delete('/api/Products/1')
        .expect(401)
    ));

    it('should return 200 when buying a Product', () => (
      app.models.Product.create({name: 'test', price: 100})
        .then(res => request
          .post(`/api/Products/${res.id}/buy`)
          .send({quantity: 100})
          .expect(200))
    ));
  });
});
