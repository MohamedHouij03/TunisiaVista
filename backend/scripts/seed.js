/**
 * TunisiaVista – MongoDB Seed Script
 * Run: node backend/scripts/seed.js
 * Seeds destinations, tours, blog posts, testimonials, and admin user
 */
require('dotenv').config();
const mongoose = require('mongoose');

const DB_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/tunisia_travel';

// ── Models ────────────────────────────────────────────────────
const userSchema = new mongoose.Schema({ firstName: String, lastName: String, email: String, password: String, role: { type: String, default: 'user' } }, { timestamps: true });
const destSchema = new mongoose.Schema({ name: String, slug: String, region: String, shortDesc: String, description: String, highlights: [String], activities: [String], bestSeason: String, coverImage: String, featured: Boolean, rating: Number, tags: [String], isActive: { type: Boolean, default: true } });
const tourSchema = new mongoose.Schema({ name: String, slug: String, shortDesc: String, description: String, price: Number, duration: Number, category: String, difficulty: String, coverImage: String, includes: [String], excludes: [String], rating: Number, reviewsCount: Number, featured: Boolean, maxGroupSize: { type: Number, default: 12 }, isActive: { type: Boolean, default: true }, itinerary: [{ day: Number, title: String, description: String }] });
const blogSchema = new mongoose.Schema({ title: String, slug: String, category: String, excerpt: String, content: String, coverImage: String, authorName: String, readTime: Number, views: { type: Number, default: 0 }, isPublished: { type: Boolean, default: true }, featured: Boolean }, { timestamps: true });
const testimonialSchema = new mongoose.Schema({ name: String, country: String, rating: Number, comment: String, tourName: String, isApproved: { type: Boolean, default: true }, featured: Boolean }, { timestamps: true });
const newsletterSchema = new mongoose.Schema({ email: { type: String, unique: true }, isActive: { type: Boolean, default: true } }, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Destination = mongoose.model('Destination', destSchema);
const Tour = mongoose.model('Tour', tourSchema);
const BlogPost = mongoose.model('BlogPost', blogSchema);
const Testimonial = mongoose.model('Testimonial', testimonialSchema);
const Newsletter = mongoose.model('Newsletter', newsletterSchema);

// ── Data ──────────────────────────────────────────────────────
const bcrypt = require('bcryptjs');

const destinations = [
  { name: 'Tunis', slug: 'tunis', region: 'North', shortDesc: 'A vibrant capital blending ancient medina with modern boulevards.', description: 'Tunisia\'s cosmopolitan capital where centuries of history converge with contemporary culture.', highlights: ['Medina (UNESCO)', 'Bardo National Museum', 'Avenue Habib Bourguiba', 'Zitouna Mosque'], activities: ['City Tours', 'Museum Visits', 'Culinary Tours'], bestSeason: 'March–May, Sep–Nov', coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', featured: true, rating: 4.7, tags: ['city', 'culture', 'history'] },
  { name: 'Sidi Bou Said', slug: 'sidi-bou-said', region: 'North', shortDesc: 'The iconic blue-and-white village perched above the Mediterranean.', description: 'A dreamlike village of whitewashed walls and vivid cobalt-blue doors cascading down a cliff.', highlights: ['Blue & White Architecture', 'Café des Nattes', 'Sea Panoramas'], activities: ['Photography', 'Café Hopping', 'Coastal Walks'], bestSeason: 'Year-round', coverImage: 'https://images.unsplash.com/photo-1599484894574-81e1ec5e46ab?w=800', featured: true, rating: 4.9, tags: ['iconic', 'photography', 'coastal'] },
  { name: 'Hammamet', slug: 'hammamet', region: 'Cap Bon', shortDesc: 'Tunisia\'s most beloved resort town with jasmine-scented gardens.', description: 'Sweeping white-sand beaches, a preserved medina, and lush gardens with citrus and jasmine.', highlights: ['Old Medina', 'Beaches', 'Yasmine Marina', 'Hammamet Festival'], activities: ['Beach Holidays', 'Water Parks', 'Golf'], bestSeason: 'May–Sep', coverImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', featured: true, rating: 4.7, tags: ['resort', 'beach', 'family'] },
  { name: 'Tozeur', slug: 'tozeur', region: 'South', shortDesc: 'The gateway to the Sahara, city of palm groves and Star Wars sets.', description: 'An oasis city of extraordinary beauty where 200,000 palm trees create a haven at the edge of the Sahara.', highlights: ['Palm Oasis', 'Chott El Jerid', 'Star Wars Locations'], activities: ['Sahara Excursions', 'Camel Trekking', 'Star Wars Tours'], bestSeason: 'Oct–Apr', coverImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800', featured: true, rating: 4.8, tags: ['sahara', 'oasis', 'desert'] },
  { name: 'Djerba', slug: 'djerba', region: 'Island', shortDesc: 'The Island of Dreams — ancient culture, beaches, and tranquility.', description: 'Tunisia\'s most beloved island with a unique blend of Arab, Berber, Jewish, and Mediterranean cultures.', highlights: ['Houmt Souk', 'El Ghriba Synagogue', 'Guellala Pottery', 'Beaches'], activities: ['Beach Holidays', 'Cultural Tours', 'Water Sports'], bestSeason: 'Apr–Oct', coverImage: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?w=800', featured: true, rating: 4.8, tags: ['island', 'beach', 'culture'] },
  { name: 'Sousse', slug: 'sousse', region: 'Sahel', shortDesc: 'The Pearl of the Sahel — a UNESCO medina meets beautiful beaches.', description: 'One of Tunisia\'s most beloved coastal cities balancing a UNESCO medina with long sandy beaches.', highlights: ['Medina (UNESCO)', 'Ribat Fortress', 'Boujaffar Beach'], activities: ['Beach Holidays', 'Historical Tours', 'Water Sports'], bestSeason: 'Apr–Oct', coverImage: 'https://images.unsplash.com/photo-1568736772245-e71c17b8af23?w=800', featured: false, rating: 4.6, tags: ['beach', 'medina', 'UNESCO'] },
  { name: 'Carthage', slug: 'carthage', region: 'North', shortDesc: 'Walk through the ruins of one of the ancient world\'s greatest empires.', description: 'Once the center of a Mediterranean empire that rivalled Rome. Now a UNESCO World Heritage Site.', highlights: ['Antonine Baths', 'Punic Ports', 'Byrsa Hill', 'Carthage Museum'], activities: ['Archaeological Tours', 'History Walks'], bestSeason: 'Sep–May', coverImage: 'https://images.unsplash.com/photo-1545074309-23cf843f4fba?w=800', featured: false, rating: 4.6, tags: ['ruins', 'history', 'UNESCO'] },
  { name: 'Douz', slug: 'douz', region: 'South', shortDesc: 'The Gateway to the Sahara — where the great desert begins.', description: 'The main departure point for camel treks and 4x4 expeditions into the Saharan wilderness.', highlights: ['Grand Erg Dunes', 'Camel Trek Departures', 'Festival of the Sahara'], activities: ['Camel Trekking', 'Quad Adventures', 'Star Gazing'], bestSeason: 'Oct–Mar', coverImage: 'https://images.unsplash.com/photo-1482192505345-5852b6b56d5f?w=800', featured: false, rating: 4.7, tags: ['sahara', 'dunes', 'camel'] },
];

const tours = [
  { name: '3 Days in Tunis', slug: '3-days-tunis', shortDesc: 'Immerse yourself in the ancient medina and modern boulevards of the capital.', price: 450, duration: 3, category: 'City', difficulty: 'Easy', coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', includes: ['2 Nights Hotel', 'Breakfast', 'Expert Guide', 'Airport Transfers', 'Entry Fees'], excludes: ['Flights', 'Lunch & Dinner'], rating: 4.8, reviewsCount: 124, featured: true, maxGroupSize: 12, itinerary: [{ day: 1, title: 'Arrival & Medina', description: 'Arrive in Tunis, explore the UNESCO medina.' }, { day: 2, title: 'Carthage & Sidi Bou Said', description: 'Tour the ruins of Carthage then the blue village.' }, { day: 3, title: 'Bardo & Departure', description: 'Visit the famous Bardo Museum then airport transfer.' }] },
  { name: 'Sahara Adventure', slug: 'sahara-adventure', shortDesc: 'Dunes, camels, and a billion stars — the Sahara as it should be.', price: 890, duration: 5, category: 'Adventure', difficulty: 'Moderate', coverImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800', includes: ['4 Nights Accommodation', 'Breakfast & Dinner', 'Expert Guide', 'Camel Trek', 'Desert Camp', '4x4 Transport'], excludes: ['Flights', 'Travel Insurance'], rating: 4.9, reviewsCount: 89, featured: true, maxGroupSize: 8, itinerary: [{ day: 1, title: 'Arrive Tozeur', description: 'Explore the palm oasis of Tozeur.' }, { day: 2, title: 'Chott El Jerid & Douz', description: 'Cross the salt lake, first dunes at sunset.' }, { day: 3, title: 'Deep Desert Safari', description: 'Full-day 4x4 expedition, night in Bedouin camp.' }, { day: 4, title: 'Berber Villages', description: 'Ksar Ghilane and Matmata troglodytes.' }, { day: 5, title: 'Departure', description: 'Morning in Tozeur souk, airport transfer.' }] },
  { name: 'Coastal Discovery', slug: 'coastal-discovery', shortDesc: 'Mediterranean gold — from Hammamet to Djerba along the coast.', price: 1290, duration: 7, category: 'Beach', difficulty: 'Easy', coverImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', includes: ['6 Nights Hotels', 'Breakfast', 'Transport', 'Guide'], excludes: ['Flights', 'Lunch & Dinner'], rating: 4.7, reviewsCount: 67, featured: true, maxGroupSize: 14, itinerary: [{ day: 1, title: 'Hammamet Arrival', description: 'Beachfront hotel, medina walk.' }, { day: 2, title: 'Cap Bon', description: 'Nabeul, Kelibia fortress, vineyards.' }, { day: 3, title: 'Sousse & Monastir', description: 'UNESCO medinas and ribat fortresses.' }, { day: 4, title: 'Mahdia', description: 'Hidden gem of the Sahel coast.' }, { day: 5, title: 'Journey South', description: 'Sfax medina, drive south.' }, { day: 6, title: 'Djerba', description: 'El Ghriba Synagogue, beaches.' }, { day: 7, title: 'Departure', description: 'Final beach morning, airport.' }] },
  { name: 'Tunisia Grand Tour', slug: 'tunisia-grand-tour', shortDesc: 'The definitive Tunisia experience — from north to south in 10 days.', price: 2200, duration: 10, category: 'Cultural', difficulty: 'Moderate', coverImage: 'https://images.unsplash.com/photo-1545074309-23cf843f4fba?w=800', includes: ['9 Nights Hotels', 'All Meals', 'Private Guide', 'All Transfers', 'Entry Fees', 'Desert Camp'], excludes: ['International Flights', 'Travel Insurance'], rating: 4.9, reviewsCount: 45, featured: true, maxGroupSize: 10, itinerary: [{ day: 1, title: 'Arrival Tunis' }, { day: 2, title: 'Tunis & Carthage' }, { day: 3, title: 'Cap Bon' }, { day: 4, title: 'Sahel Coast' }, { day: 5, title: 'Kairouan' }, { day: 6, title: 'El Djem' }, { day: 7, title: 'Tozeur' }, { day: 8, title: 'Desert Safari' }, { day: 9, title: 'Berber Villages & Djerba' }, { day: 10, title: 'Departure' }].map(d => ({ ...d, description: '' })) },
  { name: 'Luxury Tunisia Escape', slug: 'luxury-escape', shortDesc: 'Five-star comforts, private guides, and exclusive experiences.', price: 4500, duration: 8, category: 'Luxury', difficulty: 'Easy', coverImage: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800', includes: ['7 Nights 5-Star Hotels', 'All Meals', 'Private Guide', 'Private Transport', 'Helicopter Tour', 'Yacht Half-Day'], excludes: ['International Flights', 'Travel Insurance'], rating: 5.0, reviewsCount: 18, featured: true, maxGroupSize: 6, itinerary: [] },
];

const blogPosts = [
  { title: 'Best Beaches in Tunisia: A Complete Guide', slug: 'best-beaches-tunisia', category: 'Beaches', excerpt: 'From the crystal waters of Kelibia to the golden sands of Djerba, Tunisia\'s most spectacular beaches.', content: 'Full article content here...', coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', authorName: 'Sarah Mahmoud', readTime: 8, isPublished: true, featured: true },
  { title: 'The Ultimate Sahara Desert Guide', slug: 'ultimate-sahara-guide', category: 'Desert', excerpt: 'Everything you need to know for your first Saharan adventure — from choosing the right tour to packing.', content: 'Full article content here...', coverImage: 'https://images.unsplash.com/photo-1482192505345-5852b6b56d5f?w=800', authorName: 'Ahmed Ben Salem', readTime: 12, isPublished: true, featured: true },
  { title: 'Sidi Bou Said: A Day in the Blue Village', slug: 'visiting-sidi-bou-said', category: 'Culture', excerpt: 'A photographer\'s guide to the most beautiful morning walk in Tunisia.', content: 'Full article content here...', coverImage: 'https://images.unsplash.com/photo-1599484894574-81e1ec5e46ab?w=800', authorName: 'Leila Dridi', readTime: 6, isPublished: true, featured: false },
  { title: 'Traditional Tunisian Cuisine You Must Try', slug: 'traditional-tunisian-cuisine', category: 'Food', excerpt: 'Couscous, brik, harissa, tajine, and makroudh — a guide to dishes that define Tunisian culinary identity.', content: 'Full article content here...', coverImage: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800', authorName: 'Fatima Chakroun', readTime: 9, isPublished: true, featured: false },
  { title: 'Hidden Gems of Tunisia: Beyond the Tourist Trail', slug: 'hidden-gems-tunisia', category: 'Tips', excerpt: 'Skip the crowds and discover the Tunisia most visitors never see.', content: 'Full article content here...', coverImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800', authorName: 'Omar Trabelsi', readTime: 11, isPublished: true, featured: false },
  { title: 'UNESCO Sites of Tunisia: A Heritage Journey', slug: 'unesco-sites-tunisia', category: 'History', excerpt: 'Tunisia\'s eight UNESCO World Heritage Sites — from Carthage to Kairouan.', content: 'Full article content here...', coverImage: 'https://images.unsplash.com/photo-1545074309-23cf843f4fba?w=800', authorName: 'Nadia Hamdi', readTime: 14, isPublished: true, featured: false },
];

const testimonials = [
  { name: 'Sophie Laurent', country: 'France', rating: 5, comment: 'The Sahara Adventure was the most extraordinary experience of my life. Our guide Karim made every moment magical. Tunisia exceeded every expectation.', tourName: 'Sahara Adventure', isApproved: true, featured: true },
  { name: 'James & Rachel Chen', country: 'United Kingdom', rating: 5, comment: 'TunisiaVista organized our honeymoon and we couldn\'t have asked for more. The Luxury Escape was flawlessly executed. Pure perfection.', tourName: 'Luxury Tunisia Escape', isApproved: true, featured: true },
  { name: 'Marco Rossi', country: 'Italy', rating: 5, comment: 'As a history enthusiast, the Grand Tour was everything I dreamed of. The guides\' knowledge of Carthage and Kairouan was encyclopedic.', tourName: 'Tunisia Grand Tour', isApproved: true, featured: true },
  { name: 'Astrid Lindqvist', country: 'Sweden', rating: 5, comment: 'Completely fell in love with Tunisia through the Coastal Discovery tour. The beaches are stunning, the food incredible, and the people so warm.', tourName: 'Coastal Discovery', isApproved: true, featured: false },
];

async function seed() {
  try {
    await mongoose.connect(DB_URL);
    console.log('✅ Connected to MongoDB');

    // Clear existing
    await Promise.all([User.deleteMany({}), Destination.deleteMany({}), Tour.deleteMany({}), BlogPost.deleteMany({}), Testimonial.deleteMany({}), Newsletter.deleteMany({})]);
    console.log('🗑️  Cleared existing data');

    // Admin user
    const hashedPw = await bcrypt.hash('admin123', 10);
    await User.create({ firstName: 'Admin', lastName: 'TunisiaVista', email: 'admin@tunisiavista.com', password: hashedPw, role: 'admin' });
    console.log('👤 Admin user: admin@tunisiavista.com / admin123');

    // Seed data
    await Destination.insertMany(destinations);
    console.log(`🗺️  Seeded ${destinations.length} destinations`);

    await Tour.insertMany(tours);
    console.log(`✈️  Seeded ${tours.length} tours`);

    await BlogPost.insertMany(blogPosts);
    console.log(`📝 Seeded ${blogPosts.length} blog posts`);

    await Testimonial.insertMany(testimonials);
    console.log(`⭐ Seeded ${testimonials.length} testimonials`);

    await Newsletter.create({ email: 'demo@tunisiavista.com' });
    console.log('📧 Seeded sample newsletter subscriber');

    console.log('\n🎉 Seed complete! Start backend: cd backend && npm start');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
