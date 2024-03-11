'use strict';

const fp = require('fastify-plugin');

class ProductService {

    constructor(fastify) {
        this.fastify = fastify
    }

    /**
     * list all products stored into the database
     * 
     * @param {Integer} page field page to paginate the result
     * @param {Integer} size fiels size of the page
     * @returns 
     */
    async listAllProduct({ page = 0, size = 10 }) {

        const { product } = this.fastify.objection.models;

        const list = await product.query()
            .joinRelated('category')
            .select(
                'products.name',
                'products.price',
                'products.photo_path',
                'products.quantity',
                'products.availability',
                'category.name as category',
            ).page(page, size);


        return list
    }
}

function productService(fastify, opts, next) {

    fastify.decorate('productService', new ProductService(fastify));
    next();
}

module.exports = fp(productService, { name: 'productService' })