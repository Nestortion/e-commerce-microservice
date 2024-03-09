import { ServiceError } from "@grpc/grpc-js";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: ServiceError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.statusMessage = error.details;
  return res.status(400).send();
};
