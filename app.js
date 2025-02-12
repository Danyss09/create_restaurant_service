require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Restaurant = require('./models/restaurant');

// Inicializar la aplicación Express
const app = express();

// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.json());

// Conectar a MongoDB
console.log('🌍 MongoDB URI:', process.env.MONGODB_URI);  // ✅ Imprime la URL de conexión

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ Connected to MongoDB');
    console.log('📌 Conectado a la base de datos:', mongoose.connection.name);  // ✅ Imprime la base de datos usada
  })
  .catch(err => console.log('❌ Error connecting to MongoDB:', err));

// Escuchar eventos de error en la conexión
mongoose.connection.on('error', (err) => {
  console.error('🚨 Error en la conexión a MongoDB:', err);
});

// Rutas
const restaurantRoutes = require('./routes/restaurantRoutes');
app.use('/restaurants', restaurantRoutes);  // Para coincidir con /restaurants/create_restaurant

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
