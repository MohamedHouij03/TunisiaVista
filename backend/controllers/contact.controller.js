const db = require('../config/db');
const Contact = db.contacts;

exports.create = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) return res.status(400).json({ message: 'All fields required' });
    const msg = new Contact({ name, email, phone, subject, message });
    await msg.save();
    res.status(201).json({ message: 'Message sent successfully! We will respond within 24 hours.' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findAll = async (req, res) => {
  try {
    const { status } = req.query;
    const query = { isArchived: false };
    if (status) query.status = status;
    const data = await Contact.find(query).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateStatus = async (req, res) => {
  try {
    const data = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ message: 'Status updated', data });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.delete = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
