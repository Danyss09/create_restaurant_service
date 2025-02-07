// controllers/restaurantController.js
const Restaurant = require('../models/restaurant');

exports.createRestaurant = async (req, res) => {
  try {
    const { name, address, phone } = req.body;

    const newRestaurant = new Restaurant({ name, address, phone });
    await newRestaurant.save();

    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
