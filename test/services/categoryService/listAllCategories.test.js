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
          productCount: { type: 'number' },
        },
      },
    },
    total: { type: 'number' },
  },
};

const validate = ajv.compile(resultSchema);

tap.test('categoryService - listAllCategories', async (t) => {
  const fastify = await serverTestWrapper();
  try {
    const { categoryService } = fastify;
    const page = 0;
    const size = 5;

    const responseFromQuery = await knexInstance('categories')
      .join('products', 'products.category_id', '=', 'categories.id')
      .groupBy('categories.id')
      .select('categories.*')
      .count('products.id as productCount')
      .limit(size)
      .offset(page);

    const categories = await categoryService.listAllCategories({ page, size });
    validate(categories);

    const { results } = categories;

    t.equal(responseFromQuery.length, results.length, 'Response length matches size');

    // eslint-disable-next-line guard-for-in
    for (const item in results) {
      const {
        name, id, productCount,
      } = results[item];
      const {
        name: nameKnex, id: idKnex, productCount: productCountKnex,
      } = responseFromQuery[item];
      t.equal(name, nameKnex);
      t.equal(id, idKnex);
      t.equal(productCount, productCountKnex);
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
