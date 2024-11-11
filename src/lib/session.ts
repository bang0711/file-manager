"use server";

import { jwtVerify, SignJWT } from "jose";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = `${process.env.SESSION_SECRET_KEY}`;
const encodedKey = new TextEncoder().encode(secretKey);

const SESSION_NAME = "session";

export const createSession = async (payload: Session) => {
  const validTime = 7 * 24 * 60 * 60 * 1000;
  const expiredAt = new Date(Date.now() + validTime);

  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

  (await cookies()).set(SESSION_NAME, session, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: "strict",
    path: "/",
  });
};

export const getSession = async () => {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as Session;
  } catch (err) {
    console.error("Failed to verify the session", err);
    redirect("/login");
  }
};

export const deleteSession = async () => {
  (await cookies()).delete(SESSION_NAME);
};
