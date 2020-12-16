import * as winston from 'winston';

const myformat = winston.format.combine(
  winston.format((info) => {
    if (info.level.length === 4) {
      info.level = info.level + '  ';
    } else {
      info.level = info.level + ' ';
    }
    info.level = info.level.toUpperCase();
    return info;
  })(),
  winston.format.colorize({ level: true, message: false }),
  winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss:SSS' }),
  winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
);

export const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: myformat,
});
