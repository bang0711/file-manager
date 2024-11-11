import jwt from "jsonwebtoken";

const JwtSecret = `${process.env.JWT_SECRET}`;
const JwtExpiry = `${process.env.JWT_EXPIRES_IN}`;

const refreshTokenSecret = `${process.env.REFRESH_TOKEN_SECRET}`;
const refreshTokenExpiry = `${process.env.REFRESH_TOKEN_EXPIRES_IN}`;

export const generateToken = async (userId: string) => {
  const accessToken = jwt.sign({ userId }, JwtSecret, {
    expiresIn: JwtExpiry,
  });

  const refreshToken = jwt.sign({ userId }, refreshTokenSecret, {
    expiresIn: refreshTokenExpiry,
  });

  return {
    accessToken,
    refreshToken,
  };
};
