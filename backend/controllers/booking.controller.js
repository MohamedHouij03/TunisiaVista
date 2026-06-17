const db = require('../config/db');
const Booking = db.bookings;
const Tour = db.tours;

exports.create = async (req, res) => {
  try {
    const tourRef = req.body.tour;
    const tour = await Tour.findOne({ $or: [{ _id: /^[0-9a-fA-F]{24}$/.test(tourRef) ? tourRef : null }, { slug: tourRef }] });
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    const totalPrice = tour.price * req.body.travelers;
    const booking = new Booking({ ...req.body, tour: tour._id, user: req.user.id, totalPrice });
    await booking.save();
    res.status(201).json({ message: 'Booking request submitted!', data: await Booking.findById(booking._id).populate('tour', 'name price') });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findUserBookings = async (req, res) => {
  try {
    const data = await Booking.find({ user: req.user.id }).populate('tour', 'name coverImage price duration').sort({ createdAt: -1 });
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Booking.find().populate('user', 'firstName lastName email').populate('tour', 'name price').sort({ createdAt: -1 });
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateStatus = async (req, res) => {
  try {
    const data = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ message: 'Status updated', data });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
