/* eslint-disable import/no-extraneous-dependencies */
const tap = require('tap');
const knex = require('knex');
const Ajv = require('ajv');
const { serverTestWrapper } = require('../../../lib/helpers/tester');
const knexfile = require('../../../knexfile');

const ajv = new Ajv();

const knexInstance = knex(knexfile);

const resultSchema = {
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          price: { type: 'number' },
          photoPath: { type: 'string' },
          quantity: { type: 'number' },
          availability: { type: 'boolean' },
          category: { type: 'string' },
        },
      },
    },
    total: { type: 'number' },
  },
};

const validate = ajv.compile(resultSchema);

tap.test('ProductService - listAllProducts', async (t) => {
  const fastify = await serverTestWrapper();
  try {
    const { productService } = fastify;
    t.test('Test all list all products without filter', async (t0) => {
      const page = 0;
      const size = 5;

      const responseFromQuery = await knexInstance('products')
        .join('categories', 'products.category_id', '=', 'categories.id')
        .select(
          'products.name',
          'products.price',
          'products.photo_path as photoPath',
          'products.quantity',
          'products.availability',
          'categories.name as category',
        ).limit(size)
        .offset(page);

      const products = await productService.listAllProducts({ page, size });
      validate(products);

      const { results } = products;

      t0.equal(responseFromQuery.length, results.length, 'Response length matches size');

      // eslint-disable-next-line guard-for-in
      for (const item in results) {
        const {
          name, price, photoPath, quantity, availability, category,
        } = results[item];
        const {
          name: nameKnex, price: priceKnex, photoPath: photoPathKnex, quantity: quantityKnex, availability: avKnex, category: catKnex,
        } = responseFromQuery[item];
        t0.equal(name, nameKnex);
        t0.equal(price, priceKnex);
        t0.equal(photoPath, photoPathKnex);
        t0.equal(quantity, quantityKnex);
        t0.equal(availability, avKnex);
        t0.equal(category, catKnex);
      }

      t0.end();
    });

    t.test('ProductService - listAllProducts - filtered by category', async (t1) => {
      const { id, name: categoryName } = await knexInstance('categories').first();
      const products = await productService.listAllProducts({ categoryId: id });
      validate(products);
      const { results } = products;
      results.forEach(({ category }) => {
        t1.equal(category, categoryName);
      });
      t1.end();
    });

    t.test('ProductService - listAllProducts - filtered by availability', async (t2) => {
      const products = await productService.listAllProducts({ availability: false });
      validate(products);
      const { results } = products;
      results.forEach(({ availability }) => {
        t2.equal(availability, false);
      });
      t2.end();
    });

    t.test('ProductService - listAllProducts - filtered by search', async (t3) => {
      const letterSearch = 'a';
      const products = await productService.listAllProducts({ search: letterSearch });
      validate(products);
      const { results } = products;
      results.forEach(({ name }) => {
        t3.equal(name.startsWith(letterSearch), true);
      });
      t3.end();
    });
  } catch (error) {
    t.fail(`Test failed with error: ${error.message}`);
  } finally {
    t.teardown(() => {
      fastify.close();
      process.exit(0);
    });
  }
});
