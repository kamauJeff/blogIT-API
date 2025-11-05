import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const register = async function (req: Request, res: Response) {
  try {
    const { firstName, lastName, emailAddress, userName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 11);
    await client.user.create({
      data: {
        firstName,
        lastName,
        emailAddress,
        userName,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async function (req: Request, res: Response) {
  try {
    //get identifier and pswd
    const { identifier, password } = req.body;
    //get user whose email or username match identifier
    const user = await client.user.findFirst({
      where: {
        OR: [{ emailAddress: identifier }, { userName: identifier }],
      },
    });
    //if user not found, wrong login credentials (checking falsy)
    if (!user) {
      res.status(400).json({ message: "Wrong login credentials" });
      return;
    }
    //if user found, compare pswd with given pswd
    const passwordMatch = await bcrypt.compare(password, user.password);

    // if pswd don't match, wrong login credentials
    if (!passwordMatch) {
      res.status(400).json({ message: "Wrong login credentials" });
      return;
    }
    // if pswd match, login success
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      userName: user.userName,
    };

    //generate cookie and send it as a token to the client

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
      expiresIn: `10d`,
    });
    res.status(200).cookie("authToken", token).json(payload);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = function (req: Request, res: Response) {
  try {
    res
      .status(200)
      .clearCookie("authToken")
      .json({ message: "Successfully Logged out" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// changing the password
export const changePassword = async (req: Request, res: Response) => {
  try {
    // get previous and new password
    const { previousPassword, password } = req.body;
    const userId = req.user.id;
    const user = await client.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }
    // compare stored password with previous password
    const passwordsMatch = await bcrypt.compare(
      previousPassword,
      user.password,
    );
    // if they don't match - error
    if (!passwordsMatch) {
      res.status(400).json({ message: "Previous Password is wrong" });
      return;
    }
    // if they match, hash new password and hash the new password
    const newPassword = await bcrypt.hash(password, 11);
    await client.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
      },
    });
    res.status(200).json({ message: "Password updated Successfully" });
  } catch (error) {
    console.error("Password change error:", error);

    res.status(500).json({ message: "Something went wrong" });
  }
};
