

const { DB_SERVICE, POSTGRES_USER: user, POSTGRES_PASSWORD: password, POSTGRES_DB: database } = process.env;

if (!DB_SERVICE) {
  throw new Error('Database not defined');
}

const [host, port] = DB_SERVICE.split(':');

module.exports = {
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
    directory: 'lib/database/migrations',
  },
  seeds: {
    directory: 'lib/database/seeds',
  },
  options: {
    verbose: true,
  },
};
