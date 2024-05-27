const Product = require('../models/Product');

// Obtener todos los productos
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res, next) => {
  const { name, description, price, category, imageUrl, stock } = req.body;
  try {
    const product = new Product({ name, description, price, category, imageUrl, stock });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
