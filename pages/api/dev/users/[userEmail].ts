import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "../../../../lib/prisma";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    handleGet(req, res);
  } else if (req.method === "POST") {
    handleDelete(req, res);
  } else {
    res.status(405).send({ message: "Method not allowed" });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const userEmail = req.query.userEmail?.toString();
  if (session) {
    await prisma.devemail
      .findUnique({
        where: { email: userEmail },
      })
      .then((email) => {
        res.json(email);
        console.log("User has been Found");
      })
      .catch((err) => console.log(err));
  } else {
    res.send("Unauthorized Access");
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const userEmail = req.query.userEmail?.toString();
  if (session) {
    await prisma.devemail
      .delete({
        where: { email: userEmail },
      })
      .then(() => {
        res.json("User has been Deleted");
        console.log("User has been Deleted");
      })
      .catch((err) => console.log(err));
  } else {
    res.send("Unauthorized Access");
  }
}
