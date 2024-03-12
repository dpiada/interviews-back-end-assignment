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
    { photo_path: '/images/photo.png', name: 'Asparagus', price: 0.70, quantity: 0, availability: false, category_id: 1 },
    { photo_path: '/images/photo.png', name: 'Beets', price: 0.20, quantity: 1, availability: true, category_id: 1 },
    { photo_path: '/images/photo.png', name: 'Broccoli', price: 1.00, quantity: 3, availability: true, category_id: 1 },
    { photo_path: '/images/photo.png', name: 'Cauliflower', price: 2.00, quantity: 5, availability: true, category_id: 1 },
    { photo_path: '/images/photo.png', name: 'Carrots', price: 1.00, quantity: 200, availability: true, category_id: 1 },
    { photo_path: '/images/photo.png', name: 'Corn', price: 1.00, quantity: 100, availability: true, category_id: 1 },
    { photo_path: '/images/photo.png', name: 'Celery', price: 0.90, quantity: 400, availability: true, category_id: 1 },
    { photo_path: '/images/photo.png', name: 'Apples', price: 0.70, quantity: 0, availability: false, category_id: 2 },
    { photo_path: '/images/photo.png', name: 'Avocado', price: 0.20, quantity: 1, availability: true, category_id: 2 },
    { photo_path: '/images/photo.png', name: 'Bananas', price: 1.00, quantity: 3, availability: true, category_id: 2 },
    { photo_path: '/images/photo.png', name: 'Berries', price: 2.00, quantity: 5, availability: true, category_id: 2 },
    { photo_path: '/images/photo.png', name: 'Cherries', price: 1.00, quantity: 200, availability: true, category_id: 2 },
    { photo_path: '/images/photo.png', name: 'Grapes', price: 1.00, quantity: 100, availability: true, category_id: 2 },
    { photo_path: '/images/photo.png', name: 'Kiwis', price: 0.90, quantity: 400, availability: true, category_id: 2 },
    { photo_path: '/images/photo.png', name: 'Applesauce', price: 0.70, quantity: 0, availability: false, category_id: 3 },
    { photo_path: '/images/photo.png', name: 'Baked beans', price: 0.20, quantity: 1, availability: true, category_id: 3 },
    { photo_path: '/images/photo.png', name: 'Beans', price: 1.00, quantity: 3, availability: true, category_id: 3 },
    { photo_path: '/images/photo.png', name: 'Carrots', price: 2.00, quantity: 5, availability: true, category_id: 3 },
    { photo_path: '/images/photo.png', name: 'Corn', price: 1.00, quantity: 200, availability: true, category_id: 3 },
    { photo_path: '/images/photo.png', name: 'Mixed fruit', price: 1.00, quantity: 100, availability: true, category_id: 3 },
    { photo_path: '/images/photo.png', name: 'Tuna', price: 0.90, quantity: 400, availability: true, category_id: 3 },
    { photo_path: '/images/photo.png', name: 'Bacon', price: 0.70, quantity: 0, availability: false, category_id: 4 },
    { photo_path: '/images/photo.png', name: 'Chicken', price: 0.20, quantity: 1, availability: true, category_id: 4 },
    { photo_path: '/images/photo.png', name: 'Beef', price: 1.00, quantity: 3, availability: true, category_id: 4 },
    { photo_path: '/images/photo.png', name: 'Ground beef', price: 2.00, quantity: 5, availability: true, category_id: 4 },
    { photo_path: '/images/photo.png', name: 'Ground turkey', price: 1.00, quantity: 200, availability: true, category_id: 4 },
    { photo_path: '/images/photo.png', name: 'Ham', price: 1.00, quantity: 100, availability: true, category_id: 4 },
    { photo_path: '/images/photo.png', name: 'Hot dogs', price: 0.90, quantity: 400, availability: true, category_id: 4 },
    { photo_path: '/images/photo.png', name: 'Catfish', price: 0.70, quantity: 0, availability: false, category_id: 5 },
    { photo_path: '/images/photo.png', name: 'Crab', price: 0.20, quantity: 1, availability: true, category_id: 5 },
    { photo_path: '/images/photo.png', name: 'Halibut', price: 1.00, quantity: 3, availability: true, category_id: 5 },
    { photo_path: '/images/photo.png', name: 'Oysters', price: 2.00, quantity: 5, availability: true, category_id: 5 },
    { photo_path: '/images/photo.png', name: 'Salmon', price: 1.00, quantity: 200, availability: true, category_id: 5 },
    { photo_path: '/images/photo.png', name: 'Tilapia', price: 1.00, quantity: 100, availability: true, category_id: 5 },
    { photo_path: '/images/photo.png', name: 'Shrimp', price: 0.90, quantity: 400, availability: true, category_id: 5 },
    { photo_path: '/images/photo.png', name: 'Bagels', price: 0.70, quantity: 0, availability: false, category_id: 6 },
    { photo_path: '/images/photo.png', name: 'Buns', price: 0.20, quantity: 1, availability: true, category_id: 6 },
    { photo_path: '/images/photo.png', name: 'Cake', price: 1.00, quantity: 3, availability: true, category_id: 6 },
    { photo_path: '/images/photo.png', name: 'Cookies', price: 2.00, quantity: 5, availability: true, category_id: 6 },
    { photo_path: '/images/photo.png', name: 'Carrots', price: 1.00, quantity: 200, availability: true, category_id: 6 },
    { photo_path: '/images/photo.png', name: 'Crackers', price: 1.00, quantity: 100, availability: true, category_id: 6 },
    { photo_path: '/images/photo.png', name: 'Croissants', price: 0.90, quantity: 400, availability: true, category_id: 6 }
  ]

  for (const entry of Object.entries(data)) {
    await seedTable(knex, entry[0], entry[1]);
  }
};
