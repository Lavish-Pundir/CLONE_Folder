import express from "express"
import authJWT from '../middleware/auth.js';
import { signup, login } from "../controllers/controller.js";

const router = express.Router();

    // Routers  //

router.post('/signup', signup);
router.post('/login', login);   //authJWT,


export default router;
