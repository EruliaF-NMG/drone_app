import winston from 'winston';
import { dateObjectToString } from '../../helpers/time-unit-helpers';


const logConfiguration = {
  transports: [
    new winston.transports.File({
      filename: `logs/${dateObjectToString(new Date(), 'yyyy_mm_dd')}_LOG.log`,
    }),
  ],
  format: winston.format.combine(
    winston.format.label({
      label: `LOG`,
    }),
    winston.format.timestamp({
      format: 'MM-DD-YYYY HH:mm:ss',
    }),
    winston.format.printf(
      (info:any) =>
        `${info.level}: ${info.label}: ${[info.timestamp]}:: ${info.message}`
    )
  ),
};

const logger = winston.createLogger(logConfiguration);

// eslint-disable-next-line import/prefer-default-export
export { logger };