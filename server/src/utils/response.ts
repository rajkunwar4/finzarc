import { Response } from "express";

export const sendSuccess = <T>(res: Response, message: string, data?: T, code = 200) => {
  return res.status(code).json({
    success: true,
    message,
    data: data ?? null,
    error: null,
  });
};

export const sendError = (res: Response, message = "Something went wrong", code = 500) => {
  return res.status(code).json({
    success: false,
    message,
    data: null,
    error: message,
  });
};
