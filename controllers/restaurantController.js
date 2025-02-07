// controllers/restaurantController.js
const Restaurant = require('../models/restaurant');
const Counter = require('../models/counter');  // Importar el modelo del contador

exports.createRestaurant = async (req, res) => {
  try {
    const { name, address, phone } = req.body;

    // Obtener e incrementar el contador para restaurantes
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'restaurantId' },
      { $inc: { sequence_value: 1 } }, // Incrementar en 1
      { new: true, upsert: true }      // Crear si no existe
    );

    const newRestaurant = new Restaurant({
      _id: counter.sequence_value,    // Asignar el ID incrementado
      name,
      address,
      phone
    });

    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
