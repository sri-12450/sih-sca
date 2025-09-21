// models/Farmer.js
const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  language: { type: String, default: 'en' },
  location: {
    district: String,
    state: String,
    lat: Number,
    lon: Number
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Farmer', FarmerSchema);
