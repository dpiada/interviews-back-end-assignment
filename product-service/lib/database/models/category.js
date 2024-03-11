'use strict'

const { Model } = require('objection')

class Category extends Model {
  static get tableName() {
    return 'categories'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 3 },
      }
    }
  }
}

module.exports = Category