import jwt from "jsonwebtoken";

const SECRET = process.env["JWT_SECRET"] ?? "change-me-in-production";
const EXPIRES_IN = "7d";

export function signToken(payload: { userId: number; role: string }) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token: string): { userId: number; role: string } {
  return jwt.verify(token, SECRET) as { userId: number; role: string };
}
