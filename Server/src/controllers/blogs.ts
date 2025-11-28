import { type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { blogTittle, synopsis, content, featuredImageUrl } = req.body;
    await client.blog.create({
      data: {
        blogTittle,
        synopsis,
        content,
        featuredImageUrl,
        userId: req.user.id,
      },
    });
    res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const blogs = await client.blog.findMany({
      where: {
        AND: [{ userId: userId }, { isDeleted: false }],
      },
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const blog = await client.blog.findFirst({
      where: {
        AND: [{ id: String(id) }, { userId }, { isDeleted: false }],
      },
    });
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const completeBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    await client.blog.updateMany({
      where: {
        AND: [{ id: String(id) }, { userId }],
      },
      data: {
        isCompleted: true,
      },
    });
    res.status(200).json({ message: "Blog Completed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const incompleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    await client.blog.updateMany({
      where: {
        AND: [{ id: String(id) }, { userId }],
      },
      data: {
        isCompleted: false,
      },
    });
    res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const blog = await client.blog.findFirst({
      where: { id: String(id), userId },
    });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    await client.blog.delete({
      where: {
        id: String(id),
      },
    });
    return res.status(200).json({ message: "Blog permanently deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const trash = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const blogs = await client.blog.findMany({
      where: {
        AND: [{ isDeleted: true }, { userId }],
      },
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const movingBlogsToTrash = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const blog = await client.blog.findFirst({
      where: {
        id: String(id),
        userId,
      },
    });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.isDeleted) {
      return res.status(400).json({ message: "Blog already in Trash" });
    }
    await client.blog.update({
      where: { id: String(id) },
      data: { isDeleted: true },
    });
    return res
      .status(200)
      .json({ message: "Blog moved to trash Successfully" });
  } catch (error) {
    console.log();

    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const recoverDeletedBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await client.blog.updateMany({
      where: {
        AND: [{ id: String(id) }, { userId }],
      },
      data: {
        isDeleted: false,
      },
    });
    res.status(200).json({ message: "Blog successfully recovered" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { blogTittle, synopsis, content, featuredImageUrl } = req.body;
    const userId = req.user.id;
    await client.blog.update({
      where: {
        id: String(id),
        userId,
      },
      data: {
        blogTittle: blogTittle && blogTittle,
        synopsis: synopsis && synopsis,
        content: content && content,
        featuredImageUrl: featuredImageUrl && featuredImageUrl,
      },
    });
    res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
