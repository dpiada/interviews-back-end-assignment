'use strict'

const { Model } = require('objection')

class Category extends Model {
  static get tableName() {
    return 'categories'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 3 },
      }
    }
  }

  static get relationMappings() {

    const Product = require('./product');

    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: `${Category.tableName}.id`,
          to: `${Product.tableName}.category_id`
        }
      }
    }
  }
}

module.exports = Category