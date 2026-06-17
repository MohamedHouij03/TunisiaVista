const db = require('../config/db');
const User = db.users;
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    if (!firstName || !lastName || !email || !password) return res.status(400).json({ message: 'All fields required' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already in use' });
    const user = new User({ firstName, lastName, email, password, phone: phone || '' });
    await user.save();
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
    res.status(201).json({ message: 'Registration successful', token, user: user.toJSON() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
    if (!user.isActive) return res.status(403).json({ message: 'Account is deactivated' });
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
    res.json({ message: 'Login successful', token, user: user.toJSON() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('savedDestinations');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.toJSON());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, avatar } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { firstName, lastName, phone, avatar }, { new: true });
    res.json({ message: 'Profile updated', user: user.toJSON() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleSavedDestination = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const destId = req.params.destId;
    const idx = user.savedDestinations.indexOf(destId);
    if (idx === -1) user.savedDestinations.push(destId);
    else user.savedDestinations.splice(idx, 1);
    await user.save();
    res.json({ message: 'Updated', saved: user.savedDestinations });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
