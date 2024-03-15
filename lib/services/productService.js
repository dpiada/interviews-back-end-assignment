const fp = require('fastify-plugin');

class ProductService {
  constructor(fastify) {
    this.fastify = fastify;
  }

  /**
   * Lists all products stored in the database with optional filtering by category, search term, and availability.
   * This method supports pagination to limit the number of results returned per page.
   *search
    * @param {number} [page=0] - Optional - The page number for pagination. Defaults to 0.
    * @param {number} [size=10] - Optional - The number of items per page. Defaults to 10.
    * @param {number} [categoryId] - Optional - The ID of the category to filter products by.
    * @param {string} [search] - Optional - A search term to filter products by name.
    * @param {boolean} [availability] - Optional -The availability status to filter products by.
    * @returns {Promise<Array>} A promise that resolves to an array of products.
    * Each product object includes the name, price, photo path, quantity, availability, and category name.
  */
  async listAllProducts({
    page = 0, size = 10, categoryId, search, availability,
  }) {
    const { product } = this.fastify.objection.models;

    let productsQuery = product.query()
      .joinRelated('category')
      .select(
        'products.name',
        'products.price',
        'products.photo_path',
        'products.quantity',
        'products.availability',
        'category.name as category',
      );

    if (categoryId) {
      productsQuery = productsQuery.where({ category_id: categoryId });
    }

    if (search) {
      productsQuery = productsQuery.where('products.name', 'like', `${search}%`);
    }

    if (availability !== null && availability !== undefined) {
      productsQuery = productsQuery.where({ availability });
    }

    const products = await productsQuery.page(page, size);

    return products;
  }
}

function productService(fastify, opts, next) {
  fastify.decorate('productService', new ProductService(fastify));
  next();
}

module.exports = fp(productService, { name: 'productService' });
