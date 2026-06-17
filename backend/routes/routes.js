const auth    = require('../middleware/auth.middleware');
const authCtrl   = require('../controllers/auth.controller');
const destCtrl   = require('../controllers/destination.controller');
const tourCtrl   = require('../controllers/tour.controller');
const blogCtrl   = require('../controllers/blog.controller');
const testCtrl   = require('../controllers/testimonial.controller');
const contactCtrl = require('../controllers/contact.controller');
const bookCtrl   = require('../controllers/booking.controller');
const newsCtrl   = require('../controllers/newsletter.controller');
const adminCtrl  = require('../controllers/admin.controller');

module.exports = (app) => {
  const r = require('express').Router();

  // Auth
  r.post('/auth/register', authCtrl.register);
  r.post('/auth/login',    authCtrl.login);
  r.get ('/auth/profile',  auth.verifyToken, authCtrl.getProfile);
  r.put ('/auth/profile',  auth.verifyToken, authCtrl.updateProfile);
  r.post('/auth/saved/:destId', auth.verifyToken, authCtrl.toggleSavedDestination);

  // Destinations
  r.get ('/destinations',          destCtrl.findAll);
  r.get ('/destinations/featured', destCtrl.getFeatured);
  r.get ('/destinations/:id',      destCtrl.findOne);
  r.post('/destinations',          auth.verifyToken, auth.isAdmin, destCtrl.create);
  r.put ('/destinations/:id',      auth.verifyToken, auth.isAdmin, destCtrl.update);
  r.delete('/destinations/:id',    auth.verifyToken, auth.isAdmin, destCtrl.delete);

  // Tours
  r.get ('/tours',       tourCtrl.findAll);
  r.get ('/tours/:id',   tourCtrl.findOne);
  r.post('/tours',       auth.verifyToken, auth.isAdmin, tourCtrl.create);
  r.put ('/tours/:id',   auth.verifyToken, auth.isAdmin, tourCtrl.update);
  r.delete('/tours/:id', auth.verifyToken, auth.isAdmin, tourCtrl.delete);

  // Blog
  r.get ('/blog',       blogCtrl.findAll);
  r.get ('/blog/:id',   blogCtrl.findOne);
  r.post('/blog',       auth.verifyToken, auth.isAdmin, blogCtrl.create);
  r.put ('/blog/:id',   auth.verifyToken, auth.isAdmin, blogCtrl.update);
  r.delete('/blog/:id', auth.verifyToken, auth.isAdmin, blogCtrl.delete);

  // Testimonials
  r.get ('/testimonials',       testCtrl.findAll);
  r.post('/testimonials',       testCtrl.create);
  r.put ('/testimonials/:id',   auth.verifyToken, auth.isAdmin, testCtrl.update);
  r.delete('/testimonials/:id', auth.verifyToken, auth.isAdmin, testCtrl.delete);

  // Contact
  r.post('/contact',         contactCtrl.create);
  r.get ('/contact',         auth.verifyToken, auth.isAdmin, contactCtrl.findAll);
  r.put ('/contact/:id',     auth.verifyToken, auth.isAdmin, contactCtrl.updateStatus);
  r.delete('/contact/:id',   auth.verifyToken, auth.isAdmin, contactCtrl.delete);

  // Bookings
  r.post('/bookings',          auth.verifyToken, bookCtrl.create);
  r.get ('/bookings/my',       auth.verifyToken, bookCtrl.findUserBookings);
  r.get ('/bookings',          auth.verifyToken, auth.isAdmin, bookCtrl.findAll);
  r.put ('/bookings/:id',      auth.verifyToken, auth.isAdmin, bookCtrl.updateStatus);

  // Newsletter
  r.post('/newsletter/subscribe',   newsCtrl.subscribe);
  r.post('/newsletter/unsubscribe', newsCtrl.unsubscribe);
  r.get ('/newsletter',             auth.verifyToken, auth.isAdmin, newsCtrl.findAll);

  // Admin
  r.get('/admin/stats', auth.verifyToken, auth.isAdmin, adminCtrl.getStats);
  r.get('/admin/users', auth.verifyToken, auth.isAdmin, adminCtrl.getUsers);

  app.use('/api', r);
};
