import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function checkUsernameAndEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { emailAddress, userName } = req.body;
    const userWithEmail = await client.user.findUnique({
      where: { emailAddress },
    });
    if (userWithEmail) {
      res
        .status(400)
        .json({
          message:
            "The Email Address you provided is already associated with an account",
        });
      return;
    }
    const userWithUserName = await client.user.findUnique({
      where: { userName },
    });
    if (userWithUserName) {
      res
        .status(400)
        .json({
          message:
            "The User Name you provided is already associated with an account",
        });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
