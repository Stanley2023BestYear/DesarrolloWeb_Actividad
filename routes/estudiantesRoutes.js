const express = require('express');
const { body } = require('express-validator'); // Para la validación de datos
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');
const auth = require('../middlewares/authMiddleware');

// Validaciones para crear/actualizar estudiante
const validarEstudiante = [
  body('nombre').not().isEmpty().withMessage('El nombre es obligatorio').trim().escape(),
  body('carrera').not().isEmpty().withMessage('La carrera es obligatoria').trim().escape(),
  body('edad').isInt({ min: 18, max: 100 }).withMessage('La edad debe ser un número entre 18 y 100').toInt(),
];

// Rutas
router.get('/', auth, estudiantesController.listar);
router.post('/', auth, validarEstudiante, estudiantesController.crear);
router.put('/:id', auth, validarEstudiante, estudiantesController.actualizar);
router.delete('/:id', auth, estudiantesController.eliminar);

module.exports = router;
