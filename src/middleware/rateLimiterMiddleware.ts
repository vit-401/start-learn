import {NextFunction, Request, Response} from 'express';
import logsRepository from "../repository/logsRepository";
import {WithId} from "mongodb";
import {Logs} from "../models/logs";

export async function rateLimiterMiddleware(req: Request, res: Response, next: NextFunction) {
  const logRepository = logsRepository;




  try {
    const root = req.originalUrl;
    const ip = req.ip;
    const maxRequestsPerSecond = 10;

    setTimeout(() => {
      logRepository.deleteLogById(ip);
    }, 1000 * 60); // Clear logs after 1 minute

    const existLog = await logRepository.findOneByIPAndRoot(ip, root) as WithId<Logs>;

    if (!existLog) {
      const log = await logRepository.create({root, ip, count: 1});
    } else {
      const updatedLog = await logRepository.changeLogById({...existLog, count: existLog!.count + 1,});
      if (updatedLog.count > maxRequestsPerSecond) {
        return res.status(429).json({error: 'Too Many Requests'});
      }
    }

    next(); // Continue processing the request
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error}); // Send error response here
  }
}

