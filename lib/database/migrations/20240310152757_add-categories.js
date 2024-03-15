const tableName = 'categories';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.dropTableIfExists(tableName).createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTable(tableName);
};
