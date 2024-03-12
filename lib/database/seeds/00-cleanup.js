exports.seed = async (knex) => {
  console.info('\n[INFO]: running cleanup seeder\n');

  const allTableNames = await knex('pg_tables').select('tablename').where('schemaname', 'public'); // NOTE: this is Postrgres-specific
  const tablesToDelete = allTableNames.map(({ tablename }) => tablename)
    .filter((tablename) => !tablename.startsWith('knex_')); // This is to avoid deleting knex internal tables

  console.log('[INFO]: the following tables will be deleted\n', tablesToDelete);

  if (allTableNames.length > 0) {
    await knex.raw(`TRUNCATE ${tablesToDelete.join(',')} CASCADE;`);
  }
};
