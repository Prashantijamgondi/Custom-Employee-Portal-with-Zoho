require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models');
const apiRoutes = require('./src/routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Database connection and server start
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    // Note: In production, do not use sync({ alter: true }). Use migrations instead.
    return sequelize.sync(); 
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
