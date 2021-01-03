import express from 'express';
const router = express.Router();
import { createTask, getTask, editTask, deleteTask, getTaskList } from '@task/controller/task.controller';
import {
  createTaskValidation,
  getTaskValidation,
  editTaskValidation,
  deleteTaskValidation,
  returnValidationErrors,
} from '../validation/task.validation';

router.post('/', createTaskValidation, returnValidationErrors, createTask);
router.get('/', getTaskValidation, returnValidationErrors, getTask);
router.get('/getTaskList', getTaskList);
router.put('/', editTaskValidation, returnValidationErrors, editTask);
router.delete('/', deleteTaskValidation, returnValidationErrors, deleteTask);

export default router;
