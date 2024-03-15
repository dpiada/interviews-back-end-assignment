const fp = require('fastify-plugin');

class CategoryService {
  constructor(fastify) {
    this.fastify = fastify;
  }

  /**
           * Lists all categories stored in the database with pagination support.
           * Each category includes its name, ID, and the count of products associated with it.
           *
           * @param {number} [options.page=0] - The page number for pagination. Defaults to 0.
           * @param {number} [options.size=10] - The number of items per page. Defaults to 10.
           * @returns {Promise<Object>} A promise that resolves to an object containing the following properties:
           * - results: An array of category objects, each with an id, name, and productCount.
           * - total: The total number of categories available.
           */
  async listAllCategories({ page = 0, size = 10 }) {
    const { category } = this.fastify.objection.models;

    const categories = await category.query()
      .select(
        'categories.name',
        'categories.id',
        category.relatedQuery('product')
          .count()
          .as('productCount'),
      )
      .groupBy('categories.id')
      .page(page, size);

    return categories;
  }
}

function categoryService(fastify, opts, next) {
  fastify.decorate('categoryService', new CategoryService(fastify));
  next();
}

module.exports = fp(categoryService, { name: 'categoryService' });
