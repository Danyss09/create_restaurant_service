// models/counter.js
const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Ej: 'restaurantId'
  sequence_value: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema); // 👈 Asegúrate de que esté definido como modelo

module.exports = Counter;
