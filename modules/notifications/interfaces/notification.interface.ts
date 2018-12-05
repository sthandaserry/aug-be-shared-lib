/**
 * @file notification.interface.ts - Notification interface
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 30/112018
 * lastModified: 30/11/2018
 */
import { Document } from 'mongoose';
export interface Notification extends Document {
  type: string; // Type of notification
  msg: string; // Notification message
  isUr: boolean; // is user read?
  isAr: boolean; // is admin read?
  fId: string; // User Id (From)
  tId: string; // User Id (To)
  jId?: string; // contest Id
  eId?: string; // Entry Id
  readonly cAt?: Date; // Created At
  readonly mAt?: Date; // Modified At
}