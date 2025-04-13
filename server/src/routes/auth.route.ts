
import { RequestHandler, Router } from "express";

import { register, login } from "../controllers/auth.controller";

const router = Router();

// Register a new user
router.post('/register', register as RequestHandler);

// Login a user
router.post('/login', login as RequestHandler);

export default router;