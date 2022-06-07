import express from "express";
import { tokenHandler } from "../controllers/auth.js";

const router = express.Router();

router.post("/google", tokenHandler);

export default router;