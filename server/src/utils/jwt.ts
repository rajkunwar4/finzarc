import jwt from "jsonwebtoken"

// Define interface for token payload
export interface JWTPayload {
  id: string
  email: string
}

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"

// Generate JWT token expires in 7 days
export const generateToken = (payload: JWTPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

// Verify JWT token
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET)
}

// Decode JWT token
export const decodeToken = (token: string) => {
  return jwt.decode(token) as JWTPayload | null
}
