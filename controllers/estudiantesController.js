const { validationResult } = require('express-validator'); // Para manejar los errores de validación
const Estudiante = require('../models/Estudiante');

// Listar estudiantes
exports.listar = async (req, res) => {
  const lista = await Estudiante.find();
  res.json(lista);
};

// Crear estudiante
exports.crear = async (req, res) => {
  // Validación de errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const estudiante = new Estudiante(req.body);
  await estudiante.save();
  res.status(201).json(estudiante);
};

// Actualizar estudiante
exports.actualizar = async (req, res) => {
  // Validación de errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const { id } = req.params;
    const { nombre, carrera, edad } = req.body;

    const estudiante = await Estudiante.findByIdAndUpdate(
      id,
      { nombre, carrera, edad },
      { new: true }
    );

    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }

    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar estudiante' });
  }
};

// Eliminar estudiante
exports.eliminar = async (req, res) => {
  try {
    const { id } = req.params;

    const estudiante = await Estudiante.findByIdAndDelete(id);

    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }

    res.json({ mensaje: 'Estudiante eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar estudiante' });
  }
};
