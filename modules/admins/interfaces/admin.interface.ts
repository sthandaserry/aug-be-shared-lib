/**
 * @file admin.interface.ts - Admin interface
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 29/06/2018
 * lastModified: 29/06/2018
 */
import { Document } from 'mongoose';
export interface Admin extends Document {
    readonly username: string;
    readonly password: string;
  }