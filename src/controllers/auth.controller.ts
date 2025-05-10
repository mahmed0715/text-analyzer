import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(409).json({ message: "User already exists" });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, passwordHash, name },
    });

    res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
};
