import Stripe from "stripe";
import { PaymentRequest } from "../interfaces/paymentRequest";
import { Response } from "express";
const stripe = new Stripe(
  "sk_test_51KBJB8DoDutteg47esuO8G8bd5ZixaD0CdKifBP9Y9Q7xP0h4CFoQ5LvrdWoPpjhAnXayOFZxjEhQiOHjLzd039o00KsWKuLw9",
  {
    apiVersion: "2020-08-27",
  }
);

const payment = async (req: PaymentRequest, res: Response) => {
  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/cancel",
    payment_method_types: ["card"],
    line_items: req.services.map((service) => {
      return {
        name: service.name,
        description: service.description,
        amount: service.price * 100,
        currency: "usd",
        quantity: 1,
      };
    }),
    //mode: "payment",
  });
  /*
    Frontend rendering  
  */
  //   return res.render("/payment", {
  //       sessionId: session.id,
  //       ...
  //   });
};

export { payment };
