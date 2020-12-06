import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const returnValidationErrors = (req: Request, res: Response, next: NextFunction): Response | void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }
  next();
};

export const createTaskValidation = [
  check('text').notEmpty().withMessage('Author required.'),
  check('author').notEmpty().withMessage('Author required.'),
  check('text').isLength({ min: 5 }).withMessage('Text length should be at least 5'),
  check('author').isEmail().withMessage('Please enter a correct format of email'),
];

export const getTaskValidation = [
  check('id').notEmpty().withMessage('Identity required.'),
  check('id').isMongoId().withMessage('Id should have type mongoid.'),
];
