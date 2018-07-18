/**
 * @file admin.interface.ts - Admin interface
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 29/06/2018
 * lastModified: 10/07/2018
 */
import { Document } from 'mongoose';
export interface Admin extends Document {
  uname?: string; // Username
  pwd?: string; // Password
  salt: string; // Salt string
  hpwd: string; // hashed password
  email?: string; // User email
  token?: string; // Reset token
  readonly fname?: string; // First Name
  readonly lname?: string; // Last Name
  readonly cAt?: Date; // Created At
  readonly mAt?: Date; // Modified At
}