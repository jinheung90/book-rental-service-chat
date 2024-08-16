import * as winston from 'winston';
import 'winston-daily-rotate-file';

import { WinstonModule } from 'nest-winston';

const consoleError = new winston.transports.Console({
  format: winston.format.json(),
  level: winston.config.npm.levels.warn.toString(),
});

const consoleInfo = new winston.transports.Console({
  format: winston.format.json(),
  level: winston.config.npm.levels.info.toString(),
});

export const logger = WinstonModule.createLogger({
  transports: [consoleError, consoleInfo],
});
