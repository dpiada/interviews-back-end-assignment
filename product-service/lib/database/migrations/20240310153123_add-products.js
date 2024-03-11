const tableName = 'products';

exports.up = async (knex) => {
  await knex.schema.dropTableIfExists(tableName).createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.decimal('price').unsigned().notNullable();
    table.string('photo_path');
    table.integer('quantity').unsigned().notNullable();
    table.boolean('availability').notNullable();
    table.integer('category_id')
      .references('categories.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable(tableName);
};
