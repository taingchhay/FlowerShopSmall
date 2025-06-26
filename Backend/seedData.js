const mongoose = require('mongoose');
const Flower = require('./models/Flower');

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://sophaltangchhay:OJUKYCokpV48u5CX@cluster0.8zbt5kc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Sample flower data
const sampleFlowers = [
  {
    name: 'Red Rose',
    description: 'Beautiful red roses, perfect for expressing love and passion. Fresh and fragrant.',
    price: 5.99,
    imageUrl: 'https://cdn.florista.ph/uploads/product/floristaph/MAY2025/9091-1746444151832.webp',
    stock: 25
  },
  {
    name: 'White Lily',
    description: 'Elegant white lilies symbolizing purity and rebirth. Perfect for special occasions.',
    price: 7.50,
    imageUrl: 'https://flowerevershop.com/cdn/shop/files/IMG_4080.jpg?v=1717177685&width=3840',
    stock: 15
  },
  {
    name: 'Yellow Sunflower',
    description: 'Bright and cheerful sunflowers that bring joy and positivity to any space.',
    price: 4.25,
    imageUrl: 'https://hobbyfloristkl.com/wp-content/uploads/2021/08/Hazel-sunflowerbouquetkl-graduationbouquet-convocationbouquet-ceremonybouquet-hobbyfloristkl-delivery-klpj-selangor-2-01.png',
    stock: 30
  },
  {
    name: 'Pink Tulip',
    description: 'Delicate pink tulips representing affection and caring. Perfect for spring.',
    price: 3.75,
    imageUrl: 'https://hobbyfloristkl.com/wp-content/uploads/2021/01/Madeline-tulip-bouquet-mothers-day-flower-hobby-florist-delivery-to-kota-damansara.png',
    stock: 20
  },
  {
    name: 'Purple Orchid',
    description: 'Exotic purple orchids symbolizing luxury and strength. A sophisticated choice.',
    price: 12.99,
    imageUrl: 'https://cdn.bloomsflora.com/uploads/product/bloomsflora/1403_98_15655.webp',
    stock: 8
  },
  {
    name: 'White Daisy',
    description: 'Simple and pure white daisies representing innocence and new beginnings.',
    price: 2.99,
    imageUrl: 'https://static.wixstatic.com/media/99c2ac_b4a4f591036e4045a82e3e6cfcee141e~mv2.jpg/v1/fill/w_480,h_640,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/99c2ac_b4a4f591036e4045a82e3e6cfcee141e~mv2.jpg',
    stock: 40
  }
  
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing flowers
    await Flower.deleteMany({});
    console.log('Cleared existing flowers');

    // Insert sample flowers
    const insertedFlowers = await Flower.insertMany(sampleFlowers);
    console.log(`Inserted ${insertedFlowers.length} sample flowers`);

    // Display inserted flowers
    insertedFlowers.forEach(flower => {
      console.log(`- ${flower.name}: $${flower.price} (Stock: ${flower.stock})`);
    });

    console.log('\nSample data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
