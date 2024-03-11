const { seedTable } = require('../../helpers/seedTable');

exports.seed = async (knex) => {
  const data = {};

  data.categories = [
    { id: 1, name: 'Vegetables' },
    { id: 2, name: 'Fruits' },
    { id: 3, name: 'Canned foods' },
    { id: 4, name: 'Meat' },
    { id: 5, name: 'Seafood' },
    { id: 6, name: 'Baked goods' }
  ]

  data.products = [
    { name: 'Asparagus', price: 0.70, quantity: 0, availability: false, category_id: 1 },
    { name: 'Beets', price: 0.20, quantity: 1, availability: true, category_id: 1 },
    { name: 'Broccoli', price: 1.00, quantity: 3, availability: true, category_id: 1 },
    { name: 'Cauliflower', price: 2.00, quantity: 5, availability: true, category_id: 1 },
    { name: 'Carrots', price: 1.00, quantity: 200, availability: true, category_id: 1 },
    { name: 'Corn', price: 1.00, quantity: 100, availability: true, category_id: 1 },
    { name: 'Celery', price: 0.90, quantity: 400, availability: true, category_id: 1 },
    { name: 'Apples', price: 0.70, quantity: 0, availability: false, category_id: 2 },
    { name: 'Avocado', price: 0.20, quantity: 1, availability: true, category_id: 2 },
    { name: 'Bananas', price: 1.00, quantity: 3, availability: true, category_id: 2 },
    { name: 'Berries', price: 2.00, quantity: 5, availability: true, category_id: 2 },
    { name: 'Cherries', price: 1.00, quantity: 200, availability: true, category_id: 2 },
    { name: 'Grapes', price: 1.00, quantity: 100, availability: true, category_id: 2 },
    { name: 'Kiwis', price: 0.90, quantity: 400, availability: true, category_id: 2 },
    { name: 'Applesauce', price: 0.70, quantity: 0, availability: false, category_id: 3 },
    { name: 'Baked beans', price: 0.20, quantity: 1, availability: true, category_id: 3 },
    { name: 'Beans', price: 1.00, quantity: 3, availability: true, category_id: 3 },
    { name: 'Carrots', price: 2.00, quantity: 5, availability: true, category_id: 3 },
    { name: 'Corn', price: 1.00, quantity: 200, availability: true, category_id: 3 },
    { name: 'Mixed fruit', price: 1.00, quantity: 100, availability: true, category_id: 3 },
    { name: 'Tuna', price: 0.90, quantity: 400, availability: true, category_id: 3 },
    { name: 'Bacon', price: 0.70, quantity: 0, availability: false, category_id: 4 },
    { name: 'Chicken', price: 0.20, quantity: 1, availability: true, category_id: 4 },
    { name: 'Beef', price: 1.00, quantity: 3, availability: true, category_id: 4 },
    { name: 'Ground beef', price: 2.00, quantity: 5, availability: true, category_id: 4 },
    { name: 'Ground turkey', price: 1.00, quantity: 200, availability: true, category_id: 4 },
    { name: 'Ham', price: 1.00, quantity: 100, availability: true, category_id: 4 },
    { name: 'Hot dogs', price: 0.90, quantity: 400, availability: true, category_id: 4 },
    { name: 'Catfish', price: 0.70, quantity: 0, availability: false, category_id: 5 },
    { name: 'Crab', price: 0.20, quantity: 1, availability: true, category_id: 5 },
    { name: 'Halibut', price: 1.00, quantity: 3, availability: true, category_id: 5 },
    { name: 'Oysters', price: 2.00, quantity: 5, availability: true, category_id: 5 },
    { name: 'Salmon', price: 1.00, quantity: 200, availability: true, category_id: 5 },
    { name: 'Tilapia', price: 1.00, quantity: 100, availability: true, category_id: 5 },
    { name: 'Shrimp', price: 0.90, quantity: 400, availability: true, category_id: 5 },
    { name: 'Bagels', price: 0.70, quantity: 0, availability: false, category_id: 6 },
    { name: 'Buns', price: 0.20, quantity: 1, availability: true, category_id: 6 },
    { name: 'Cake', price: 1.00, quantity: 3, availability: true, category_id: 6 },
    { name: 'Cookies', price: 2.00, quantity: 5, availability: true, category_id: 6 },
    { name: 'Carrots', price: 1.00, quantity: 200, availability: true, category_id: 6 },
    { name: 'Crackers', price: 1.00, quantity: 100, availability: true, category_id: 6 },
    { name: 'Croissants', price: 0.90, quantity: 400, availability: true, category_id: 6 }
  ]

  for (const entry of Object.entries(data)) {
    await seedTable(knex, entry[0], entry[1]);
  }
};
