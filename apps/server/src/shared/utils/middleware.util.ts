import { NextFunction } from "express";
import * as csurf from 'csurf';

export const ignoreCSRF = (ignoreURLs: string[]) => (req: Request, res: Response, next: NextFunction) => {
  if (ignoreURLs.includes(req.url)) next();
  else csurf({ cookie: true })(req, res, next);
};
