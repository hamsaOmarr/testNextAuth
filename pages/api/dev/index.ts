import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    handleGet(req, res);
  } else if (req.method === "POST") {
    handlePost(req, res);
  } else {
    res.status(405).send({ message: "Method not allowed" });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    await prisma.devemail
      .findMany()
      .then((emails) => {
        res.json(emails);
        console.log(emails.length + " Emails sent from DB");
      })
      .catch((err) => console.log(err));
  } else {
    res.send("Unauthorized Access");
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const sgMsg = {
      to: req.body.Email, // Change to your recipient
      from: {
        email: "hamsa@modeltune.co",
        name: "Hamsa (Modeltune)",
      },
      subject: "You've joined our Waitlist!",
      text: `Hi there,

We are so excited to see you on this list! We're working hard to get Modeltune into your hands as soon as possible. Send us a reply if you have any ideas or suggestions, we'd appreciate it.

Thank you again for your interest in Modeltune and we look forward to hearing from you soon!

We read an reply to all user emails. 

--
Hamsa Omar
Founder at Modeltune`,
    };

    await prisma.devemail
      .create({ data: { email: req.body.Email } })
      .then(async () => {
        console.log("User email saved to DB");

        await sgMail
          .send(sgMsg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((err: any) => {
            console.log(err);
          });
        res.json("Thank you! Your submittion has been received!");
      })
      .catch((err) => {
        if (err.code === "P2002") {
          console.log("Already in Waitlist");
          res.json("You are already in our Waitlist");
        } else {
          console.log(err);
          res.json(err);
        }
      });
  } else {
    res.send("Unauthorized Access");
  }
}
