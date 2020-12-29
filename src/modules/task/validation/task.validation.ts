import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { query, body } from 'express-validator/check';

export const returnValidationErrors = (req: Request, res: Response, next: NextFunction): Response | void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }
  next();
};

export const createTaskValidation = [
  body('text').notEmpty().withMessage('Author required.'),
  body('text').isString().withMessage('Text should have type string'),
  body('text').isLength({ min: 5 }).withMessage('Text length should be at least 5'),
  body('author').notEmpty().withMessage('Author required.'),
  body('author').isEmail().withMessage('Please enter a correct format of email'),
];

export const getTaskValidation = [
  query('id').notEmpty().withMessage('Identity required.'),
  query('id').isMongoId().withMessage('Id should have type mongoid.'),
];

export const editTaskValidation = [
  body('id').notEmpty().withMessage('Identity required.'),
  body('id').isMongoId().withMessage('Id should have type mongoid.'),
  body('text').notEmpty().withMessage('Text required.'),
  body('text').isString().withMessage('Text should have type string'),
  body('text').isLength({ min: 5 }).withMessage('Text length should be at least 5'),
  body('author').notEmpty().withMessage('Author required.'),
  body('author').isString().withMessage('Author should have type string.'),
  body('author').isEmail().withMessage('Please enter a correct format of email'),
];

export const deleteTaskValidation = [
  query('id').notEmpty().withMessage('Identity required.'),
  query('id').isMongoId().withMessage('Id should have type mongoid.'),
];
