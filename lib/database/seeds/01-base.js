const { seedTable } = require('../../helpers/seedTable');

exports.seed = async (knex) => {
  const data = {};

  data.categories = [
    { id: 1, name: 'vegetables' },
    { id: 2, name: 'fruits' },
    { id: 3, name: 'canned foods' },
    { id: 4, name: 'meat' },
    { id: 5, name: 'seafood' },
    { id: 6, name: 'baked goods' }
  ]

  data.products = [
    { photo_path: '/images/photo.png', name: 'asparagus', price: 0.70, quantity: 0, availability: false, category_id: 1 },
    { photo_path: '/images/photo.png', name: 'beets', price: 0.20, quantity: 1, availability: true, category_id: 1 },
    { photo_path: '/images/photo.png', name: 'broccoli', price: 1.00, quantity: 3, availability: true, category_id: 1 },
    { photo_path: '/images/photo.png', name: 'cauliflower', price: 2.00, quantity: 5, availability: true, category_id: 1 },
    { photo_path: '/images/photo.png', name: 'carrots', price: 1.00, quantity: 200, availability: true, category_id: 1 },
    { photo_path: '/images/photo.png', name: 'corn', price: 1.00, quantity: 100, availability: true, category_id: 1 },
    { photo_path: '/images/photo.png', name: 'celery', price: 0.90, quantity: 400, availability: true, category_id: 1 },
    { photo_path: '/images/photo.png', name: 'avocado', price: 0.20, quantity: 1, availability: true, category_id: 2 },
    { photo_path: '/images/photo.png', name: 'bananas', price: 1.00, quantity: 3, availability: true, category_id: 2 },
    { photo_path: '/images/photo.png', name: 'cherries', price: 1.00, quantity: 200, availability: true, category_id: 2 },
    { photo_path: '/images/photo.png', name: 'grapes', price: 1.00, quantity: 100, availability: true, category_id: 2 },
    { photo_path: '/images/photo.png', name: 'kiwis', price: 0.90, quantity: 400, availability: true, category_id: 2 },
    { photo_path: '/images/photo.png', name: 'applesauce', price: 0.70, quantity: 0, availability: false, category_id: 3 },
    { photo_path: '/images/photo.png', name: 'baked beans', price: 0.20, quantity: 1, availability: true, category_id: 3 },
    { photo_path: '/images/photo.png', name: 'beans', price: 1.00, quantity: 3, availability: true, category_id: 3 },
    { photo_path: '/images/photo.png', name: 'carrots', price: 2.00, quantity: 5, availability: true, category_id: 3 },
    { photo_path: '/images/photo.png', name: 'corn', price: 1.00, quantity: 200, availability: true, category_id: 3 },
    { photo_path: '/images/photo.png', name: 'mixed fruit', price: 1.00, quantity: 100, availability: true, category_id: 3 },
    { photo_path: '/images/photo.png', name: 'tuna', price: 0.90, quantity: 400, availability: true, category_id: 3 },
    { photo_path: '/images/photo.png', name: 'bacon', price: 0.70, quantity: 0, availability: false, category_id: 4 },
    { photo_path: '/images/photo.png', name: 'chicken', price: 0.20, quantity: 1, availability: true, category_id: 4 },
    { photo_path: '/images/photo.png', name: 'beef', price: 1.00, quantity: 3, availability: true, category_id: 4 },
    { photo_path: '/images/photo.png', name: 'ground beef', price: 2.00, quantity: 5, availability: true, category_id: 4 },
    { photo_path: '/images/photo.png', name: 'ground turkey', price: 1.00, quantity: 200, availability: true, category_id: 4 },
    { photo_path: '/images/photo.png', name: 'ham', price: 1.00, quantity: 100, availability: true, category_id: 4 },
    { photo_path: '/images/photo.png', name: 'hot dogs', price: 0.90, quantity: 400, availability: true, category_id: 4 },
    { photo_path: '/images/photo.png', name: 'catfish', price: 0.70, quantity: 0, availability: false, category_id: 5 },
    { photo_path: '/images/photo.png', name: 'crab', price: 0.20, quantity: 1, availability: true, category_id: 5 },
    { photo_path: '/images/photo.png', name: 'halibut', price: 1.00, quantity: 3, availability: true, category_id: 5 },
    { photo_path: '/images/photo.png', name: 'salmon', price: 1.00, quantity: 200, availability: true, category_id: 5 },
    { photo_path: '/images/photo.png', name: 'tilapia', price: 1.00, quantity: 100, availability: true, category_id: 5 },
    { photo_path: '/images/photo.png', name: 'shrimp', price: 0.90, quantity: 400, availability: true, category_id: 5 },
    { photo_path: '/images/photo.png', name: 'bagels', price: 0.70, quantity: 0, availability: false, category_id: 6 },
    { photo_path: '/images/photo.png', name: 'buns', price: 0.20, quantity: 1, availability: true, category_id: 6 },
    { photo_path: '/images/photo.png', name: 'cake', price: 1.00, quantity: 3, availability: true, category_id: 6 },
    { photo_path: '/images/photo.png', name: 'cookies', price: 2.00, quantity: 5, availability: true, category_id: 6 },
    { photo_path: '/images/photo.png', name: 'carrots', price: 1.00, quantity: 200, availability: true, category_id: 6 },
    { photo_path: '/images/photo.png', name: 'crackers', price: 1.00, quantity: 100, availability: true, category_id: 6 },
    { photo_path: '/images/photo.png', name: 'croissants', price: 0.90, quantity: 400, availability: true, category_id: 6 }
  ]

  for (const entry of Object.entries(data)) {
    await seedTable(knex, entry[0], entry[1]);
  }
};
