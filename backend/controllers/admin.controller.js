const db = require('../config/db');

exports.getStats = async (req, res) => {
  try {
    const [destinations, tours, users, bookings, contacts, testimonials, newsletters, blogPosts] = await Promise.all([
      db.destinations.countDocuments({ isActive: true }),
      db.tours.countDocuments({ isActive: true }),
      db.users.countDocuments({ role: 'user' }),
      db.bookings.countDocuments(),
      db.contacts.countDocuments({ status: 'new' }),
      db.testimonials.countDocuments({ isApproved: false }),
      db.newsletters.countDocuments({ isActive: true }),
      db.blogPosts.countDocuments({ isPublished: true })
    ]);
    const recentBookings = await db.bookings.find().populate('user', 'firstName lastName').populate('tour', 'name price').sort({ createdAt: -1 }).limit(5);
    const revenue = await db.bookings.aggregate([{ $match: { status: 'confirmed' } }, { $group: { _id: null, total: { $sum: '$totalPrice' } } }]);
    res.json({ destinations, tours, users, bookings, newContacts: contacts, pendingTestimonials: testimonials, newsletters, blogPosts, recentBookings, totalRevenue: revenue[0]?.total || 0 });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getUsers = async (req, res) => {
  try {
    const data = await db.users.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
