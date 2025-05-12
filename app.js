require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

// Uso de helmet para agregar medidas de seguridad
app.use(helmet());

// Middleware para parsear JSON
app.use(express.json());

// Middleware de CORS
app.use(cors());

// Middleware de sesión (opcional si se usa JWT, pero agregado por si acaso)
app.use(session({
  secret: 'clave_secreta',
  resave: false,
  saveUninitialized: true
}));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(error => console.error('Error al conectar con MongoDB:', error));

// Rutas de la API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/estudiantes', require('./routes/estudiantesRoutes'));

// Middleware para manejar errores globalmente
const errorMiddleware = require('./middlewares/errorMiddleware');
app.use(errorMiddleware);

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

