import { Request, Response, NextFunction } from 'express';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack, " err.stack");


  res.status(500).json({ error: err.message });
}

export default errorHandler;