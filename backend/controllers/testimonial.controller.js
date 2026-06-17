const db = require('../config/db');
const Testimonial = db.testimonials;

exports.create = async (req, res) => {
  try {
    const t = new Testimonial(req.body);
    await t.save();
    res.status(201).json({ message: 'Testimonial submitted for review', data: t });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findAll = async (req, res) => {
  try {
    const { featured, approved } = req.query;
    const query = {};
    if (approved !== 'false') query.isApproved = true;
    if (featured === 'true') query.featured = true;
    const data = await Testimonial.find(query).populate('tour', 'name').sort({ createdAt: -1 });
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const data = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Updated', data });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.delete = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
