const CliProgress = require('cli-progress');
const Knexfile = require('../../knexfile');

module.exports.seedTable = async (knex, tableName, elements, customRow) => {
  const opt = {
    format: 'progress [{bar}] {percentage}% | {value}/{total}',
    eta: 'N/A',
  };

  const { verbose } = Knexfile.options;

  const loadingBar = verbose
    ? new CliProgress.SingleBar(opt, CliProgress.Presets.shades_classic)
    : {};

  const isSameElement = (dbObject, newObject) => Object.entries(newObject).every(([key, value]) => ((typeof value === 'object')
    ? isSameElement(dbObject[key], value) : dbObject[key] === value));

  const existingElements = await knex(tableName);
  const existingElementsIdSet = new Set(existingElements.map(({ id }) => id));

  let insertedCount = 0;
  let updatedCount = 0;

  const elementsToInsert = await elements;

  if (verbose) {
    console.info(`[START]: start inserting ${elementsToInsert.length} elements in table ${tableName}`);
    loadingBar.start(elementsToInsert.length, 0);
  }

  for (const newElement of elementsToInsert) {
    if (customRow) {
      Object.assign(newElement, customRow);
    }

    if (newElement.id && existingElementsIdSet.has(newElement.id)) {
      // If we are using IDs in the database table, then we can use them to check whether the element was already there,
      // and in case it's different from what we want update it (this way we can preserve foreign keys).
      await knex(tableName).where('id', newElement.id).update(newElement);
      if (verbose) {
        loadingBar.increment();
      }
      updatedCount += 1;
    } else if (existingElements.some((oldElement) => isSameElement(oldElement, newElement))) {
      // If we can find an already-identical element in the db (recursive value-based equality, only on the keys of the new element),
      // then we can simply ignore it since it already contains the data we want.
      if (verbose) {
        loadingBar.increment();
      }
    } else {
      // In all other cases, we need to insert a fresh element.
      await knex(tableName).insert(newElement);
      if (verbose) {
        loadingBar.increment();
      }
      insertedCount += 1;
    }
  }

  if (verbose) {
    loadingBar.stop();
    console.info(`[FINISH]: In table ${tableName} - ${insertedCount} inserted, ${updatedCount} updated`);
  }
};
