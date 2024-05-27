const errorHandler = (error, req, res, next) => {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
  };
  
  module.exports = errorHandler;
  