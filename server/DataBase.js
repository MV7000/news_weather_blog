require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGODB_CONNECT_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
