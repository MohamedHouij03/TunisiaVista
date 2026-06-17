/**
 * Tunisia Travel Platform - Express.js Backend
 */
const express = require('express');
const cors    = require('cors');
const path    = require('path');
require('dotenv').config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:4200', credentials: true }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = require('./config/db');
db.mongoose.connect(db.url, {})
  .then(() => console.log('Connected to MongoDB:', db.url))
  .catch(err => console.error('MongoDB error:', err.message));

app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'Tunisia Travel API v2.0', timestamp: new Date().toISOString() }));

require('./routes/routes')(app);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Tunisia Travel API running on port ' + PORT));
