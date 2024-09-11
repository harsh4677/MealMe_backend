import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Utility for common validations
const isRequiredString = (field: string) =>
  body(field).isString().notEmpty().withMessage(`${field} must be a string`);

const isPositiveFloat = (field: string) =>
  body(field)
    .isFloat({ min: 0 })
    .withMessage(`${field} must be a positive number`);

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation for User request
export const validateMyUserRequest = [
  isRequiredString("name"),
  isRequiredString("addressLine1"),
  isRequiredString("city"),
  isRequiredString("country"),
  handleValidationErrors,
];

// Validation for Restaurant request
export const validateMyRestaurantRequest = [
  isRequiredString("restaurantName"),
  isRequiredString("city"),
  isRequiredString("country"),
  isPositiveFloat("deliveryPrice"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time must be a positive integer"),
  body("cuisines")
    .isArray({ min: 1 })
    .withMessage("Cuisines must be a non-empty array"),
  body("menuItems").isArray().withMessage("Menu items must be an array"),
  body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu item price is required and must be a positive number"),
  handleValidationErrors,
];
