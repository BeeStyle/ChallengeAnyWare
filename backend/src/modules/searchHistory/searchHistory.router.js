import { Router } from 'express'
import * as searchHistoryController from './controller/searchHistory.js'
import auth from '../../middleware/auth.js';
import validation from '../../middleware/validation.js';
import { AddSchema, searchSchema } from './searchHistory.validation.js';
const router = Router();
router.post("/", auth, validation(AddSchema), searchHistoryController.addsearchHistory)
router.get("/getsearchHistory", auth, searchHistoryController.getsearchHistorys)
export default router