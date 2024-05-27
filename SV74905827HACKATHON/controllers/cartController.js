const Cart = require('../models/Cart');

// Obtener el carrito de un usuario
exports.getCart = async (req, res, next) => {
  const userId = req.userId;
  try {
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// Agregar un producto al carrito
exports.addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }
    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (productIndex >= 0) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};
