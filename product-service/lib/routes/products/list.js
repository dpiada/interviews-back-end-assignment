'use strict';

const { authHandlerSchema } = require('../../auth/authHandlerSchema');

module.exports = {
    method: 'GET',
    url: '/v1/products/list',
    schema: {
        description: 'Get list of products',
        tags: ['products'],    
    },    
    preHandler: authHandlerSchema.none,
    handler: async (request, reply) => {

        return reply.code(200).send({ status: 'OK' });
    }
}