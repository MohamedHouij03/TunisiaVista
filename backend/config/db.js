const config   = require('./config');
const mongoose = require('mongoose');

const db = {};
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

db.mongoose = mongoose;
db.url      = config.DB_URL;

// Models
db.users         = require('../models/user.model')(mongoose);
db.destinations  = require('../models/destination.model')(mongoose);
db.tours         = require('../models/tour.model')(mongoose);
db.bookings      = require('../models/booking.model')(mongoose);
db.testimonials  = require('../models/testimonial.model')(mongoose);
db.blogPosts     = require('../models/blog.model')(mongoose);
db.contacts      = require('../models/contact.model')(mongoose);
db.newsletters   = require('../models/newsletter.model')(mongoose);

module.exports = db;
