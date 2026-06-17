const db = require('../config/db');
const Tour = db.tours;

exports.create = async (req, res) => {
  try {
    const tour = new Tour(req.body);
    const data = await tour.save();
    res.status(201).json({ message: 'Tour created', data: await Tour.findById(data._id).populate('destination') });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findAll = async (req, res) => {
  try {
    const { category, featured, search, minPrice, maxPrice, duration } = req.query;
    const query = { isActive: true };
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    if (search) query.name = { $regex: search, $options: 'i' };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (duration) query.duration = { $lte: Number(duration) };
    const data = await Tour.find(query).populate('destination', 'name slug').sort({ featured: -1, rating: -1 });
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findOne = async (req, res) => {
  try {
    const data = await Tour.findOne({ $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { slug: req.params.id }] }).populate('destination destinations');
    if (!data) return res.status(404).json({ message: 'Tour not found' });
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const data = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('destination');
    if (!data) return res.status(404).json({ message: 'Tour not found' });
    res.json({ message: 'Updated', data });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.delete = async (req, res) => {
  try {
    const data = await Tour.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: 'Tour not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
