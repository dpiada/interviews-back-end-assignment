// eslint-disable-next-line import/no-extraneous-dependencies
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

    t.equal(responseFromQuery.length, results.length, 'Response length matches size');

    for (const item in results) {
      const {
        name, price, photoPath, quantity, availability, category,
      } = results[item];
      const {
        name: nameKnex, price: priceKnex, photoPath: photoPathKnex, quantity: quantityKnex, availability: avKnex, category: catKnex,
      } = responseFromQuery[item];
      t.equal(name, nameKnex);
      t.equal(price, priceKnex);
      t.equal(photoPath, photoPathKnex);
      t.equal(quantity, quantityKnex);
      t.equal(availability, avKnex);
      t.equal(category, catKnex);
    }

    t.end();
  } catch (error) {
    t.fail(`Test failed with error: ${error.message}`);
  } finally {
    t.teardown(() => {
      fastify.close();
      process.exit(0);
    });
  }
});

tap.test('ProductService - listAllProducts - filtered by category', async (t) => {
  const fastify = await serverTestWrapper();
  try {
    const { productService } = fastify;

    const { id, name: categoryName } = await knexInstance('category').query().first();

    const products = await productService.listAllProducts({ category_id: id });
    console.log(products);
    validate(products);

    const { results } = products;

    results.map(({ category }) => {
      t.equal(category, categoryName);
    });
    t.end();
  } catch (error) {
    t.fail(`Test failed with error: ${error.message}`);
  } finally {
    t.teardown(() => {
      fastify.close();
      process.exit(0);
    });
  }
});

tap.test('ProductService - listAllProducts - filtered by availability', async (t) => {
  const fastify = await serverTestWrapper();
  try {
    const { productService } = fastify;

    const products = await productService.listAllProducts({ availability: false });
    validate(products);

    const { results } = products;

    results.map(({ availability }) => {
      t.equal(availability, false);
    });

    t.end();
  } catch (error) {
    t.fail(`Test failed with error: ${error.message}`);
  } finally {
    t.teardown(() => {
      fastify.close();
      process.exit(0);
    });
  }
});

tap.test('ProductService - listAllProducts - filtered by search', async (t) => {
  const fastify = await serverTestWrapper();
  try {
    const { productService } = fastify;

    const letterSearch = 'a';

    const products = await productService.listAllProducts({ search: letterSearch });
    validate(products);

    const { results } = products;

    results.map(({ name }) => {
      t.equal(name.startWith(letterSearch), true);
    });

    t.end();
  } catch (error) {
    t.fail(`Test failed with error: ${error.message}`);
  } finally {
    t.teardown(() => {
      fastify.close();
      process.exit(0);
    });
  }
});
