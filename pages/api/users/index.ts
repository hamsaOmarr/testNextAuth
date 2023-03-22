import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    handleGet(req, res);
  } else if (req.method === "POST") {
    handlePost(req, res);
  } else if (req.method === "DELETE") {
    handleDelete(req, res);
  } else {
    res.status(405).send({ message: "Method not allowed" });
  }
}

function handleGet(req: NextApiRequest, res: NextApiResponse) {
  // Handle GET requests here
  res.json("This is a GET request");
}

function handlePost(req: NextApiRequest, res: NextApiResponse) {
  // Handle POST requests here
  res.json("This is a POST request");
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    await prisma.email
      .deleteMany()
      .then(() => {
        res.json("All Emails have been Deleted");
        console.log("All Emails have been Deleted");
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  } else {
    res.send("Unauthorized Access");
  }
}
