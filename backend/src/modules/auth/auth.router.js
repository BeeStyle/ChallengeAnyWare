import { Router } from 'express'
import * as authController from './controller/auth.js'
import validation from './../../middleware/validation.js';
import * as Schema from './auth.validation.js';
import auth from '../../middleware/auth.js';
const router = Router();
router.post("/signup", validation(Schema.signupSchema), authController.signup)
router.post('/login', validation(Schema.loginSchema), authController.login)
router.get("/logout", auth, authController.LogOut)
export default router