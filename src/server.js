const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);

//establishing connection with the mongodb server.
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/assignment-portal';
const PORT = process.env.PORT || 5000;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });
