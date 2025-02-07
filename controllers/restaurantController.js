const Restaurant = require('../models/restaurant');
const { validatePhoneNumber, validateName, validateAddress } = require('../utils/validation');

// Función para crear un restaurante
const createRestaurant = async (req, res) => {
  const { name, address, phone } = req.body;

  // Validar los datos
  if (!validateName(name)) {
    return res.status(400).json({ error: 'El nombre solo puede contener letras y espacios.' });
  }

  if (!validateAddress(address)) {
    return res.status(400).json({ error: 'La dirección solo puede contener letras, números y comas.' });
  }

  if (!validatePhoneNumber(phone)) {
    return res.status(400).json({ error: 'El teléfono debe tener 10 números.' });
  }

  // Si todo es válido, crear el restaurante
  try {
    const newRestaurant = new Restaurant({
      name,
      address,
      phone,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createRestaurant
};
