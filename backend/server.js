const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/cafeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const menuRoutes = require('./routes/menu');
app.use('/api/menu', menuRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});