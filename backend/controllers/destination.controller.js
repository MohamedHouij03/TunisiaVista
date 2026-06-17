const db = require('../config/db');
const Destination = db.destinations;

exports.create = async (req, res) => {
  try {
    const dest = new Destination(req.body);
    const data = await dest.save();
    res.status(201).json({ message: 'Destination created', data });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findAll = async (req, res) => {
  try {
    const { region, featured, search } = req.query;
    const query = { isActive: true };
    if (region) query.region = region;
    if (featured === 'true') query.featured = true;
    if (search) query.$or = [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
    const data = await Destination.find(query).sort({ rating: -1 });
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findOne = async (req, res) => {
  try {
    const data = await Destination.findOne({ $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { slug: req.params.id }] });
    if (!data) return res.status(404).json({ message: 'Destination not found' });
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const data = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ message: 'Destination not found' });
    res.json({ message: 'Updated', data });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.delete = async (req, res) => {
  try {
    const data = await Destination.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: 'Destination not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getFeatured = async (req, res) => {
  try {
    const data = await Destination.find({ featured: true, isActive: true }).limit(6);
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
