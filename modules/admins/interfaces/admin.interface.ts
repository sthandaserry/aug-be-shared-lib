/**
 * @file admin.interface.ts - Admin interface
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 29/07/2018
 * lastModified: 10/07/2018
 */
import { Document } from 'mongoose';
export interface IAdmin extends Document {
  readonly uname: string; // Username
  readonly pass: string; // Password
  readonly fname?: string; // First Name
  readonly lname?: string; // Last Name
  readonly cAt?: Date; // Created At
  readonly mAt?: Date; // Modified At
}