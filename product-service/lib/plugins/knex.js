/*this is a sample of plugin, like knex*/
'use strict';

const fp = require('fastify-plugin');

const { DB_SERVICE, POSTGRES_USER: user, POSTGRES_PASSWORD: password, POSTGRES_DB: database } = process.env;

if (!DB_SERVICE) {
    throw new Error('Database not defined');
}

const [host, port] = DB_SERVICE.split(':');
const knex = require('knex')({
    client: 'postgres',
    useNullAsDefault: true,
    connection: {
      host,
      port,
      user,
      password,
      database,
    },
    migrations: {
        directory: '/migrations'
    },
    options: {
      verbose: true,
    },
 });

function Knex (fastify, opts, next) {

    fastify.decorate('knex', knex);
    next();
}

module.exports = fp(Knex)