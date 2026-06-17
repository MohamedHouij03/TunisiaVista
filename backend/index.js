const express = require('express');
const database = require('./src/database/db.config');
require('dotenv').config();
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

database.mongoose.connect(database.url, {}).then(() => {
  console.log('connected to database');
}).catch(err => {
  console.log(err);
});

app.get('/', (req, res) => {
  res.send({ message: 'Agence Voyage API is running' });
});

require('./src/api/routes/routes')(app);

app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT);
});
