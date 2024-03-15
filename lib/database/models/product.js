/* eslint-disable import/no-extraneous-dependencies */
const { Model } = require('objection');

class Product extends Model {
  static get tableName() {
    return 'products';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'name', 'price', 'quantity', 'availability', 'photo_path', 'category_id'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 3 },
        price: { type: 'float' },
        quantity: { type: 'integer' },
        availability: { type: 'boolean' },
        photo_path: { type: 'string' },
        category_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    // eslint-disable-next-line global-require
    const Category = require('./category');

    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: `${Product.tableName}.category_id`,
          to: `${Category.tableName}.id`,
        },
      },
    };
  }
}

module.exports = Product;
