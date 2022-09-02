const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Router file

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// middleware
const app = express();
app.use(cors());

// Mount routers

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running is ${process.env.NODE_ENV} mode on port ${PORT}`);
});
