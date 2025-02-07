// models/restaurant.js
const mongoose = require('mongoose');
const Counter = require('./counter'); // Asegúrate de importar el contador

// Definir el esquema para la colección 'restaurants'
const restaurantSchema = new mongoose.Schema({
  _id: { type: Number },  // Usamos un ID numérico
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware para generar el ID automáticamente
restaurantSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'restaurantId' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }  // Crea el contador si no existe
      );
      this._id = counter.sequence_value;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// **CORRECCIÓN:** Asegúrate de definir el modelo antes de exportarlo
const Restaurant = mongoose.model('Restaurant', restaurantSchema, 'restaurants');

// Exportar el modelo
module.exports = Restaurant;
