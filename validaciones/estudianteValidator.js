const { body } = require('express-validator');

exports.validarEstudiante = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

  body('carrera')
    .trim()
    .notEmpty().withMessage('La carrera es obligatoria'),

  body('edad')
    .notEmpty().withMessage('La edad es obligatoria')
    .isInt({ min: 1 }).withMessage('La edad debe ser un número entero positivo')
];
