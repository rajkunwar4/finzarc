import { Request, Response, Router, RequestHandler } from "express";

import { register, login } from "../controllers/auth.controller";

const router = Router();

// Register a new user
router.post('/register', (register as unknown as RequestHandler));

// Login a user
router.post('/login', (login as unknown as RequestHandler));

export default router;