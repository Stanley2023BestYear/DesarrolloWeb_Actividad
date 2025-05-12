function errorMiddleware(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ mensaje: 'Algo salió mal, por favor intente más tarde' });
}

module.exports = errorMiddleware;
