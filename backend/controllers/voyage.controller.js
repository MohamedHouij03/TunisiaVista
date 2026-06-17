const db = require('../config/db');
const Voyage = db.voyages;

exports.create = (req, res) => {
  const { name, description, price, duration, date, destination, image } = req.body;

  if (!name || !description || !price || !duration || !date || !destination) {
    return res.status(400).send({ message: 'name, description, price, duration, date and destination are required' });
  }

  const newVoyage = new Voyage({ name, description, price, duration, date, destination, image });

  newVoyage.save().then(data => {
    return Voyage.findById(data._id).populate('destination');
  }).then(populated => {
    res.status(201).send({ message: 'Voyage created successfully', data: populated });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.findAll = (req, res) => {
  const { search, destination, date, sortBy } = req.query;

  const query = {};
  if (search)      query.name        = { $regex: search, $options: 'i' };
  if (destination) query.destination = destination;
  if (date)        query.date        = { $gte: new Date(date) };

  let sortOptions = {};
  if (sortBy === 'price')    sortOptions = { price: 1 };
  if (sortBy === 'duration') sortOptions = { duration: 1 };

  Voyage.find(query)
    .populate('destination')
    .sort(sortOptions)
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Voyage.findById(id).populate('destination').then(data => {
    if (!data) return res.status(404).send({ message: `Voyage with id=${id} not found` });
    res.send(data);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { name, description, price, duration, date, destination, image } = req.body;

  if (!name || !description || !price || !duration || !date || !destination) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  Voyage.findByIdAndUpdate(id, { name, description, price, duration, date, destination, image }, { new: true })
    .populate('destination')
    .then(data => {
      if (!data) return res.status(404).send({ message: `Voyage with id=${id} not found` });
      res.send({ message: 'Voyage updated successfully', data });
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Voyage.findByIdAndDelete(id).then(data => {
    if (!data) return res.status(404).send({ message: `Voyage with id=${id} not found` });
    res.send({ message: 'Voyage deleted successfully' });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};
