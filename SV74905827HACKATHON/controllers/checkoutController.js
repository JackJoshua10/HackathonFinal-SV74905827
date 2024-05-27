const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/order');
const Cart = require('../models/Cart');

// Procesar pago utilizando Stripe
exports.processPayment = async (req, res, next) => {
  const { token, orderId, amount } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      customer: customer.id,
      description: `Payment for Order ${orderId}`,
      metadata: { integration_check: 'accept_a_payment' },
    });

    // Actualizar el estado de la orden a pagada
    await Order.findByIdAndUpdate(orderId, { $set: { status: 'Paid' } });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    next(error);
  }
};
