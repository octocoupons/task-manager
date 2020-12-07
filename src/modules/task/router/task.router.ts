import express from 'express';
const router = express.Router();
import { createTask, getTask, getTaskList } from '../controller/task.controller';
import { createTaskValidation, getTaskValidation, returnValidationErrors } from '../validation/task.validation';

router.post('/', createTaskValidation, returnValidationErrors, createTask);
router.get('/', getTaskValidation, returnValidationErrors, getTask);
router.get('/getTaskList', getTaskList);

export default router;
