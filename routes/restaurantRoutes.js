const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');  // ⬅ Agregado aquí
const restaurantController = require('../controllers/restaurantController');

// Crear un nuevo restaurante (Create)
router.post('/create_restaurant', restaurantController.createRestaurant);

// Obtener todos los restaurantes (Read)
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    console.log('Restaurantes encontrados:', restaurants);  // 👀 Debugging
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error obteniendo restaurantes:', error);
    res.status(400).json({ error: error.message });
  }
});

// Obtener un restaurante por ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
