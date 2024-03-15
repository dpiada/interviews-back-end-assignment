const { authHandlerSchema } = require('../../auth/authHandlerSchema');

module.exports = {
  method: 'GET',
  url: '/v1/categories/list',
  schema: {
    description: 'Get list of all categories available and the number of available product',
    tags: ['categories'],
    querystring: {
      page: { type: 'number', minimum: 0 },
      size: { type: 'number', minimum: 1 },
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
                productCount: { type: 'number' },
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
    const { categoryService } = request.fastify;

    const { page, size } = request.query;

    const categories = await categoryService.listAllCategories({ page, size });

    return reply.code(200).send(categories);
  },
};
