"use server";

import prisma from "./prisma";

import * as argon2 from "argon2";

import { generateToken } from "./token";
import { createSession } from "./session";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const register = async ({ email, name, password }: RegisterType) => {
  if (await findUserByEmail(email)) {
    return { message: "User already exists", statusCode: 409 };
  }

  const hashedPassword = await argon2.hash(password);

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return { message: "User created successfully", statusCode: 201 };
};

export const login = async ({ email, password }: LoginType) => {
  const user = await findUserByEmail(email);
  if (!user) {
    return { message: "User not found", statusCode: 404 };
  }

  const isPasswordMatch = await argon2.verify(user.password, password);

  if (!isPasswordMatch) {
    return { message: "Invalid credentials", statusCode: 401 };
  }

  const { id, name } = user;

  const { accessToken, refreshToken } = await generateToken(id);

  await createSession({ user: { id, name }, accessToken, refreshToken });

  return { message: "Login successful", statusCode: 200 };
};
