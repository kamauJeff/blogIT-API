import { type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

//get user profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const profile = await client.user.findUnique({
      where: {
        id: userId,
        isDeleted: false,
      },
      select: {
        firstName: true,
        lastName: true,
        emailAddress: true,
        userName: true,
        dateJoined: true,
      },
    });
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
// updating a user profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, emailAddress, userName } = req.body;
    const userId = req.user.id;
    await client.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName,
        lastName,
        emailAddress,
        userName,
      },
    });
    res.status(200).json({ message: "Profile updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
// deleting a user profile
export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    await client.user.update({
      where: {
        id: userId,
      },
      data: {
        isDeleted: true,
      },
    });
    res.status(200).json({ message: "Account deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
