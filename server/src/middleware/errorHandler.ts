import { Request, Response, NextFunction } from "express";
import { MongoError } from "mongodb";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.error(err);

  if (err instanceof MongoError && err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: "A student with this email already exists",
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }

  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
};
