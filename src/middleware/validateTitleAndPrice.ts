import {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";

const validateTitleAndPrice = [
  body('title')
    .isString().withMessage('title must be string')
    .trim()
    .isLength({min: 3, max: 35})
    .withMessage('Title must be between 3 and 35 characters long'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({min: 0})
    .withMessage('Price must be a positive number'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    next();
  }
];

export default validateTitleAndPrice