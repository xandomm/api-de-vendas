import Stripe from 'stripe';
import { Router } from 'express';
console.log(process.env.STRIPE_SECRET_KEY);
//@ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});
const stripeRouter = Router();
console.log(process.env.STRIPE_SECRET_KEY);
stripeRouter.post('/create-payment-intent', async (req, res) => {
  const customer = await stripe.customers.create();
  console.log(customer);
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2022-11-15' },
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'eur',
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      'pk_test_51N8222FAuubPJ0lAaZx3vx0B5Sa7dVWZrSzBAyA28u08J58vA8f72JrdXOmayz2YWP3lfi8DcE4cctJHcc2afzdC005eCbgh3i',
  });
});

export default stripeRouter;
