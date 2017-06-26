'use strict';

module.exports = function(Category) {
  // Operation Hook
  Category.observe('before delete', (ctx) => (
    Category.app.models.Product
      .count({categoryId: ctx.where.id})
      .then(res => {
        if (res > 0) {
          return Promise.reject('Error deleting category with products');
        }
      })
  ));
};
