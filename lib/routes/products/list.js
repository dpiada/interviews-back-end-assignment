const { authHandlerSchema } = require('../../auth/authHandlerSchema');

module.exports = {
  method: 'GET',
  url: '/v1/products/list',
  schema: {
    description: 'Get list of products',
    tags: ['products'],
    querystring: {
      page: { type: 'number', minimum: 0 },
      size: { type: 'number', minimum: 1 },
      category: { type: 'number' },
      search: { type: 'string' },
      availability: { type: 'boolean' },
    },
    response: {
      200: {
        description: 'Returns list with info about products',
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
      },
    },
  },
  preHandler: authHandlerSchema.none,
  handler: async (request, reply) => {
    const { productService } = request.fastify;

    const {
      page, size, category_id: categoryId, search, availability,
    } = request.query;

    const products = await productService.listAllProducts({
      page, size, categoryId, search, availability,
    });

    return reply.code(200).send(products);
  },
};
