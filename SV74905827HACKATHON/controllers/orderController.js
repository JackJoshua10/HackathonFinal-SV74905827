const Order = require('../models/order');
const Cart = require('../models/Cart');

// Crear una nueva orden
exports.createOrder = async (req, res, next) => {
  const userId = req.userId;
  const { products, totalAmount } = req.body;
  try {
    const order = new Order({ userId, products, totalAmount });
    await order.save();
    // Limpiar el carrito del usuario
    await Cart.findOneAndUpdate({ userId }, { $set: { products: [] } });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// Obtener todas las órdenes de un usuario
exports.getUserOrders = async (req, res, next) => {
  const userId = req.userId;
  try {
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
