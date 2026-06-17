const db = require('../config/db');
const Newsletter = db.newsletters;

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (existing.isActive) return res.status(409).json({ message: 'Already subscribed' });
      existing.isActive = true;
      await existing.save();
      return res.json({ message: 'Resubscribed successfully!' });
    }
    await new Newsletter({ email }).save();
    res.status(201).json({ message: 'Subscribed successfully! Welcome to our community.' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.unsubscribe = async (req, res) => {
  try {
    await Newsletter.findOneAndUpdate({ email: req.body.email }, { isActive: false });
    res.json({ message: 'Unsubscribed successfully' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Newsletter.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
