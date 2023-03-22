import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51MmeJMDC0U4oKiXepPezpAQ22DciZ0wpAT9Es5rk4HzICzxvYl9llS8zpBJPWLbzIvMNcSAKhJIwncBtcr977JdV00N8fEJLmD",
  {
    apiVersion: "2022-11-15",
  }
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const event = req.body;
  if (event.type === "customer.created") {
    console.log("Worked");
  }
  res.status(200).send("OK");
}
