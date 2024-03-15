const schema = {
  type: 'object',
  properties: {
    PORT: {
      type: 'number',
      default: 3000,
    },
    HOST: {
      type: 'string',
      default: '0.0.0.0',
    },
    JWT_SECRET: {
      type: 'string',
      default: 'anyValue',
    },
    POSTGRES_USER: {
      type: 'string',
      default: 'anyValue',
    },
    POSTGRES_PASSWORD: {
      type: 'string',
      default: 'anyValue',
    },
    POSTGRES_DB: {
      type: 'string',
      default: 'anyValue',
    },
    DB_SERVICE: {
      type: 'string',
      default: 'anyValue',
    },
  },
};

module.exports = {
  schema,
};
