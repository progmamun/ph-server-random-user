'use strict';
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const usersRoutes = require('./routes/v1/userRoutes.js');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 5000;

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Mount routers
app.use('/api/v1/user', usersRoutes);

app.get('/', (req, res) => {
  // res.send('Hello World');
  res.sendFile(__dirname + '/public/index.html');
});

app.all('*', (req, res) => {
  res.send('NO route found.');
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running is ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on('unhandledRejection', (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
