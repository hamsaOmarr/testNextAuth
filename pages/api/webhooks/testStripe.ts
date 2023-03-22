import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";

const stripe = new Stripe(
  "sk_test_51MmeJMDC0U4oKiXepPezpAQ22DciZ0wpAT9Es5rk4HzICzxvYl9llS8zpBJPWLbzIvMNcSAKhJIwncBtcr977JdV00N8fEJLmD",
  {
    apiVersion: "2022-11-15",
  }
);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    handleGet(req, res);
  } else if (req.method === "POST") {
    handlePost(req, res);
  } else {
    res.status(405).send({ message: "Method not allowed" });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const sig = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      req.body,
      Buffer.from(sig as string, "utf-8"),
      "whsec_2929aef916994047925fca1245fc50f3ecfea25ca8b21572c7d2cd0a7200fbc8 "
    );

    if (event.type === "customer.created") {
      console.log("Worked");
      //   const customerId = event.data.object.id;
      //   const session = await getSession({ req });

      //   if (!session) {
      //     res.status(401).json({ message: "Unauthorized" });
      //     return;
      //   }

      //   try {
      //     const user = await prisma.user.update({
      //       where: { email: session.user.email },
      //       data: { customerId },
      //     });

      //     res.status(200).json({ message: "Customer ID updated successfully" });
      //   } catch (err) {
      //     res.status(500).json({ message: "Failed to update customer ID" });
      //   }
    }
    res.status(200).send({ message: "Worked" });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {}
