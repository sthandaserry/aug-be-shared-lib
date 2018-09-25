/**
 * @file mylogger.ts -  This is responsible for handling all error
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 24/09/2018
 * lastModified: 24/09/2018
 */

import { LoggerService } from '@nestjs/common';

export class MyLogger implements LoggerService {
  log(message: string) { console.log(message); }
  error(message: string, trace: string) { console.log(message + ' `' + trace + '`'); }
  warn(message: string) { console.log(message); }
}